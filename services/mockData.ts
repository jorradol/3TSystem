import { Job, Phase, Role, FinancialRecord, ChatMessage, Employee, PayrollRecord, Customer } from '../types';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'C001',
    name: 'คุณวิชัย',
    company: 'ABC Corp',
    phone: '081-234-5678',
    lineId: '@vichai_abc',
    type: 'องค์กร',
    address: '123 ถ.สุขุมวิท กทม.',
    totalJobs: 5,
    notes: 'ชอบจอภาพคมชัด, จ่ายเงินตรงเวลา'
  },
  {
    id: 'C002',
    name: 'คุณแอน',
    company: 'Innovate Co',
    phone: '089-999-8888',
    lineId: 'ann_innovate',
    type: 'VIP',
    address: '456 ถ.สีลม กทม.',
    totalJobs: 12,
    notes: 'ต้องการทีมงานแต่งตัวสุภาพมาก'
  },
  {
    id: 'C003',
    name: 'คุณสมชาย',
    company: 'Event Pro',
    phone: '085-555-5555',
    lineId: 'somchai_evt',
    type: 'ทั่วไป',
    address: '789 ถ.รัชดา กทม.',
    totalJobs: 2,
    notes: ''
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'J-101',
    title: 'ติดตั้งจอทัชสกรีน - โรงแรมแกรนด์',
    clientName: 'ABC Corp',
    customerId: 'C001',
    date: '2023-10-25',
    amount: 25000,
    phase: Phase.EXECUTION,
    history: [
        { timestamp: '2023-10-20 09:00', action: 'สร้างงานใหม่', actor: Role.MANAGER },
        { timestamp: '2023-10-20 10:30', action: 'ส่งใบเสนอราคา', actor: Role.MD },
        { timestamp: '2023-10-21 14:00', action: 'รับมัดจำ/ยืนยันงาน', actor: Role.MD },
        { timestamp: '2023-10-24 16:00', action: 'ผ่าน QC', actor: Role.TECH, details: 'อุปกรณ์ครบถ้วน' },
    ],
    isQuotationSent: true,
    isDepositReceived: true,
    isQCPassed: true,
    qcChecklist: {
        screenClean: true,
        cablesOk: true,
        touchTest: true,
        softwareReady: true
    },
    isAssetTagged: true,
    isGoBagReady: true,
    logisticsStatus: 'ถึงสถานที่',
    isInstalled: true,
    isSigned: false, // Pending Signature!
    isItemsCollected: false,
    isReviewRequested: false,
    isReceiptIssued: false,
    isTaxDocReceived: false
  },
  {
    id: 'J-102',
    title: 'ตู้คีออสอินเตอร์แอคทีฟ - งาน Tech Expo',
    clientName: 'Innovate Co',
    customerId: 'C002',
    date: '2023-10-28',
    amount: 45000,
    phase: Phase.PREP,
    history: [
        { timestamp: '2023-10-22 11:00', action: 'สร้างงานใหม่', actor: Role.MANAGER },
        { timestamp: '2023-10-23 09:00', action: 'ยืนยันจอง', actor: Role.MD },
    ],
    isQuotationSent: true,
    isDepositReceived: true,
    isQCPassed: false,
    isAssetTagged: false,
    isGoBagReady: false,
    logisticsStatus: 'รอจอง',
    isInstalled: false,
    isSigned: false,
    isItemsCollected: false,
    isReviewRequested: false,
    isReceiptIssued: false,
    isTaxDocReceived: false
  },
  {
    id: 'J-103',
    title: 'เช่าจอ 55 นิ้ว - งานเลี้ยงบริษัท',
    clientName: 'Event Pro',
    customerId: 'C003',
    date: '2023-10-30',
    amount: 12000,
    phase: Phase.SALES,
    history: [
        { timestamp: '2023-10-24 10:00', action: 'สร้างงานใหม่', actor: Role.MANAGER },
    ],
    isQuotationSent: true,
    isDepositReceived: false,
    isQCPassed: false,
    isAssetTagged: false,
    isGoBagReady: false,
    logisticsStatus: 'รอจอง',
    isInstalled: false,
    isSigned: false,
    isItemsCollected: false,
    isReviewRequested: false,
    isReceiptIssued: false,
    isTaxDocReceived: false
  },
  {
    id: 'J-099',
    title: 'จอแสดงผลงานประชุมประจำปี',
    clientName: 'MegaGroup',
    date: '2023-10-20',
    amount: 30000,
    phase: Phase.CLOSING,
    history: [
        { timestamp: '2023-10-15 08:00', action: 'เริ่มงาน', actor: Role.MANAGER },
        { timestamp: '2023-10-20 20:00', action: 'จบงาน', actor: Role.TECH },
    ],
    isQuotationSent: true,
    isDepositReceived: true,
    isQCPassed: true,
    isAssetTagged: true,
    isGoBagReady: true,
    logisticsStatus: 'ถึงสถานที่',
    isInstalled: true,
    isSigned: true,
    isItemsCollected: true,
    isReviewRequested: true,
    isReceiptIssued: true,
    isTaxDocReceived: false // Alert!
  }
];

