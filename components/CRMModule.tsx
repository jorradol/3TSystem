import React, { useState } from 'react';
import { Customer, Job } from '../types';
import { Search, Plus, User, Phone, MapPin, Star, History, MessageSquare, Edit2, Save, X } from 'lucide-react';

interface CRMModuleProps {
  customers: Customer[];
  jobs: Job[];
  onAddCustomer: (customer: Customer) => void;
  onEditCustomer?: (customer: Customer) => void; // Optional for now
}

const CRMModule: React.FC<CRMModuleProps> = ({ customers, jobs, onAddCustomer, onEditCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    company: '',
    phone: '',
    lineId: '',
    type: 'ทั่วไป',
    address: '',
    notes: ''
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const getCustomerJobs = (custId: string) => jobs.filter(j => j.customerId === custId);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setFormData({
        name: '', company: '', phone: '', lineId: '', type: 'ทั่วไป', address: '', notes: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (customer: Customer) => {
    setIsEditing(true);
    setFormData(customer);
    setShowModal(true);
    // Close detail view if open behind
  };

  const handleSubmit = () => {
    if (isEditing && onEditCustomer && formData.id) {
        // Logic to update customer
        console.log("Updating", formData);
        // onEditCustomer(formData as Customer); 
    } else {
        // Logic to add customer
        const newCustomer = {
            ...formData,
            totalJobs: 0
        } as Customer;
        onAddCustomer(newCustomer);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <User className="text-blue-600" />
          ฐานข้อมูลลูกค้า (CRM)
        </h2>
        <button 
          onClick={handleOpenAddModal}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-sm hover:bg-blue-700"
        >
          <Plus size={16} /> <span className="hidden md:inline">เพิ่มลูกค้า</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input 
          type="text"
          placeholder="ค้นหาชื่อ, บริษัท, หรือเบอร์โทร..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        />
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(customer => (
          <div 
            key={customer.id} 
            onClick={() => setSelectedCustomer(customer)}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 transition-colors cursor-pointer relative group"
          >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">{customer.name}</h3>
                    {customer.company && <p className="text-sm text-gray-500">{customer.company}</p>}
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                    customer.type === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                    customer.type === 'องค์กร' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
                }`}>
                    {customer.type}
                </span>
            </div>

            <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} /> {customer.phone}
                </div>
                {customer.lineId && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <MessageSquare size={14} /> {customer.lineId}
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} /> <span className="truncate">{customer.address}</span>
                </div>
            </div>

            {customer.notes && (
                <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                    <p className="text-xs text-gray-500 line-clamp-1 italic">Note: {customer.notes}</p>
                </div>
            )}
            
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal(customer);
                }}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-100 hover:text-blue-600"
            >
                <Edit2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 sticky top-0">
                    <h3 className="font-bold text-lg">ข้อมูลลูกค้า</h3>
                    <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                            {selectedCustomer.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                            <p className="text-gray-500">{selectedCustomer.company}</p>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mt-1 inline-block">{selectedCustomer.type}</span>
                        </div>
                        <button 
                            onClick={() => {
                                handleOpenEditModal(selectedCustomer);
                                setSelectedCustomer(null);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600"
                        >
                            <Edit2 size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p className="text-xs text-gray-500">เบอร์โทรศัพท์</p>
                            <p className="font-medium">{selectedCustomer.phone}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Line ID</p>
                            <p className="font-medium text-green-600">{selectedCustomer.lineId || '-'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs text-gray-500">ที่อยู่</p>
                            <p className="font-medium">{selectedCustomer.address}</p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-xs text-yellow-700 font-bold mb-1 flex items-center gap-1"><Star size={12}/> บันทึกช่วยจำ (Notes)</p>
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                            {selectedCustomer.notes || "ไม่มีบันทึก"}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <History size={16} /> ประวัติการจ้างงาน
                        </h4>
                        <div className="space-y-2">
                            {getCustomerJobs(selectedCustomer.id).map(job => (
                                <div key={job.id} className="border border-gray-200 p-3 rounded-lg flex justify-between items-center text-sm">
                                    <div>
                                        <p className="font-medium">{job.title}</p>
                                        <p className="text-xs text-gray-500">{job.date}</p>
                                    </div>
                                    <span className="font-medium text-gray-900">฿{job.amount.toLocaleString()}</span>
                                </div>
                            ))}
                            {getCustomerJobs(selectedCustomer.id).length === 0 && (
                                <p className="text-gray-400 text-center text-sm py-2">ไม่มีประวัติการจ้างงาน</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-lg">{isEditing ? 'แก้ไขข้อมูลลูกค้า' : 'เพิ่มลูกค้าใหม่'}</h3>
                    <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700">ชื่อลูกค้า *</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full border p-2 rounded mt-1" 
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs font-bold text-gray-700">บริษัท (ถ้ามี)</label>
                        <input 
                            type="text" 
                            value={formData.company}
                            onChange={e => setFormData({...formData, company: e.target.value})}
                            className="w-full border p-2 rounded mt-1" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-gray-700">เบอร์โทร *</label>
                            <input 
                                type="text" 
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="w-full border p-2 rounded mt-1" 
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-700">Line ID</label>
                            <input 
                                type="text" 
                                value={formData.lineId}
                                onChange={e => setFormData({...formData, lineId: e.target.value})}
                                className="w-full border p-2 rounded mt-1" 
                            />
                        </div>
                      </div>
                      
                      <div>
                         <label className="text-xs font-bold text-gray-700">ประเภทลูกค้า</label>
                         <select 
                            value={formData.type}
                            onChange={e => setFormData({...formData, type: e.target.value as any})}
                            className="w-full border p-2 rounded mt-1"
                         >
                            <option value="ทั่วไป">ทั่วไป</option>
                            <option value="VIP">VIP (ลูกค้าชั้นดี)</option>
                            <option value="องค์กร">องค์กร (บริษัท)</option>
                         </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-700">ที่อยู่ (สำหรับออกใบกำกับภาษี)</label>
                        <textarea 
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                            className="w-full border p-2 rounded mt-1"
                            rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                            หมายเหตุ (Notes) <span className="text-gray-400 font-normal">- เช่น ชอบของใหม่, จ่ายช้า</span>
                        </label>
                        <textarea 
                            value={formData.notes}
                            onChange={e => setFormData({...formData, notes: e.target.value})}
                            className="w-full border border-yellow-300 bg-yellow-50 p-2 rounded mt-1 text-sm"
                            rows={2}
                            placeholder="บันทึกเพิ่มเติมเกี่ยวกับลูกค้า..."
                        />
                      </div>

                      <div className="pt-2 flex gap-3">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="flex-1 text-gray-500 py-2 border rounded hover:bg-gray-50"
                        >
                            ยกเลิก
                        </button>
                        <button 
                            onClick={handleSubmit}
                            className="flex-1 bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            <Save size={16} /> บันทึก
                        </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default CRMModule;