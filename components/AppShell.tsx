import React from 'react';
import { LayoutDashboard, Kanban, Calendar, FolderOpen, MessageSquare, DollarSign, LogOut, Users, FileText, User } from 'lucide-react';
import { Role } from '../types';
import Logo from './Logo';
import { ROLE_THEMES } from '../services/assets';

interface AppShellProps {
  currentRole: Role;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
  unreadChatCount?: number; // New prop for badge
}

const AppShell: React.FC<AppShellProps> = ({ currentRole, currentView, onNavigate, onLogout, children, unreadChatCount = 0 }) => {
  
  // Determine Theme based on Role
  let theme = ROLE_THEMES.TECH; // Default
  if (currentRole === Role.MD) theme = ROLE_THEMES.MD;
  if (currentRole === Role.MANAGER) theme = ROLE_THEMES.MANAGER;

  // Define available menu items based on Role
  const allNavItems = [
    { id: 'dashboard', label: 'ภาพรวม', icon: LayoutDashboard, roles: [Role.MD, Role.MANAGER] },
    { id: 'workflow', label: 'งาน (3T)', icon: Kanban, roles: [Role.MD, Role.MANAGER, Role.TECH] },
    { id: 'crm', label: 'ลูกค้า (CRM)', icon: User, roles: [Role.MD, Role.MANAGER] },
    { id: 'forms', label: 'ฟอร์มดิจิทัล', icon: FileText, roles: [Role.MD, Role.MANAGER, Role.TECH] },
    { id: 'calendar', label: 'ปฏิทิน', icon: Calendar, roles: [Role.MD, Role.MANAGER, Role.TECH] },
    { id: 'files', label: 'เอกสาร', icon: FolderOpen, roles: [Role.MD, Role.MANAGER, Role.TECH] },
    { id: 'finance', label: 'บัญชี', icon: DollarSign, roles: [Role.MD] },
    { id: 'hr', label: 'พนักงาน', icon: Users, roles: [Role.MD] },
    { id: 'chat', label: 'แชท', icon: MessageSquare, roles: [Role.MD, Role.MANAGER, Role.TECH] },
  ];

  const allowedNavItems = allNavItems.filter(item => item.roles.includes(currentRole));

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-prompt">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className={`hidden md:flex w-64 ${theme.primary} text-white flex-col shadow-xl z-20 transition-colors duration-300`}>
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
             <Logo size="sm" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">3T Studio</h1>
            <p className="text-[10px] text-white/70">System V.2</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {allowedNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                currentView === item.id 
                  ? 'bg-white text-gray-900 shadow-md font-bold' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
              
              {/* Desktop Badge */}
              {item.id === 'chat' && unreadChatCount > 0 && (
                <span className="absolute right-4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-sm">
                    {unreadChatCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-black/20 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 font-bold text-sm shadow-sm border-2 border-white/50">
                    {currentRole.substring(0,2)}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate text-white">{currentRole.split('(')[1].replace(')', '')}</p>
                    <p className="text-xs text-white/60 truncate">{currentRole.split('(')[0]}</p>
                </div>
            </div>
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 text-xs text-red-200 hover:text-white py-2 border border-white/20 rounded hover:bg-red-600/80 transition-colors"
            >
                <LogOut size={14} /> ออกจากระบบ
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 z-10 md:hidden sticky top-0">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <h2 className={`text-lg font-bold ${theme.accent}`}>3T Studio</h2>
          </div>
          <div className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-full ${theme.soft} flex items-center justify-center ${theme.accent} font-bold text-xs border ${theme.border}`}>
                {currentRole.substring(0,2)}
             </div>
             <button onClick={onLogout} className="text-gray-400 hover:text-red-500">
                <LogOut size={20} />
             </button>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex bg-white shadow-sm h-16 items-center justify-between px-6 z-10">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className={`w-2 h-6 rounded-full ${theme.secondary}`}></span>
                {allowedNavItems.find(i => i.id === currentView)?.label}
            </h2>
            <div className="text-sm text-gray-500">
                สถานะ: <span className={`${theme.accent} font-bold bg-opacity-10 px-2 py-1 rounded-full ${theme.soft}`}>{currentRole}</span>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 bg-gray-50">
          {children}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-30 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            {allowedNavItems.slice(0, 5).map((item) => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative ${
                        currentView === item.id ? theme.accent : 'text-gray-400'
                    }`}
                >
                    <div className="relative">
                        <item.icon size={22} strokeWidth={currentView === item.id ? 2.5 : 2} />
                        {/* Mobile Badge */}
                        {item.id === 'chat' && unreadChatCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 border border-white w-3 h-3 rounded-full"></span>
                        )}
                    </div>
                    <span className={`text-[10px] mt-1 ${currentView === item.id ? 'font-bold' : ''}`}>{item.label}</span>
                </button>
            ))}
        </div>
      </main>
    </div>
  );
};

export default AppShell;