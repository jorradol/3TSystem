import React, { useState } from 'react';
import { Phone, MessageSquare, Facebook, MapPin, CheckCircle, Send, Menu, X, LogIn, Calendar, Monitor, Truck, ShieldCheck, PenTool } from 'lucide-react';
import { ROLE_THEMES } from '../services/assets';
import Logo from './Logo';

interface LandingPageProps {
  onLoginClick: () => void;
}

type Lang = 'TH' | 'EN' | 'CN' | 'JP';

// Internal Product Visualization Component (Replaces External Image)
const ProductVisual = () => (
    <div className="relative w-full max-w-[300px] mx-auto aspect-[3/4] flex flex-col items-center justify-center">
        {/* Screen */}
        <div className="w-full aspect-video bg-gray-900 rounded-xl border-4 border-gray-800 shadow-2xl flex items-center justify-center relative overflow-hidden ring-4 ring-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
            {/* Screen Content Simulation */}
            <div className="z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                   <PenTool className="text-white" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg">Interactive 4K</h3>
                <p className="text-gray-400 text-xs">Touch & Write</p>
            </div>
            {/* Glare effect */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12"></div>
        </div>
        {/* Stand */}
        <div className="w-4 h-32 bg-gray-700 mt-[-2px]"></div>
        <div className="w-32 h-4 bg-gray-800 rounded-full shadow-lg flex justify-between px-4">
             <div className="w-4 h-4 bg-black rounded-full mt-1"></div>
             <div className="w-4 h-4 bg-black rounded-full mt-1"></div>
        </div>
        
        {/* Decorative Badge */}
        <div className="absolute -top-4 -right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
            Hot Item!
        </div>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const [lang, setLang] = useState<Lang>('TH');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Enhanced Lead Form State with Booking Dates
  const [leadForm, setLeadForm] = useState({ 
      name: '', 
      phone: '', 
      startDate: '',
      endDate: '',
      location: '' 
  });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending data to backend
    console.log("Lead Captured:", leadForm);
    alert(`บันทึกการจองสำเร็จ!\nคุณ ${leadForm.name}\nวันที่: ${leadForm.startDate} ถึง ${leadForm.endDate}\n\nเจ้าหน้าที่ (คุณสมโชค) จะโทรยืนยันคิวภายใน 15 นาทีครับ`);
    setLeadForm({ name: '', phone: '', startDate: '', endDate: '', location: '' });
  };

  const content = {
    TH: {
      nav: { home: 'หน้าแรก', service: 'สเปคสินค้า', contact: 'เช่าเลย', login: 'พนง. Log in' },
      hero: {
        badge: 'Interactive Solution Provider',
        title: 'เช่าจอทัชสกรีน\nรายวัน/รายเดือน',
        subtitle: 'จอ 65 นิ้ว 4K เขียนได้ ลื่นไหล พร้อมขาตั้งล้อเลื่อน สำหรับงานอีเวนต์และประชุม',
        price: 'เริ่มต้น 6,500 บ.'
      },
      form: {
        title: 'เช็คคิวว่าง & จองทันที',
        name: 'ชื่อผู้ติดต่อ / บริษัท',
        phone: 'เบอร์โทรศัพท์',
        dates: 'วันที่ใช้งาน',
        location: 'สถานที่จัดงาน (คร่าวๆ)',
        btn: 'ส่งข้อมูลจองคิว'
      }
    },
    // ... Other languages kept simpler for speed optimization in this example
    EN: {
      nav: { home: 'Home', service: 'Specs', contact: 'Book Now', login: 'Staff Login' },
      hero: { badge: 'Solution Provider', title: 'Touch Screen Rental', subtitle: '65" 4K Interactive Screen with Stand for Events.', price: 'Start 6,500 THB' },
      form: { title: 'Check Availability', name: 'Name / Company', phone: 'Phone Number', dates: 'Event Dates', location: 'Location', btn: 'Request Booking' }
    },
    CN: { nav: { home: '首页', service: '规格', contact: '预订', login: '员工' }, hero: { badge: '解决方案', title: '触摸屏租赁', subtitle: '65英寸4K交互式屏幕，适用于活动。', price: '6,500 泰铢起' }, form: { title: '预订', name: '姓名/公司', phone: '电话', dates: '日期', location: '地点', btn: '提交' } },
    JP: { nav: { home: 'ホーム', service: 'スペック', contact: '予約', login: 'スタッフ' }, hero: { badge: 'ソリューション', title: 'タッチパネルレンタル', subtitle: 'イベント用65インチ4K電子黒板。', price: '6,500バーツ〜' }, form: { title: '空き状況確認', name: '名前/会社', phone: '電話番号', dates: '日程', location: '場所', btn: '予約送信' } }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-white font-prompt text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent leading-none">
                    Tech Touch Trans
                </h1>
                <p className="text-[10px] text-gray-500 tracking-wider">3T SYSTEM</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-gray-600 hover:text-pink-600 font-medium">{t.nav.home}</a>
              <a href="#features" className="text-gray-600 hover:text-orange-600 font-medium">{t.nav.service}</a>
              <a href="#booking" className="text-gray-600 hover:text-emerald-600 font-medium">{t.nav.contact}</a>
              
              <div className="flex gap-1 border-l pl-4">
                {(['TH', 'EN', 'CN', 'JP'] as Lang[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`text-xs px-2 py-1 rounded ${lang === l ? 'bg-black text-white' : 'text-gray-400'}`}>{l}</button>
                ))}
              </div>

              <button onClick={onLoginClick} className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                <LogIn size={14} /> {t.nav.login}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-3">
                 <button onClick={() => {
                        const langs: Lang[] = ['TH', 'EN', 'CN', 'JP'];
                        setLang(langs[(langs.indexOf(lang) + 1) % langs.length]);
                    }} className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">
                    {lang}
                 </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-50 p-4 shadow-xl">
                <div className="flex flex-col space-y-3 text-center">
                    <a href="#home" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-800 font-medium">{t.nav.home}</a>
                    <a href="#booking" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-800 font-medium">{t.nav.contact}</a>
                    <button onClick={onLoginClick} className="w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                        <LogIn size={18} /> {t.nav.login}
                    </button>
                </div>
            </div>
        )}
      </nav>

      {/* Main Content Area */}
      <div className="pt-20 md:pt-28 pb-12 max-w-5xl mx-auto px-4">
        
        {/* Hero & Booking Section Combined for Speed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left: Value Prop & Product Visual */}
            <div className="text-center md:text-left space-y-6">
                <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100">
                    {t.hero.badge}
                </span>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {t.hero.title}
                </h1>
                
                <p className="text-gray-600 text-lg">
                    {t.hero.subtitle}
                </p>

                {/* Minimal Features List */}
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 pt-2">
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> จอ 4K คมชัด</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> เขียนลื่นไหล</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> ส่งฟรี กทม.</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> มีทีมดูแล</div>
                </div>

                <div className="py-6 md:py-0">
                    <ProductVisual />
                </div>
            </div>

            {/* Right: Booking Form (High Priority) */}
            <div id="booking" className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-orange-500 to-emerald-500"></div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{t.form.title}</h2>
                <p className="text-sm text-gray-500 mb-6">กรอกข้อมูลเพื่อเช็คคิวและรับใบเสนอราคา</p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-700 ml-1">{t.form.name}</label>
                        <input 
                            required type="text" 
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="เช่น คุณวิชัย / บจก. เอบีซี"
                            value={leadForm.name}
                            onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 ml-1">{t.form.phone}</label>
                        <input 
                            required type="tel" 
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="08x-xxx-xxxx"
                            value={leadForm.phone}
                            onChange={e => setLeadForm({...leadForm, phone: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-gray-700 ml-1">วันที่เริ่ม</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 text-gray-400" size={16} />
                                <input 
                                    required type="date" 
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-2 py-3 text-sm outline-none"
                                    value={leadForm.startDate}
                                    onChange={e => setLeadForm({...leadForm, startDate: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-700 ml-1">ถึงวันที่</label>
                            <input 
                                required type="date" 
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 text-sm outline-none"
                                value={leadForm.endDate}
                                onChange={e => setLeadForm({...leadForm, endDate: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 ml-1">{t.form.location}</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="เช่น ไบเทค บางนา"
                            value={leadForm.location}
                            onChange={e => setLeadForm({...leadForm, location: e.target.value})}
                        />
                    </div>

                    <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 mt-2">
                        <Send size={18} /> {t.form.btn}
                    </button>
                    
                    <p className="text-[10px] text-center text-gray-400 mt-2">
                        *เราจะติดต่อกลับภายใน 15 นาที (เวลาทำการ)
                    </p>
                </form>
            </div>
        </div>

        {/* Quick Contact Bar */}
        <div className="mt-16 border-t pt-8">
            <h3 className="text-center font-bold text-gray-400 text-sm mb-6 uppercase tracking-widest">ช่องทางการติดต่อด่วน</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <a href="tel:0622941717" className="flex items-center gap-3 px-6 py-3 bg-white border rounded-full shadow-sm hover:shadow-md transition-all">
                    <div className="p-2 bg-pink-100 text-pink-600 rounded-full"><Phone size={20}/></div>
                    <div className="text-left">
                        <p className="text-[10px] text-gray-500">โทรด่วน</p>
                        <p className="font-bold text-gray-800">062-294-1717</p>
                    </div>
                </a>
                <a href="#" className="flex items-center gap-3 px-6 py-3 bg-white border rounded-full shadow-sm hover:shadow-md transition-all">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full"><MessageSquare size={20}/></div>
                    <div className="text-left">
                        <p className="text-[10px] text-gray-500">Line ID</p>
                        <p className="font-bold text-gray-800">@TechTouchTrans</p>
                    </div>
                </a>
                <a href="#" className="flex items-center gap-3 px-6 py-3 bg-white border rounded-full shadow-sm hover:shadow-md transition-all">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Facebook size={20}/></div>
                    <div className="text-left">
                        <p className="text-[10px] text-gray-500">Facebook</p>
                        <p className="font-bold text-gray-800">TechTouchTrans</p>
                    </div>
                </a>
            </div>
            <div className="text-center mt-8 text-xs text-gray-400 flex items-center justify-center gap-1">
                <MapPin size={12} />
                331/1 ซอยสายไหม 33/1 แขวงสายไหม เขตสายไหม กทม. 10220
            </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;