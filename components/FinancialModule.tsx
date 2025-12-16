import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FinancialRecord } from '../types';
import { Download, AlertTriangle, Plus, X, Image as ImageIcon } from 'lucide-react';

interface FinancialModuleProps {
  records: FinancialRecord[];
  onAddRecord: (record: FinancialRecord) => void;
}

const FinancialModule: React.FC<FinancialModuleProps> = ({ records, onAddRecord }) => {
  const [showModal, setShowModal] = useState(false);
  
  // New Record Form State
  const [newRecord, setNewRecord] = useState<Partial<FinancialRecord>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    type: 'รายรับ',
    category: '',
    attachmentUrls: []
  });

  const totalIncome = records.filter(r => r.type === 'รายรับ').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = records.filter(r => r.type === 'รายจ่าย').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const data = [
    { name: 'รายรับ', amount: totalIncome },
    { name: 'รายจ่าย', amount: totalExpense },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        // Convert FileList to Array of fake URLs
        const urls = Array.from(e.target.files).map((file: File) => URL.createObjectURL(file));
        setNewRecord(prev => ({
            ...prev,
            attachmentUrls: [...(prev.attachmentUrls || []), ...urls]
        }));
    }
  };

  const handleSubmit = () => {
    if(!newRecord.description || !newRecord.amount) return;

    const record: FinancialRecord = {
        id: `F-${Date.now()}`,
        date: newRecord.date!,
        description: newRecord.description!,
        amount: Number(newRecord.amount),
        type: newRecord.type as 'รายรับ' | 'รายจ่าย',
        category: newRecord.category || 'ทั่วไป',
        attachmentUrls: newRecord.attachmentUrls
    };
    onAddRecord(record);
    setShowModal(false);
    // Reset
    setNewRecord({
        date: new Date().toISOString().split('T')[0],
        description: '', amount: 0, type: 'รายรับ', category: '', attachmentUrls: []
    });
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">บัญชีและการเงิน</h3>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-blue-700"
        >
            <Plus size={18} /> ลงบันทึก รับ-จ่าย
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">ยอดคงเหลือสุทธิ</p>
          <h3 className="text-2xl font-bold text-gray-800">฿{balance.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">รายรับทั้งหมด</p>
          <h3 className="text-2xl font-bold text-green-600">฿{totalIncome.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">รายจ่ายทั้งหมด</p>
          <h3 className="text-2xl font-bold text-red-600">฿{totalExpense.toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h4 className="text-lg font-semibold mb-4">ภาพรวมการเงิน</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `฿${Number(value).toLocaleString()}`} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={60}>
                 {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'รายรับ' ? '#10b981' : '#ef4444'} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">รายการล่าสุด</h4>
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <Download size={16} /> Export
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2">วันที่</th>
                  <th className="px-4 py-2">รายการ</th>
                  <th className="px-4 py-2">ประเภท</th>
                  <th className="px-4 py-2 text-right">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{rec.date}</td>
                    <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{rec.description}</div>
                        {rec.attachmentUrls && rec.attachmentUrls.length > 0 && (
                            <div className="flex gap-1 mt-1">
                                {rec.attachmentUrls.map((url, i) => (
                                    <div key={i} className="w-6 h-6 rounded bg-gray-200 overflow-hidden border">
                                        <img src={url} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rec.type === 'รายรับ' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rec.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">฿{rec.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Risk Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <span className="font-bold">เตือนต่ออายุประกัน:</span> ประกันภัยความรับผิดบุคคลภายนอก (Public Liability) จะหมดอายุใน 15 วัน กรุณาเตรียมงบประมาณ
            </p>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6 border-b pb-2">
                      <h3 className="text-lg font-bold">ลงบันทึกบัญชี</h3>
                      <button onClick={() => setShowModal(false)}><X size={24} className="text-gray-400" /></button>
                  </div>
                  
                  <div className="space-y-4">
                      {/* Type Toggle */}
                      <div className="flex bg-gray-100 p-1 rounded-lg">
                          <button 
                             onClick={() => setNewRecord({...newRecord, type: 'รายรับ'})}
                             className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${newRecord.type === 'รายรับ' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
                          >
                              รายรับ (Income)
                          </button>
                          <button 
                             onClick={() => setNewRecord({...newRecord, type: 'รายจ่าย'})}
                             className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${newRecord.type === 'รายจ่าย' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500'}`}
                          >
                              รายจ่าย (Expense)
                          </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">วันที่</label>
                              <input type="date" className="w-full border p-2 rounded" value={newRecord.date} onChange={e => setNewRecord({...newRecord, date: e.target.value})} />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">จำนวนเงิน (บาท)</label>
                              <input type="number" className="w-full border p-2 rounded" value={newRecord.amount} onChange={e => setNewRecord({...newRecord, amount: Number(e.target.value)})} />
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">รายละเอียดรายการ</label>
                          <input 
                            type="text" 
                            className="w-full border p-2 rounded" 
                            placeholder="เช่น ค่ารถ, รับเงินงวดแรก..." 
                            value={newRecord.description}
                            onChange={e => setNewRecord({...newRecord, description: e.target.value})}
                          />
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">หมวดหมู่</label>
                          <select className="w-full border p-2 rounded" value={newRecord.category} onChange={e => setNewRecord({...newRecord, category: e.target.value})}>
                              <option value="">เลือกหมวดหมู่</option>
                              <option value="การขาย">การขาย</option>
                              <option value="อุปกรณ์">อุปกรณ์</option>
                              <option value="ค่าเดินทาง">ค่าเดินทาง/ขนส่ง</option>
                              <option value="เงินเดือน">เงินเดือน/ค่าแรง</option>
                              <option value="อื่นๆ">อื่นๆ</option>
                          </select>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                          <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                             <ImageIcon size={16} /> แนบรูปภาพหลักฐาน (เลือกได้หลายรูป)
                          </label>
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          {newRecord.attachmentUrls && newRecord.attachmentUrls.length > 0 && (
                              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                  {newRecord.attachmentUrls.map((url, idx) => (
                                      <div key={idx} className="w-16 h-16 flex-shrink-0 border rounded-lg overflow-hidden relative group">
                                          <img src={url} className="w-full h-full object-cover" />
                                          <button 
                                            onClick={() => setNewRecord(prev => ({...prev, attachmentUrls: prev.attachmentUrls?.filter((_, i) => i !== idx)}))}
                                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-0 group-hover:opacity-100"
                                          >
                                              <X size={12}/>
                                          </button>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>

                      <button 
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all mt-4"
                      >
                          บันทึกรายการ
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default FinancialModule;