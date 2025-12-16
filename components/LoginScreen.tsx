import React, { useState } from 'react';
import { Role } from '../types';
import { Lock, User, ArrowRight, Globe } from 'lucide-react';
import Logo from './Logo';
import { ROLE_THEMES } from '../services/assets';

interface LoginScreenProps {
  onLogin: (role: Role) => void;
  onBackToWebsite?: () => void; // New prop
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBackToWebsite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLogin(Role.MD);
    } else if (username === 'manager' && password === '1234') {
      onLogin(Role.MANAGER);
    } else if (username === 'tech' && password === '1234') {
      onLogin(Role.TECH);
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-prompt relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-900 to-indigo-800 z-0 rounded-b-[40px]"></div>
      
      {/* Back to Website Button */}
      {onBackToWebsite && (
          <button 
            onClick={onBackToWebsite}
            className="absolute top-4 left-4 z-20 text-white/80 hover:text-white flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm"
          >
              <Globe size={16} /> กลับหน้าเว็บไซต์
          </button>
      )}
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md z-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">3T System AI Studio</h1>
          <p className="text-gray-500 text-sm mt-1">ระบบบริหารจัดการธุรกิจแบบครบวงจร</p>
        </div>

        {/* Quick Login Section (For Demo/Speed) */}
        <div className="mb-8">
            <p className="text-xs text-center text-gray-400 mb-3 uppercase tracking-wider">เลือกตำแหน่งเพื่อเข้าใช้งานด่วน</p>
            <div className="grid grid-cols-1 gap-3">
                <button 
                    onClick={() => onLogin(Role.MD)}
                    className={`flex items-center justify-between p-3 rounded-xl border ${ROLE_THEMES.MD.border} ${ROLE_THEMES.MD.soft} hover:bg-indigo-100 transition-colors group`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${ROLE_THEMES.MD.primary} text-white flex items-center justify-center shadow-md`}>
                            <User size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-800 text-sm">MD / เจ้าของกิจการ</p>
                            <p className="text-xs text-gray-500">จัดการเงิน, อนุมัติงาน</p>
                        </div>
                    </div>
                    <ArrowRight size={18} className={`${ROLE_THEMES.MD.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </button>

                <button 
                    onClick={() => onLogin(Role.MANAGER)}
                    className={`flex items-center justify-between p-3 rounded-xl border ${ROLE_THEMES.MANAGER.border} ${ROLE_THEMES.MANAGER.soft} hover:bg-orange-100 transition-colors group`}
                >
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${ROLE_THEMES.MANAGER.primary} text-white flex items-center justify-center shadow-md`}>
                            <User size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-800 text-sm">Manager / ผู้จัดการ</p>
                            <p className="text-xs text-gray-500">ขาย, จัดคิว, คุมหน้างาน</p>
                        </div>
                    </div>
                    <ArrowRight size={18} className={`${ROLE_THEMES.MANAGER.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </button>

                <button 
                    onClick={() => onLogin(Role.TECH)}
                    className={`flex items-center justify-between p-3 rounded-xl border ${ROLE_THEMES.TECH.border} ${ROLE_THEMES.TECH.soft} hover:bg-emerald-100 transition-colors group`}
                >
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${ROLE_THEMES.TECH.primary} text-white flex items-center justify-center shadow-md`}>
                            <User size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-800 text-sm">Tech / ช่างเทคนิค</p>
                            <p className="text-xs text-gray-500">ติดตั้ง, QC, เก็บของ</p>
                        </div>
                    </div>
                    <ArrowRight size={18} className={`${ROLE_THEMES.TECH.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </button>
            </div>
        </div>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-300 text-xs">หรือเข้าสู่ระบบด้วยรหัสผ่าน</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mt-4 opacity-50 hover:opacity-100 transition-opacity">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black font-medium text-sm"
          >
            เข้าสู่ระบบ (Manual)
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;