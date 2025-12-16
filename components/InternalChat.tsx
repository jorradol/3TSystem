import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Role } from '../types';
import { Send, Image as ImageIcon, Bell, BellOff, MoreVertical } from 'lucide-react';

interface InternalChatProps {
  messages: ChatMessage[];
  currentRole: Role;
  onSendMessage: (text: string, imageUrl?: string) => void;
  isOtherTyping?: boolean; // New prop for typing status
}

const InternalChat: React.FC<InternalChatProps> = ({ messages, currentRole, onSendMessage, isOtherTyping }) => {
  const [inputText, setInputText] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOtherTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a fake local URL for the image (Simulation)
      const imageUrl = URL.createObjectURL(file);
      onSendMessage("ส่งรูปภาพ", imageUrl);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-20 md:mb-0 relative">
      
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center z-10">
        <div>
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              แชททีม 3T
              {notificationsEnabled ? 
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="การแจ้งเตือนเปิดอยู่"></span> :
                <span className="w-2 h-2 bg-gray-300 rounded-full" title="การแจ้งเตือนปิดอยู่"></span>
              }
            </h3>
            <p className="text-xs text-gray-500">สำหรับส่งรูป QC, สลิปโอนเงิน, คุยงาน</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`p-2 rounded-full transition-colors ${notificationsEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
              title={notificationsEnabled ? "ปิดการแจ้งเตือน" : "เปิดการแจ้งเตือน"}
            >
               {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
            </button>
            <div className="flex -space-x-2 pl-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"></div>)}
            </div>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {messages.map((msg) => {
          const isMe = msg.sender === currentRole;
          return (
            <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[80%] md:max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                
                {/* Sender Name */}
                {!isMe && <p className="text-xs text-gray-500 ml-1 mb-1">{msg.sender.split('(')[0]}</p>}
                
                {/* Message Bubble */}
                <div className={`rounded-2xl p-3 shadow-sm ${
                    isMe 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                    {/* Image Attachment */}
                    {msg.imageUrl && (
                        <div className="mb-2 rounded-lg overflow-hidden border border-black/10">
                            <img src={msg.imageUrl} alt="attachment" className="max-w-full h-auto max-h-60 object-cover" />
                        </div>
                    )}
                    
                    {/* Text */}
                    {msg.text && <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>}
                </div>
                
                {/* Timestamp */}
                <p className={`text-[10px] mt-1 mx-1 ${isMe ? 'text-gray-400' : 'text-gray-400'}`}>{msg.timestamp}</p>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isOtherTyping && (
           <div className="flex w-full justify-start animate-fade-in">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm p-3 shadow-sm flex items-center gap-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
           </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 md:p-4 bg-white border-t flex gap-2 items-end">
        <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageUpload}
        />
        <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 hover:text-blue-500 p-2 bg-gray-50 rounded-full hover:bg-blue-50 transition-colors mb-1"
        >
            <ImageIcon size={20} />
        </button>
        
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
            <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                    }
                }}
                placeholder="พิมพ์ข้อความ..."
                className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none max-h-24 outline-none"
                rows={1}
                style={{ minHeight: '24px' }}
            />
        </div>
        
        <button 
          type="submit" 
          disabled={!inputText.trim()}
          className={`p-3 rounded-full mb-1 transition-all shadow-sm ${
              inputText.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default InternalChat;