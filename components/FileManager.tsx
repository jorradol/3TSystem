import React from 'react';
import { Folder, FileText, Image as ImageIcon, Table } from 'lucide-react';

const FileManager = () => {
  const folders = [
    { name: '01_ใบเสนอราคา_ใบเสร็จ', count: 12, icon: Folder, color: 'text-yellow-500' },
    { name: '02_รูปหน้างาน_รีวิว', count: 45, icon: Folder, color: 'text-blue-500' },
    { name: '03_บัญชี_รายจ่าย', count: 8, icon: Folder, color: 'text-green-500' },
    { name: '04_ทะเบียนทรัพย์สิน', count: 1, icon: Folder, color: 'text-purple-500' },
  ];

  const recentFiles = [
    { name: 'QT-2023-10-01_GrandHotel.pdf', type: 'PDF', date: '2 ชม. ที่แล้ว', icon: FileText },
    { name: 'Site_Setup_J101.jpg', type: 'Image', date: '5 ชม. ที่แล้ว', icon: ImageIcon },
    { name: 'Expense_Oct_2023.xlsx', type: 'Excel', date: '1 วันที่แล้ว', icon: Table },
    { name: 'Receipt_RC-099.pdf', type: 'PDF', date: '1 วันที่แล้ว', icon: FileText },
  ];

  return (
    <div className="space-y-6 pb-20">
      <h3 className="text-lg font-semibold text-gray-800">คลังเอกสารออนไลน์ (Drive)</h3>
      
      {/* Folders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map((folder, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center">
            <folder.icon size={48} className={`mb-3 ${folder.color} fill-current bg-opacity-10`} />
            <h4 className="font-medium text-gray-700 text-sm truncate w-full">{folder.name}</h4>
            <span className="text-xs text-gray-400 mt-1">{folder.count} รายการ</span>
          </div>
        ))}
      </div>

      {/* Recent Files Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
            <h4 className="font-semibold text-gray-700">ไฟล์ล่าสุด</h4>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3 font-medium">ชื่อไฟล์</th>
                        <th className="px-6 py-3 font-medium">ประเภท</th>
                        <th className="px-6 py-3 font-medium">แก้ไขเมื่อ</th>
                    </tr>
                </thead>
                <tbody>
                    {recentFiles.map((file, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="px-6 py-3 flex items-center gap-3">
                                <file.icon size={16} className="text-gray-400" />
                                <span className="text-gray-700">{file.name}</span>
                            </td>
                            <td className="px-6 py-3 text-gray-500">{file.type}</td>
                            <td className="px-6 py-3 text-gray-500">{file.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default FileManager;