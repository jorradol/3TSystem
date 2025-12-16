import React, { useState, useEffect } from 'react';
import { Role, Job, ChatMessage, Customer, FinancialRecord, Employee, PayrollRecord } from './types';
import { JobAPI, CustomerAPI, FinanceAPI, ChatAPI, HRAPI } from './services/api';
import AppShell from './components/AppShell';
import Dashboard from './components/Dashboard';
import JobWorkflow from './components/JobWorkflow';
import FinancialModule from './components/FinancialModule';
import FileManager from './components/FileManager';
import InternalChat from './components/InternalChat';
import HRModule from './components/HRModule';
import CRMModule from './components/CRMModule';
import DigitalForms from './components/DigitalForms';
import LoginScreen from './components/LoginScreen';
import LandingPage from './components/LandingPage';
import Logo from './components/Logo';
import { Calendar, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSystemLoading, setIsSystemLoading] = useState(false); // Initial Load
  
  // App State (Initially Empty)
  const [jobs, setJobs] = useState<Job[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [financeRecords, setFinanceRecords] = useState<FinancialRecord[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);
  
  // Chat Logic State
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load Data on Login
  useEffect(() => {
    if (isLoggedIn) {
      loadSystemData();
    }
  }, [isLoggedIn]);

  const loadSystemData = async () => {
    setIsSystemLoading(true);
    try {
      // Parallel Fetching for performance
      const [fetchedJobs, fetchedCustomers, fetchedFinance, fetchedChat, fetchedEmp, fetchedPay] = await Promise.all([
        JobAPI.getAll(),
        CustomerAPI.getAll(),
        FinanceAPI.getAll(),
        ChatAPI.getAll(),
        HRAPI.getEmployees(),
        HRAPI.getPayroll()
      ]);

      setJobs(fetchedJobs);
      setCustomers(fetchedCustomers);
      setFinanceRecords(fetchedFinance);
      setChatMessages(fetchedChat);
      setEmployees(fetchedEmp);
      setPayroll(fetchedPay);
    } catch (error) {
      console.error("Failed to load data", error);
      setNotification("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setIsSystemLoading(false);
    }
  };

  const handleLogin = (role: Role) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    setShowLandingPage(false);
    if (role === Role.MD || role === Role.MANAGER) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('workflow');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRole(null);
    setShowLandingPage(true);
    setJobs([]); // Clear state on logout
  };

  // --- JOB MANAGEMENT ---
  const handleUpdateJob = async (updatedJob: Job) => {
    // Optimistic Update
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    // API Call
    await JobAPI.update(updatedJob);
  };

  const handleAddJob = async (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
    await JobAPI.create(newJob);
    setNotification(`เพิ่มงานใหม่เรียบร้อย: ${newJob.title}`);
  };

  const handleDeleteJob = async (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    await JobAPI.delete(jobId);
    setNotification(`ลบงานรหัส ${jobId} แล้ว`);
  };
  // ----------------------

  // --- FINANCE MANAGEMENT ---
  const handleAddFinanceRecord = async (record: FinancialRecord) => {
    setFinanceRecords(prev => [record, ...prev]);
    await FinanceAPI.create(record);
    setNotification(`บันทึกบัญชีสำเร็จ: ${record.description}`);
  };
  // --------------------------

  const handleAddCustomer = async (newCustomer: Customer) => {
    // Auto Generate ID based on current length + 1 (Simple logic)
    const customerWithId = { ...newCustomer, id: `C${String(customers.length + 1).padStart(3, '0')}` };
    setCustomers([...customers, customerWithId]);
    await CustomerAPI.create(customerWithId);
  };

  const handleSendMessage = async (text: string, imageUrl?: string) => {
    if (!currentRole) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: currentRole,
      text: text,
      imageUrl: imageUrl,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    await ChatAPI.send(newMessage);

    // Simulate Auto-Reply logic
    if (text) {
        setIsOtherTyping(true);
        setTimeout(async () => {
            const replyRole = currentRole === Role.MD ? Role.MANAGER : Role.MD;
            const replyMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: replyRole,
                text: "รับทราบครับ เดี๋ยวจัดการให้ครับ",
                timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
            };
            
            setIsOtherTyping(false);
            setChatMessages(prev => [...prev, replyMessage]);
            await ChatAPI.send(replyMessage);
            
            // Notification Logic
            if (currentView !== 'chat') {
                setNotification(`ข้อความใหม่จาก ${replyRole.split('(')[0]}`);
                setUnreadCount(prev => prev + 1);
            }
        }, 2000); // 2 seconds typing simulation
    }
  };
  
  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
        const timer = setTimeout(() => setNotification(null), 3000);
        return () => clearTimeout(timer);
    }
  }, [notification]);

  // Clear unread count when entering chat
  useEffect(() => {
    if (currentView === 'chat') {
        setUnreadCount(0);
    }
  }, [currentView]);

  const renderContent = () => {
    if (isSystemLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="animate-spin text-blue-600 mb-4">
                    <RefreshCw size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-700">กำลังเชื่อมต่อฐานข้อมูล...</h3>
                <p className="text-gray-500 text-sm">Synchronizing 3T System Data</p>
            </div>
        );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard jobs={jobs} />;
      case 'workflow':
        return (
            <JobWorkflow 
                jobs={jobs} 
                currentRole={currentRole!} 
                onUpdateJob={handleUpdateJob}
                onAddJob={handleAddJob}
                onDeleteJob={handleDeleteJob}
            />
        );
      case 'crm':
        return <CRMModule customers={customers} jobs={jobs} onAddCustomer={handleAddCustomer} />;
      case 'forms':
        return <DigitalForms />;
      case 'finance':
        return <FinancialModule records={financeRecords} onAddRecord={handleAddFinanceRecord} />;
      case 'files':
        return <FileManager />;
      case 'chat':
        return (
            <InternalChat 
                messages={chatMessages} 
                currentRole={currentRole!} 
                onSendMessage={handleSendMessage}
                isOtherTyping={isOtherTyping}
            />
        );
      case 'hr':
        return <HRModule employees={employees} payrollHistory={payroll} />;
      case 'calendar':
        return (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Calendar size={64} className="mx-auto text-blue-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700">Google Calendar Integration</h2>
            <p className="text-gray-500 mt-2">ส่วนนี้จะเชื่อมต่อกับ Google Calendar API ของทีม</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {jobs.map(job => (
                    <div key={job.id} className="border p-4 rounded bg-blue-50 border-blue-100">
                        <p className="font-bold text-blue-800">{job.date}</p>
                        <p className="text-sm">{job.title}</p>
                        <p className="text-xs text-gray-500">{job.phase}</p>
                    </div>
                ))}
            </div>
          </div>
        );
      default:
        return <Dashboard jobs={jobs} />;
    }
  };

  // 1. Landing Page View
  if (showLandingPage) {
    return <LandingPage onLoginClick={() => setShowLandingPage(false)} />;
  }

  // 2. Login View
  if (!isLoggedIn || !currentRole) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        onBackToWebsite={() => setShowLandingPage(true)}
      />
    );
  }

  // 3. App View (Logged In)
  return (
    <>
        <AppShell 
          currentRole={currentRole} 
          currentView={currentView} 
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          unreadChatCount={unreadCount}
        >
          {renderContent()}
        </AppShell>

        {/* Global Notification Toast */}
        {notification && (
            <div className="fixed top-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                    <p className="font-bold text-sm">แจ้งเตือนใหม่</p>
                    <p className="text-xs">{notification}</p>
                </div>
            </div>
        )}
    </>
  );
};

export default App;