export const MOCK_FINANCE: FinancialRecord[] = [
  { id: 'F1', date: '2023-10-01', description: 'มัดจำ - J-101', amount: 12500, type: 'รายรับ', category: 'การขาย' },
  { id: 'F2', date: '2023-10-02', description: 'เครดิต Lalamove', amount: 2000, type: 'รายจ่าย', category: 'โลจิสติกส์' },
  { id: 'F3', date: '2023-10-05', description: 'ซื้อสาย HDMI ใหม่', amount: 1500, type: 'รายจ่าย', category: 'อุปกรณ์' },
  { id: 'F4', date: '2023-10-10', description: 'รับเงินงวดสุดท้าย - J-098', amount: 18000, type: 'รายรับ', category: 'การขาย' },
  { id: 'F5', date: '2023-10-15', description: 'ประกันภัยความรับผิด', amount: 5000, type: 'รายจ่าย', category: 'ประกันภัย' },
];

export const INITIAL_CHAT: ChatMessage[] = [
  { id: 'C1', sender: Role.MD, text: 'คอนเฟิร์มงบยิงแอดเดือนหน้าให้หน่อยค่ะ', timestamp: '10:00' },
  { id: 'C2', sender: Role.MANAGER, text: 'รับทราบครับ จองรถ Lalamove งาน J-101 แล้วครับ', timestamp: '10:05' },
  { id: 'C3', sender: Role.TECH, text: 'QC งาน J-101 เรียบร้อย เจอสายเสีย 1 เส้น เปลี่ยนแล้วครับ', timestamp: '10:15' },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { 
    id: 'E001', 
    name: 'คุณจามจุรี (MD)', 
    role: Role.MD, 
    position: 'Managing Director', 
    salaryType: 'รายเดือน', 
    baseSalary: 50000, 
    bankAccount: 'KBANK 123-4-56789-0',
    status: 'Active',
    phone: '081-111-1111',
    joinedDate: '2020-01-01'
  },
  { 
    id: 'E002', 
    name: 'คุณสมโชค (Manager)', 
    role: Role.MANAGER, 
    position: 'Sales & Operations Manager', 
    salaryType: 'รายเดือน', 
    baseSalary: 25000, 
    commissionRate: 5, 
    bankAccount: 'SCB 987-6-54321-0',
    status: 'Active',
    phone: '082-222-2222',
    joinedDate: '2021-06-15'
  },
  { 
    id: 'E003', 
    name: 'คุณศุภชนัท (Tech)', 
    role: Role.TECH, 
    position: 'Technical Lead', 
    salaryType: 'รายวัน/รายจ๊อบ', 
    baseSalary: 0, 
    bankAccount: 'BBL 555-5-55555-5',
    status: 'Active',
    phone: '083-333-3333',
    joinedDate: '2022-03-01'
  }
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  {
    id: 'P001',
    employeeId: 'E002',
    month: 'กันยายน 2566',
    salary: 25000,
    commission: 5000,
    extraPay: 0,
    total: 30000,
    status: 'จ่ายแล้ว'
  },
  {
    id: 'P002',
    employeeId: 'E003',
    month: 'กันยายน 2566',
    salary: 0,
    commission: 0,
    extraPay: 15000,
    total: 15000,
    status: 'จ่ายแล้ว'
  }
];