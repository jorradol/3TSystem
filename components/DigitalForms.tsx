import React from 'react';
import { FileText, ClipboardCheck, AlertTriangle, PenTool, Receipt } from 'lucide-react';

const DigitalForms: React.FC = () => {
  const forms = [
    { 
      id: 'quote', 
      title: 'สร้างใบเสนอราคา (Quotation)', 
      desc: 'สำหรับลูกค้าใหม่ ส่ง Line ได้ทันที',
      icon: FileText,
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    { 
      id: 'receipt', 
      title: 'ออกใบเสร็จรับเงิน (Receipt)', 
      desc: 'สำหรับรับเงินมัดจำ/งวดสุดท้าย',
      icon: Receipt,
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    { 
      id: 'qc', 
      title: 'ฟอร์ม QC อุปกรณ์', 
      desc: 'บังคับทำก่อนเอาของขึ้นรถ',
      icon: ClipboardCheck,
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    { 
      id: 'handover', 
      title: 'ใบส่งมอบงาน (E-Sign)', 
      desc: 'ให้ลูกค้าเซ็นรับของหน้างาน',
      icon: PenTool,
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    },
    { 
      id: 'incident', 
      title: 'แจ้งอุปกรณ์เสียหาย', 
      desc: 'ถ่ายรูปแจ้งซ่อม/เคลมประกัน',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-700 border-red-200'
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-blue-600" />
            แบบฟอร์มดิจิทัล (Paperless)
         </h2>
         <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">พร้อมใช้งาน</span>
      </div>
      
      <p className="text-gray-500 text-sm">แตะที่รายการเพื่อเปิดแบบฟอร์ม ลดการใช้กระดาษและทำงานได้เร็วขึ้น</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forms.map(form => (
          <div key={form.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-400 hover:shadow-md cursor-pointer flex items-center gap-5 transition-all active:scale-[0.98]">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${form.color} border`}>
                <form.icon size={28} />
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{form.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{form.desc}</p>
            </div>
            <div className="text-gray-300 bg-gray-50 rounded-full w-8 h-8 flex items-center justify-center">
                ➔
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 mt-4">
          <h4 className="font-bold text-blue-900 mb-2 text-sm flex items-center gap-2">
            💡 ทิปการใช้งานสำหรับหน้างาน
          </h4>
          <ul className="text-xs md:text-sm text-blue-800 space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-500">•</span> 
                ใช้ฟอร์ม <b>"QC อุปกรณ์"</b> ทุกครั้งก่อนขนของขึ้นรถ เพื่อป้องกันการลืมของ
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span> 
                <b>"ใบส่งมอบงาน"</b> สำคัญมาก! ต้องให้ลูกค้าเซ็นบนมือถือ/แท็บเล็ตเสมอ
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span> 
                สามารถกด <b>"ออกใบเสร็จ"</b> และส่งไฟล์ PDF เข้าไลน์ลูกค้าได้ทันที
              </li>
          </ul>
      </div>
    </div>
  );
};

export default DigitalForms;