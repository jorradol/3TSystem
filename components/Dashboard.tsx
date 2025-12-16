import React from 'react';
import { Job, Phase } from '../types';
import { TrendingUp, AlertOctagon, CheckSquare, Clock, FileWarning } from 'lucide-react';

interface DashboardProps {
  jobs: Job[];
}

const Dashboard: React.FC<DashboardProps> = ({ jobs }) => {
  const pending50Tawi = jobs.filter(job => job.phase === Phase.CLOSING && !job.isTaxDocReceived).length;
  const jobsInPrep = jobs.filter(job => job.phase === Phase.PREP).length;
  const jobsToday = jobs.length; // Mock
  const totalRevenue = jobs.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-xl font-bold text-gray-800 md:text-2xl">ภาพรวมธุรกิจ (Business Overview)</h1>
      
      {/* Alert Banner for 50 Tawi (Internal Collaboration Check) */}
      {pending50Tawi > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-pulse">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-full text-red-600">
                          <FileWarning size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-red-700">เตือน: ขาดหนังสือรับรองหัก ณ ที่จ่าย (50 ทวิ) จำนวน {pending50Tawi} ใบ</h3>
                          <p className="text-sm text-red-600">กรุณาติดตามจากลูกค้าเพื่อความถูกต้องทางบัญชี</p>
                      </div>
                  </div>
                  <button className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700">ดูรายการ</button>
              </div>
          </div>
      )}
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500">ยอดขายรวม (ประมาณ)</p>
                <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600"><TrendingUp size={18} /></div>
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-800">฿{totalRevenue.toLocaleString()}</h3>
        </div>

        <div className={`bg-white p-4 md:p-5 rounded-xl border shadow-sm flex flex-col justify-between ${pending50Tawi > 0 ? 'border-red-200 bg-red-50/30' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500">รอใบ 50 ทวิ</p>
                <div className={`p-1.5 rounded-lg ${pending50Tawi > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}><AlertOctagon size={18} /></div>
            </div>
            <h3 className={`text-lg md:text-2xl font-bold ${pending50Tawi > 0 ? 'text-red-600' : 'text-gray-800'}`}>{pending50Tawi} ใบ</h3>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500">กำลังเตรียม/QC</p>
                <div className="bg-purple-100 p-1.5 rounded-lg text-purple-600"><CheckSquare size={18} /></div>
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-800">{jobsInPrep} งาน</h3>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500">งานทั้งหมด</p>
                <div className="bg-yellow-100 p-1.5 rounded-lg text-yellow-600"><Clock size={18} /></div>
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-800">{jobsToday}</h3>
        </div>
      </div>

      {/* Action Items Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 text-sm md:text-base">รายการที่ต้องเร่งดำเนินการ (Urgent)</h3>
            <span className="text-xs text-gray-400">ตรวจสอบล่าสุด: {new Date().toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                        <th className="px-4 py-3 md:px-6">รหัสงาน</th>
                        <th className="px-4 py-3 md:px-6 min-w-[150px]">ชื่องาน</th>
                        <th className="px-4 py-3 md:px-6">ปัญหา/สถานะ</th>
                        <th className="px-4 py-3 md:px-6">ผู้รับผิดชอบ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {jobs.filter(job => (job.phase === Phase.CLOSING && !job.isTaxDocReceived) || (job.phase === Phase.EXECUTION && !job.isSigned)).map(job => (
                        <tr key={job.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 md:px-6 font-medium text-gray-900">{job.id}</td>
                            <td className="px-4 py-3 md:px-6 text-gray-600">{job.title}</td>
                            <td className="px-4 py-3 md:px-6">
                                {job.phase === Phase.CLOSING && !job.isTaxDocReceived && 
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap gap-1">
                                        <FileWarning size={12} /> ขาดใบ 50 ทวิ
                                    </span>
                                }
                                {job.phase === Phase.EXECUTION && !job.isSigned &&
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
                                        ยังไม่เซ็นรับของ
                                    </span>
                                }
                            </td>
                            <td className="px-4 py-3 md:px-6 text-gray-500">
                                {job.phase === Phase.CLOSING ? 'MD (ติดตามเอกสาร)' : 'Tech/Manager'}
                            </td>
                        </tr>
                    ))}
                    {jobs.filter(job => (job.phase === Phase.CLOSING && !job.isTaxDocReceived) || (job.phase === Phase.EXECUTION && !job.isSigned)).length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                ไม่มีความเสี่ยงเร่งด่วน เยี่ยมมากทีมงาน!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;