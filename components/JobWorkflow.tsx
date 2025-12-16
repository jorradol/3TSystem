import React, { useState } from 'react';
import { Job, Phase, Role, JobHistory } from '../types';
import { CheckCircle, AlertCircle, Truck, FileText, PenTool, Box, Upload, Plus, Trash2, Search, X, Edit2, Save, Share2, Clock, ChevronRight } from 'lucide-react';

interface JobWorkflowProps {
  jobs: Job[];
  currentRole: Role;
  onUpdateJob: (updatedJob: Job) => void;
  onAddJob: (newJob: Job) => void;
  onDeleteJob: (jobId: string) => void;
}

const JobWorkflow: React.FC<JobWorkflowProps> = ({ jobs, currentRole, onUpdateJob, onAddJob, onDeleteJob }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showQCModal, setShowQCModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Job>>({});
  
  // New Job Form State
  const [newJobForm, setNewJobForm] = useState<Partial<Job>>({
    title: '', clientName: '', date: '', amount: 0, phase: Phase.SALES
  });
  
  // Temporary state for QC Checklist
  const [qcChecklist, setQcChecklist] = useState({
      screenClean: false, cablesOk: false, touchTest: false, softwareReady: false
  });

  // Filter Jobs
  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getJobsByPhase = (phase: Phase) => filteredJobs.filter(j => j.phase === phase);

  // Security Check for Money Visibility
  const canSeeMoney = currentRole !== Role.TECH;

  // Helper: Log History
  const logHistory = (job: Job, action: string, details?: string): Job => {
      const newHistory: JobHistory = {
          timestamp: new Date().toLocaleString('th-TH'),
          action,
          actor: currentRole,
          details
      };
      return { ...job, history: [newHistory, ...(job.history || [])] };
  };

  const handleAction = (job: Job, action: string) => {
    let updated = { ...job };
    let logAction = '';

    switch (action) {
      // Phase 1
      case 'send_quote':
        updated.isQuotationSent = true;
        logAction = 'ส่งใบเสนอราคา';
        break;
      case 'confirm_booking':
        updated.isDepositReceived = true;
        updated.phase = Phase.PREP;
        logAction = 'ยืนยันจอง & รับมัดจำ';
        break;
      
      // Phase 2
      case 'open_qc_form':
        setShowQCModal(true);
        if (job.qcChecklist) setQcChecklist(job.qcChecklist);
        return; 
      case 'submit_qc':
        updated.isQCPassed = true;
        updated.qcChecklist = qcChecklist;
        setShowQCModal(false);
        logAction = 'ผ่าน QC';
        break;
      case 'asset_tag':
        updated.isAssetTagged = true;
        logAction = 'ติด Asset Tag';
        break;
      case 'go_bag':
        updated.isGoBagReady = true;
        logAction = 'Go-Bag พร้อม';
        break;
      case 'ready_deploy':
        if(updated.isQCPassed && updated.isAssetTagged && updated.isGoBagReady) {
            updated.phase = Phase.EXECUTION;
            logAction = 'พร้อมออกงาน (ย้ายไป Phase 3)';
        }
        break;

      // Phase 3
      case 'lalamove_booked':
        updated.logisticsStatus = 'จองแล้ว';
        logAction = 'จองรถขนส่ง';
        break;
      case 'installed':
        updated.isInstalled = true;
        logAction = 'ติดตั้งเสร็จสิ้น';
        break;
      case 'sign_delivery':
        updated.isSigned = true;
        logAction = 'ลูกค้าเซ็นรับของ';
        break;
      case 'finish_job':
        if(updated.isSigned) {
            updated.phase = Phase.CLOSING;
            logAction = 'จบงาน (ย้ายไป Phase 4)';
        } else {
            alert("ไม่สามารถปิดงานได้: ลูกค้ายังไม่ได้เซ็นรับของ (Risk Management)");
            return;
        }
        break;

      // Phase 4
      case 'items_collected':
        updated.isItemsCollected = true;
        logAction = 'เก็บของกลับ';
        break;
      case 'issue_receipt':
        updated.isReceiptIssued = true;
        logAction = 'ออกใบเสร็จรับเงิน';
        break;
      case 'receive_tax_doc':
        updated.isTaxDocReceived = true;
        logAction = 'ได้รับใบ 50 ทวิ';
        break;
    }
    
    // Add History Log
    if(logAction) {
        updated = logHistory(updated, logAction);
    }
    
    onUpdateJob(updated);
    if(selectedJob && selectedJob.id === updated.id) {
        setSelectedJob(updated);
    }
  };

  const confirmDelete = (jobId: string) => {
    if(window.confirm('คุณแน่ใจหรือไม่ที่จะลบงานนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        onDeleteJob(jobId);
        setSelectedJob(null);
    }
  };

  const submitAddJob = () => {
    const job: Job = {
        id: `J-${Math.floor(Math.random() * 1000)}`,
        title: newJobForm.title || 'No Title',
        clientName: newJobForm.clientName || 'Unknown',
        date: newJobForm.date || new Date().toISOString().split('T')[0],
        amount: newJobForm.amount || 0,
        phase: Phase.SALES,
        history: [{ timestamp: new Date().toLocaleString('th-TH'), action: 'สร้างงานใหม่', actor: currentRole }],
        isQuotationSent: false, isDepositReceived: false, isQCPassed: false, isAssetTagged: false, isGoBagReady: false,
        logisticsStatus: 'รอจอง', isInstalled: false, isSigned: false, isItemsCollected: false, isReviewRequested: false, isReceiptIssued: false, isTaxDocReceived: false
    };
    onAddJob(job);
    setShowAddJobModal(false);
    setNewJobForm({ title: '', clientName: '', date: '', amount: 0 });
  };

  // --- EDIT MODE HANDLERS ---
  const handleEditClick = (job: Job) => {
      setEditForm(job);
      setIsEditing(true);
  };

  const handleSaveClick = () => {
      if(selectedJob && editForm) {
          let updated = { ...selectedJob, ...editForm };
          // Check what changed to log detailed history
          const changes = [];
          if(selectedJob.title !== updated.title) changes.push(`เปลี่ยนชื่อ: ${updated.title}`);
          if(selectedJob.amount !== updated.amount) changes.push(`เปลี่ยนยอดเงิน: ${updated.amount}`);
          if(selectedJob.date !== updated.date) changes.push(`เปลี่ยนวันที่: ${updated.date}`);

          if(changes.length > 0) {
            updated = logHistory(updated, 'แก้ไขข้อมูล', changes.join(', '));
            onUpdateJob(updated);
            setSelectedJob(updated);
          }
          setIsEditing(false);
      }
  };

  const handleShare = () => {
      if(!selectedJob) return;
      const text = `
📅 *Job Details: ${selectedJob.id}*
------------------
📌 งาน: ${selectedJob.title}
🏢 ลูกค้า: ${selectedJob.clientName}
🗓 วันที่: ${selectedJob.date}
📍 สถานะ: ${selectedJob.phase}
------------------
Link: https://3t-studio.app/job/${selectedJob.id}
      `.trim();
      navigator.clipboard.writeText(text);
      alert('คัดลอกข้อมูลงานแล้ว (Ready to Paste in Line)');
  };

  const renderPhaseColumn = (phase: Phase, title: string, colorClass: string, owner: string) => (
    <div className="flex-shrink-0 w-[85vw] md:w-[320px] bg-gray-50 rounded-xl p-4 flex flex-col h-full snap-center">
      <div className={`pb-3 border-b-2 ${colorClass} mb-4 flex justify-between items-start`}>
        <div>
            <h3 className="font-bold text-gray-800 text-sm md:text-base">{title}</h3>
            <span className="text-xs text-gray-500">Owner: {owner}</span>
        </div>
        <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
            {getJobsByPhase(phase).length}
        </span>
      </div>
      <div className="space-y-3 overflow-y-auto flex-1">
        {getJobsByPhase(phase).length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">ไม่มีงานในสถานะนี้</div>
        )}
        {getJobsByPhase(phase).map(job => (
          <div 
            key={job.id} 
            onClick={() => { setSelectedJob(job); setIsEditing(false); }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow relative active:scale-95 transition-transform group"
          >
            <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-900 text-sm">{job.id}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{job.date}</span>
            </div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 line-clamp-2">{job.title}</h4>
            <div className="flex justify-between items-end">
                <p className="text-xs text-gray-500">{job.clientName}</p>
                {canSeeMoney && (
                    <span className="text-xs font-bold text-blue-600">฿{job.amount.toLocaleString()}</span>
                )}
            </div>
            
            {/* Status Indicators */}
            <div className="flex flex-wrap gap-1 mt-2">
                {phase === Phase.PREP && !job.isQCPassed && <span className="text-[10px] bg-red-100 text-red-700 px-1 rounded">รอ QC</span>}
                {phase === Phase.EXECUTION && !job.isSigned && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1 rounded">รอเซ็นรับ</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col pb-20 md:pb-0 relative">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row gap-3 px-4 md:px-0 mb-4 justify-between items-center">
        <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
             <input 
                type="text" 
                placeholder="ค้นหางาน, ลูกค้า..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none"
             />
        </div>
        <button 
            onClick={() => setShowAddJobModal(true)}
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-blue-700 text-sm"
        >
            <Plus size={18} /> เพิ่มงานใหม่
        </button>
      </div>

      <div className="flex gap-4 h-full overflow-x-auto pb-4 snap-x snap-mandatory md:snap-none px-4 md:px-0">
        {renderPhaseColumn(Phase.SALES, '1. จองคิว & ขาย', 'border-blue-500', 'Manager & MD')}
        {renderPhaseColumn(Phase.PREP, '2. เตรียมของ & QC', 'border-purple-500', 'Tech (Lead)')}
        {renderPhaseColumn(Phase.EXECUTION, '3. วันงานจริง', 'border-yellow-500', 'Manager & Tech')}
        {renderPhaseColumn(Phase.CLOSING, '4. ปิดจ็อบ & บัญชี', 'border-green-500', 'All Teams')}
      </div>

      {/* Add Job Modal */}
      {showAddJobModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
              <div className="bg-white rounded-xl w-full max-w-md p-6">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">เพิ่มงานใหม่ (Create Job)</h3>
                    <button onClick={() => setShowAddJobModal(false)}><X size={20}/></button>
                 </div>
                 <div className="space-y-3">
                    <input type="text" placeholder="ชื่องาน *" className="w-full border p-2 rounded" value={newJobForm.title} onChange={e => setNewJobForm({...newJobForm, title: e.target.value})} />
                    <input type="text" placeholder="ชื่อลูกค้า *" className="w-full border p-2 rounded" value={newJobForm.clientName} onChange={e => setNewJobForm({...newJobForm, clientName: e.target.value})} />
                    <input type="date" className="w-full border p-2 rounded" value={newJobForm.date} onChange={e => setNewJobForm({...newJobForm, date: e.target.value})} />
                    {canSeeMoney && (
                        <input type="number" placeholder="มูลค่าสัญญา (บาท)" className="w-full border p-2 rounded" value={newJobForm.amount} onChange={e => setNewJobForm({...newJobForm, amount: Number(e.target.value)})} />
                    )}
                 </div>
                 <button onClick={submitAddJob} className="w-full bg-blue-600 text-white py-2 rounded mt-4 font-bold">บันทึกงาน</button>
              </div>
          </div>
      )}

      {/* QC Checklist Modal (Paperless Form) */}
      {showQCModal && selectedJob && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
              <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-2xl animate-fade-in">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FileText className="text-purple-600" /> ตรวจสอบอุปกรณ์ (QC)
                  </h3>
                  <div className="space-y-4 mb-6">
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <input 
                            type="checkbox" 
                            checked={qcChecklist.screenClean} 
                            onChange={e => setQcChecklist({...qcChecklist, screenClean: e.target.checked})}
                            className="w-5 h-5 text-purple-600 rounded"
                          />
                          <span className="text-sm font-medium">1. ทำความสะอาดหน้าจอแล้ว</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <input 
                            type="checkbox" 
                            checked={qcChecklist.cablesOk} 
                            onChange={e => setQcChecklist({...qcChecklist, cablesOk: e.target.checked})}
                            className="w-5 h-5 text-purple-600 rounded"
                          />
                          <span className="text-sm font-medium">2. สายสัญญาณครบ/ไม่ขาด</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <input 
                            type="checkbox" 
                            checked={qcChecklist.touchTest} 
                            onChange={e => setQcChecklist({...qcChecklist, touchTest: e.target.checked})}
                            className="w-5 h-5 text-purple-600 rounded"
                          />
                          <span className="text-sm font-medium">3. ทดสอบระบบสัมผัส (Touch)</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <input 
                            type="checkbox" 
                            checked={qcChecklist.softwareReady} 
                            onChange={e => setQcChecklist({...qcChecklist, softwareReady: e.target.checked})}
                            className="w-5 h-5 text-purple-600 rounded"
                          />
                          <span className="text-sm font-medium">4. ลงโปรแกรมพร้อมใช้งาน</span>
                      </label>
                  </div>
                  <div className="flex gap-3">
                      <button 
                        onClick={() => setShowQCModal(false)}
                        className="flex-1 py-2 text-gray-600 border border-gray-300 rounded-lg"
                      >
                          ยกเลิก
                      </button>
                      <button 
                        onClick={() => handleAction(selectedJob, 'submit_qc')}
                        className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-bold shadow-md hover:bg-purple-700 disabled:opacity-50"
                        disabled={!Object.values(qcChecklist).every(Boolean)}
                      >
                          ยืนยันผ่าน QC
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* DETAIL MODAL - REVAMPED */}
      {selectedJob && !showQCModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                     {selectedJob.id.replace('J-', '')}
                 </div>
                 <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-1">{selectedJob.title}</h2>
                    <p className="text-xs text-gray-500">สร้างเมื่อ: {selectedJob.history && selectedJob.history.length > 0 ? selectedJob.history[selectedJob.history.length-1].timestamp : '-'}</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                 {/* Share Button */}
                 <button onClick={handleShare} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="แชร์งาน">
                    <Share2 size={20} />
                 </button>

                 {/* Edit/Save Toggle */}
                 {!isEditing ? (
                    <button onClick={() => handleEditClick(selectedJob)} className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="แก้ไข">
                        <Edit2 size={20} />
                    </button>
                 ) : (
                    <button onClick={handleSaveClick} className="p-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-1 text-sm px-3">
                        <Save size={16} /> บันทึก
                    </button>
                 )}

                 <div className="w-px h-6 bg-gray-300 mx-1"></div>
                 
                 <button 
                    onClick={() => confirmDelete(selectedJob.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                 >
                    <Trash2 size={20} />
                 </button>
                 <button onClick={() => setSelectedJob(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                    <X size={24} />
                 </button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
                {/* LEFT: Main Content */}
                <div className="flex-1 overflow-y-auto p-6 border-r border-gray-100 bg-white">
                    
                    {/* Visual Progress Stepper */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center relative">
                             {/* Line */}
                             <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0"></div>
                             <div className="absolute top-1/2 left-0 h-1 bg-green-500 -z-0 transition-all duration-500" 
                                style={{ width: selectedJob.phase === Phase.SALES ? '15%' : selectedJob.phase === Phase.PREP ? '40%' : selectedJob.phase === Phase.EXECUTION ? '65%' : '100%' }}>
                             </div>

                             {[Phase.SALES, Phase.PREP, Phase.EXECUTION, Phase.CLOSING].map((p, idx) => {
                                 const isPassed = [Phase.SALES, Phase.PREP, Phase.EXECUTION, Phase.CLOSING].indexOf(selectedJob.phase) >= idx;
                                 const isCurrent = selectedJob.phase === p;
                                 return (
                                     <div key={idx} className="flex flex-col items-center gap-2 z-10 bg-white px-1">
                                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isPassed ? 'bg-green-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'}`}>
                                             {idx + 1}
                                         </div>
                                         <span className={`text-[10px] font-bold uppercase ${isCurrent ? 'text-green-600' : 'text-gray-400'}`}>
                                            {p.split(':')[0]}
                                         </span>
                                     </div>
                                 )
                             })}
                        </div>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">ชื่องาน</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={editForm.title} 
                                        onChange={e => setEditForm({...editForm, title: e.target.value})}
                                        className="w-full border p-2 rounded text-sm font-bold mt-1"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-800 text-lg">{selectedJob.title}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">ลูกค้า</label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={editForm.clientName} 
                                        onChange={e => setEditForm({...editForm, clientName: e.target.value})}
                                        className="w-full border p-2 rounded text-sm mt-1"
                                    />
                                ) : (
                                    <p className="font-medium text-gray-800">{selectedJob.clientName}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                             <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">วันที่เริ่มงาน</label>
                                {isEditing ? (
                                    <input 
                                        type="date" 
                                        value={editForm.date} 
                                        onChange={e => setEditForm({...editForm, date: e.target.value})}
                                        className="w-full border p-2 rounded text-sm mt-1"
                                    />
                                ) : (
                                    <p className="font-medium text-gray-800">{selectedJob.date}</p>
                                )}
                            </div>
                             {canSeeMoney && (
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">มูลค่าสัญญา</label>
                                    {isEditing ? (
                                        <input 
                                            type="number" 
                                            value={editForm.amount} 
                                            onChange={e => setEditForm({...editForm, amount: Number(e.target.value)})}
                                            className="w-full border p-2 rounded text-sm mt-1"
                                        />
                                    ) : (
                                        <p className="font-bold text-blue-600 text-lg">฿{selectedJob.amount.toLocaleString()}</p>
                                    )}
                                </div>
                             )}
                        </div>
                    </div>

                    {/* Action Panel based on Phase */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Box size={18} className="text-blue-600"/> การดำเนินการ (Current Actions)
                        </h3>

                        {selectedJob.phase === Phase.SALES && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between bg-white p-3 rounded border">
                                    <span className="text-sm">1. ส่งใบเสนอราคา (MD)</span>
                                    <button 
                                        onClick={() => handleAction(selectedJob, 'send_quote')}
                                        disabled={selectedJob.isQuotationSent}
                                        className={`px-3 py-1.5 rounded text-xs font-bold ${selectedJob.isQuotationSent ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white shadow-sm'}`}
                                    >
                                        {selectedJob.isQuotationSent ? 'ส่งแล้ว' : 'ส่งใบเสนอราคา'}
                                    </button>
                                </div>
                                {canSeeMoney && (
                                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                                        <span className="text-sm">2. รับเงินมัดจำ (MD)</span>
                                        <button 
                                            onClick={() => handleAction(selectedJob, 'confirm_booking')}
                                            disabled={!selectedJob.isQuotationSent}
                                            className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold disabled:opacity-50 shadow-sm"
                                        >
                                            ยืนยันจอง
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedJob.phase === Phase.PREP && (
                            <div className="space-y-3">
                                <p className="text-xs text-gray-500 mb-2">ผู้รับผิดชอบ: Tech (คุณศุภชนัท)</p>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <button 
                                        onClick={() => handleAction(selectedJob, 'open_qc_form')}
                                        className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-2 font-medium ${selectedJob.isQCPassed ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <CheckCircle size={16} /> QC Pass
                                    </button>
                                    <button 
                                        onClick={() => handleAction(selectedJob, 'asset_tag')}
                                        className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-2 font-medium ${selectedJob.isAssetTagged ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <Box size={16} /> Asset Tag
                                    </button>
                                    <button 
                                        onClick={() => handleAction(selectedJob, 'go_bag')}
                                        className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-2 font-medium ${selectedJob.isGoBagReady ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <CheckCircle size={16} /> Go-Bag
                                    </button>
                                </div>
                                <button 
                                    onClick={() => handleAction(selectedJob, 'ready_deploy')}
                                    disabled={!(selectedJob.isQCPassed && selectedJob.isAssetTagged && selectedJob.isGoBagReady)}
                                    className="w-full py-3 bg-purple-600 text-white rounded font-bold disabled:opacity-50 mt-2 shadow hover:bg-purple-700"
                                >
                                    พร้อมออกงาน (ย้ายไป Phase 3)
                                </button>
                            </div>
                        )}

                        {selectedJob.phase === Phase.EXECUTION && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => handleAction(selectedJob, 'lalamove_booked')} className={`py-3 rounded text-sm font-medium border ${selectedJob.logisticsStatus !== 'รอจอง' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white'}`}>
                                        <Truck className="mx-auto mb-1" size={18}/> {selectedJob.logisticsStatus}
                                    </button>
                                    <button onClick={() => handleAction(selectedJob, 'installed')} className={`py-3 rounded text-sm font-medium border ${selectedJob.isInstalled ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white'}`}>
                                        <PenTool className="mx-auto mb-1" size={18}/> {selectedJob.isInstalled ? 'ติดตั้งแล้ว' : 'ติดตั้ง'}
                                    </button>
                                </div>
                                
                                {/* Signature Block */}
                                <div className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center ${selectedJob.isSigned ? 'border-green-400 bg-green-50' : 'border-orange-300 bg-orange-50'}`}>
                                    {selectedJob.isSigned ? (
                                        <>
                                            <CheckCircle size={32} className="text-green-500 mb-2" />
                                            <p className="font-bold text-green-700">ลูกค้าเซ็นรับของแล้ว</p>
                                        </>
                                    ) : (
                                        <button onClick={() => handleAction(selectedJob, 'sign_delivery')} className="w-full h-full flex flex-col items-center py-2">
                                            <PenTool size={32} className="text-orange-400 mb-2" />
                                            <p className="font-bold text-orange-700">แตะเพื่อให้ลูกค้าเซ็นรับของ</p>
                                            <p className="text-xs text-orange-500">(Digital Signature)</p>
                                        </button>
                                    )}
                                </div>

                                <button 
                                    onClick={() => handleAction(selectedJob, 'finish_job')}
                                    className="w-full py-3 bg-yellow-600 text-white rounded font-bold disabled:opacity-50 hover:bg-yellow-700 shadow"
                                >
                                    จบงาน (ย้ายไป Phase 4)
                                </button>
                            </div>
                        )}

                        {selectedJob.phase === Phase.CLOSING && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" checked={selectedJob.isItemsCollected} onChange={() => handleAction(selectedJob, 'items_collected')} className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-medium">เก็บของ & เช็คของกลับ (Tech)</span>
                                    </label>
                                    {canSeeMoney && (
                                        <label className="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-gray-50">
                                            <input type="checkbox" checked={selectedJob.isReceiptIssued} onChange={() => handleAction(selectedJob, 'issue_receipt')} className="w-5 h-5 text-green-600" />
                                            <span className="text-sm font-medium">ออกใบเสร็จรับเงิน (MD)</span>
                                        </label>
                                    )}
                                </div>

                                <div className="bg-orange-50 p-4 rounded border border-orange-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-orange-800">ใบ 50 ทวิ (Tax Doc)</span>
                                        {selectedJob.isTaxDocReceived ? <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">ได้รับแล้ว</span> : <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">ยังไม่ได้รับ</span>}
                                    </div>
                                    <button 
                                        onClick={() => handleAction(selectedJob, 'receive_tax_doc')}
                                        disabled={selectedJob.isTaxDocReceived}
                                        className="w-full py-2 bg-white border border-orange-300 text-orange-700 rounded text-sm hover:bg-orange-100 disabled:opacity-50"
                                    >
                                        ยืนยันการรับเอกสาร
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Audit Log / History */}
                <div className="w-full md:w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
                    <div className="p-4 border-b bg-white">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            <Clock size={16} /> ประวัติการแก้ไข (History)
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {selectedJob.history && selectedJob.history.length > 0 ? (
                            selectedJob.history.map((log, idx) => (
                                <div key={idx} className="relative pl-6 border-l-2 border-gray-200 last:border-0 pb-1">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
                                    <div className="mb-1">
                                        <p className="text-xs text-gray-500 font-mono">{log.timestamp}</p>
                                        <p className="text-sm font-bold text-gray-800">{log.action}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-white inline-block px-2 py-0.5 rounded border">
                                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                        {typeof log.actor === 'string' ? log.actor.split('(')[0] : log.actor}
                                    </div>
                                    {log.details && <p className="text-xs text-gray-600 mt-1 italic">"{log.details}"</p>}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 text-sm mt-10">
                                ยังไม่มีประวัติการแก้ไข
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default JobWorkflow;