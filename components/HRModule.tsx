import React, { useState } from 'react';
import { Employee, PayrollRecord, Role } from '../types';
import { Users, CreditCard, Calendar, Briefcase, Plus, UserPlus, UserMinus, FileText, Camera, Save, X, Settings } from 'lucide-react';

interface HRModuleProps {
  employees: Employee[];
  payrollHistory: PayrollRecord[];
}

const HRModule: React.FC<HRModuleProps> = ({ employees: initialEmployees, payrollHistory }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [activeTab, setActiveTab] = useState<'Active' | 'Resigned'>('Active');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPositionModal, setShowPositionModal] = useState(false);
  
  // Custom Positions State
  const [jobPositions, setJobPositions] = useState<string[]>(['Managing Director', 'Sales & Operations', 'Technical Lead', 'General Staff', 'Driver', 'Freelance']);
  const [newPositionName, setNewPositionName] = useState('');

  // New Employee Form State
  const [newEmp, setNewEmp] = useState<Partial<Employee>>({
    name: '',
    role: Role.TECH,
    position: '',
    salaryType: 'รายเดือน',
    baseSalary: 0,
    bankAccount: '',
    phone: '',
    joinedDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const filteredEmployees = employees.filter(e => e.status === activeTab);

  const handleAddEmployee = () => {
    // Logic to add employee
    const employeeToAdd: Employee = {
        id: `E${String(employees.length + 1).padStart(3, '0')}`,
        status: 'Active',
        ...newEmp as Employee
    };
    setEmployees([...employees, employeeToAdd]);
    setShowOnboarding(false);
    // Reset form
    setNewEmp({
        name: '', role: Role.TECH, position: '', salaryType: 'รายเดือน', 
        baseSalary: 0, bankAccount: '', phone: '', joinedDate: new Date().toISOString().split('T')[0], notes: ''
    });
  };

  const handleResign = (id: string) => {
    if(confirm('ยืนยันเปลี่ยนสถานะพนักงานเป็น "ลาออก"?')) {
        setEmployees(employees.map(e => e.id === id ? { ...e, status: 'Resigned' } : e));
    }
  };

  const handleAddPosition = () => {
      if(newPositionName.trim()) {
          setJobPositions([...jobPositions, newPositionName.trim()]);
          setNewPositionName('');
      }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-blue-600" />
            บริหารงานบุคคล (HR)
        </h2>
        <div className="flex gap-2 w-full md:w-auto">
            <button 
                onClick={() => setShowPositionModal(true)}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 text-sm"
            >
                <Settings size={16} /> จัดการตำแหน่ง
            </button>
            <button 
                onClick={() => setShowOnboarding(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-green-700 flex-1 md:flex-none justify-center"
            >
                <UserPlus size={18} /> รับพนักงานใหม่
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
            onClick={() => setActiveTab('Active')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'Active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
            พนักงานปัจจุบัน ({employees.filter(e => e.status === 'Active').length})
        </button>
        <button 
            onClick={() => setActiveTab('Resigned')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'Resigned' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
            ลาออกแล้ว ({employees.filter(e => e.status === 'Resigned').length})
        </button>
      </div>

      {/* Employee List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className={`bg-white p-5 rounded-xl shadow-sm border relative overflow-hidden ${emp.status === 'Resigned' ? 'border-red-100 opacity-75' : 'border-gray-100'}`}>
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full -mr-10 -mt-10 z-0 ${emp.status === 'Resigned' ? 'bg-red-50' : 'bg-blue-50'}`}></div>
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="font-bold text-gray-900">{emp.name}</h3>
                        <p className="text-xs text-blue-600 font-medium">{emp.position}</p>
                    </div>
                    {emp.photoUrl ? (
                         <img src={emp.photoUrl} alt="profile" className="w-10 h-10 rounded-full object-cover border" />
                    ) : (
                        <div className="bg-gray-100 p-2 rounded-full">
                            <Briefcase size={16} className="text-gray-500" />
                        </div>
                    )}
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mt-4">
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span>เริ่มงานเมื่อ</span>
                        <span className="font-medium text-gray-800">{emp.joinedDate || '-'}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span>รูปแบบ</span>
                        <span className="font-medium text-gray-800">{emp.salaryType}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span>ฐานเงินเดือน</span>
                        <span className="font-medium text-gray-800">{emp.baseSalary > 0 ? `฿${emp.baseSalary.toLocaleString()}` : '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="flex items-center gap-1 text-xs"><CreditCard size={12}/> บัญชี</span>
                        <span className="text-xs bg-gray-50 px-2 py-1 rounded truncate max-w-[120px]">{emp.bankAccount}</span>
                    </div>
                </div>
                
                {/* Documents Links (Mock) */}
                <div className="flex gap-2 mt-3 text-xs text-blue-500 underline">
                    {emp.educationDocUrl && <a href="#" onClick={e=>e.preventDefault()}>วุฒิการศึกษา</a>}
                    {emp.idCardDocUrl && <a href="#" onClick={e=>e.preventDefault()}>บัตร ปชช.</a>}
                </div>

                <div className="mt-4 flex gap-2">
                    {emp.status === 'Active' ? (
                        <>
                            <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700">จ่ายเงินเดือน</button>
                            <button 
                                onClick={() => handleResign(emp.id)}
                                className="px-3 bg-white border border-red-200 text-red-500 text-xs py-2 rounded-lg hover:bg-red-50"
                            >
                                <UserMinus size={14} />
                            </button>
                        </>
                    ) : (
                        <span className="w-full text-center text-red-500 text-xs py-2 font-bold bg-red-50 rounded-lg">พ้นสภาพพนักงาน</span>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Position Modal */}
      {showPositionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">จัดการตำแหน่งงาน</h3>
                      <button onClick={() => setShowPositionModal(false)}><X size={20}/></button>
                  </div>
                  <div className="space-y-4">
                      <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="flex-1 border p-2 rounded text-sm" 
                            placeholder="ชื่อตำแหน่งใหม่..."
                            value={newPositionName}
                            onChange={(e) => setNewPositionName(e.target.value)}
                          />
                          <button onClick={handleAddPosition} className="bg-blue-600 text-white px-3 py-2 rounded text-sm"><Plus size={16}/></button>
                      </div>
                      <div className="border rounded-lg max-h-60 overflow-y-auto divide-y">
                          {jobPositions.map((pos, idx) => (
                              <div key={idx} className="p-3 text-sm text-gray-700 flex justify-between">
                                  {pos}
                                  {idx > 3 && <button className="text-red-400 hover:text-red-600" onClick={() => setJobPositions(jobPositions.filter((_, i) => i !== idx))}><X size={14}/></button>}
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Onboarding Modal */}
      {showOnboarding && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                  <div className="p-4 border-b flex justify-between items-center bg-green-50">
                      <h3 className="font-bold text-lg text-green-800 flex items-center gap-2">
                        <UserPlus size={20} /> รับพนักงานใหม่ (Onboarding)
                      </h3>
                      <button onClick={() => setShowOnboarding(false)}><X size={20} className="text-gray-400" /></button>
                  </div>
                  <div className="p-6 space-y-4">
                      {/* Personal Info */}
                      <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                              <label className="text-xs font-bold text-gray-700">ชื่อ-นามสกุล *</label>
                              <input 
                                type="text" 
                                value={newEmp.name}
                                onChange={e => setNewEmp({...newEmp, name: e.target.value})}
                                className="w-full border p-2 rounded mt-1" 
                                placeholder="นาย ก"
                               />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-gray-700">เบอร์โทร *</label>
                              <input 
                                type="text" 
                                value={newEmp.phone}
                                onChange={e => setNewEmp({...newEmp, phone: e.target.value})}
                                className="w-full border p-2 rounded mt-1" 
                               />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-gray-700">วันที่เริ่มงาน</label>
                              <input 
                                type="date" 
                                value={newEmp.joinedDate}
                                onChange={e => setNewEmp({...newEmp, joinedDate: e.target.value})}
                                className="w-full border p-2 rounded mt-1" 
                               />
                          </div>
                      </div>

                      {/* Job Info */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                          <h4 className="text-sm font-bold text-gray-800 border-b pb-2">ข้อมูลงาน</h4>
                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="text-xs font-bold text-gray-700">ตำแหน่ง</label>
                                  <select 
                                    className="w-full border p-2 rounded mt-1"
                                    value={newEmp.position}
                                    onChange={e => setNewEmp({...newEmp, position: e.target.value})}
                                  >
                                      <option value="">เลือกตำแหน่ง</option>
                                      {jobPositions.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
                                  </select>
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-gray-700">Role ในระบบ</label>
                                  <select 
                                    value={newEmp.role}
                                    onChange={e => setNewEmp({...newEmp, role: e.target.value as Role})}
                                    className="w-full border p-2 rounded mt-1"
                                  >
                                      {Object.values(Role).map(r => <option key={r} value={r}>{r}</option>)}
                                  </select>
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-gray-700">รูปแบบการจ้าง</label>
                                  <select 
                                    value={newEmp.salaryType}
                                    onChange={e => setNewEmp({...newEmp, salaryType: e.target.value as any})}
                                    className="w-full border p-2 rounded mt-1"
                                  >
                                      <option value="รายเดือน">รายเดือน</option>
                                      <option value="รายวัน/รายจ๊อบ">รายวัน/รายจ๊อบ</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-gray-700">ฐานเงินเดือน (บาท)</label>
                                  <input 
                                    type="number" 
                                    value={newEmp.baseSalary}
                                    onChange={e => setNewEmp({...newEmp, baseSalary: Number(e.target.value)})}
                                    className="w-full border p-2 rounded mt-1" 
                                   />
                              </div>
                          </div>
                          <div>
                              <label className="text-xs font-bold text-gray-700">เลขที่บัญชีธนาคาร</label>
                              <input 
                                type="text" 
                                value={newEmp.bankAccount}
                                onChange={e => setNewEmp({...newEmp, bankAccount: e.target.value})}
                                className="w-full border p-2 rounded mt-1" 
                                placeholder="ธนาคาร - เลขบัญชี"
                               />
                          </div>
                      </div>

                      {/* Documents (Mock Upload) */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-3">
                          <h4 className="text-sm font-bold text-blue-800 border-b border-blue-200 pb-2 flex items-center gap-2">
                              <FileText size={14}/> เอกสารประกอบ (ใส่ Link/Upload)
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                             <div className="flex items-center gap-2">
                                <Camera size={16} className="text-gray-400"/>
                                <input type="text" placeholder="Link รูปถ่ายหน้าตรง" className="flex-1 text-sm border p-1 rounded bg-white" />
                             </div>
                             <div className="flex items-center gap-2">
                                <FileText size={16} className="text-gray-400"/>
                                <input type="text" placeholder="Link สำเนาบัตรประชาชน" className="flex-1 text-sm border p-1 rounded bg-white" />
                             </div>
                             <div className="flex items-center gap-2">
                                <FileText size={16} className="text-gray-400"/>
                                <input type="text" placeholder="Link วุฒิการศึกษา" className="flex-1 text-sm border p-1 rounded bg-white" />
                             </div>
                          </div>
                      </div>
                      
                      <div className="pt-2 flex gap-3">
                          <button onClick={() => setShowOnboarding(false)} className="flex-1 py-2 text-gray-500 border rounded">ยกเลิก</button>
                          <button onClick={handleAddEmployee} className="flex-1 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 flex items-center justify-center gap-2">
                              <Save size={16} /> บันทึกพนักงาน
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Payroll History (Keep existing) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={18} /> ประวัติการจ่ายเงินล่าสุด
            </h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                        <th className="px-6 py-3 whitespace-nowrap">เดือน</th>
                        <th className="px-6 py-3 whitespace-nowrap">พนักงาน</th>
                        <th className="px-6 py-3 whitespace-nowrap text-right">เงินเดือน</th>
                        <th className="px-6 py-3 whitespace-nowrap text-right">คอมมิชชั่น/จ๊อบ</th>
                        <th className="px-6 py-3 whitespace-nowrap text-right">รวมสุทธิ</th>
                        <th className="px-6 py-3 whitespace-nowrap text-center">สถานะ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {payrollHistory.map(record => {
                        const empName = employees.find(e => e.id === record.employeeId)?.name || record.employeeId;
                        return (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3">{record.month}</td>
                                <td className="px-6 py-3 font-medium text-gray-900">{empName}</td>
                                <td className="px-6 py-3 text-right text-gray-500">฿{record.salary.toLocaleString()}</td>
                                <td className="px-6 py-3 text-right text-green-600">
                                    {record.commission > 0 ? `+฿${record.commission.toLocaleString()}` : ''}
                                    {record.extraPay > 0 ? `+฿${record.extraPay.toLocaleString()}` : ''}
                                </td>
                                <td className="px-6 py-3 text-right font-bold text-gray-800">฿{record.total.toLocaleString()}</td>
                                <td className="px-6 py-3 text-center">
                                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 border border-green-200">
                                        {record.status}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default HRModule;