export enum Role {
  MD = 'MD (คุณจามจุรี)',
  MANAGER = 'Manager (คุณสมโชค)',
  TECH = 'Tech (คุณศุภชนัท)'
}

export enum Phase {
  SALES = 'Phase 1: รับงานและจองคิว',
  PREP = 'Phase 2: เตรียมของ & QC',
  EXECUTION = 'Phase 3: วันงาน',
  CLOSING = 'Phase 4: จบงานและบัญชี'
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  phone: string;
  lineId?: string;
  type: 'ทั่วไป' | 'VIP' | 'องค์กร';
  address: string;
  notes?: string;
  totalJobs: number;
}

export interface JobHistory {
  timestamp: string;
  action: string;
  actor: Role | string;
  details?: string;
}

export interface Job {
  id: string;
  title: string;
  clientName: string;
  customerId?: string; // Link to CRM
  date: string;
  amount: number;
  phase: Phase;
  history: JobHistory[]; // New field for Audit Log
  
  // Phase 1 Data
  isQuotationSent: boolean;
  isDepositReceived: boolean;

  // Phase 2 Data
  isQCPassed: boolean;
  qcChecklist?: {
    screenClean: boolean;
    cablesOk: boolean;
    touchTest: boolean;
    softwareReady: boolean;
  };
  isAssetTagged: boolean;
  isGoBagReady: boolean;
  evidencePhotoUrl?: string;

  // Phase 3 Data
  logisticsStatus: 'รอจอง' | 'จองแล้ว' | 'ถึงสถานที่';
  isInstalled: boolean;
  isSigned: boolean; // Vital for risk management
  
  // Phase 4 Data
  isItemsCollected: boolean;
  isReviewRequested: boolean;
  isReceiptIssued: boolean;
  isTaxDocReceived: boolean; // 50 Tawi
}

export interface FinancialRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'รายรับ' | 'รายจ่าย';
  category: string;
  attachmentUrls?: string[]; // Multiple images support
}

export interface ChatMessage {
  id: string;
  sender: Role;
  text: string;
  imageUrl?: string; // New field for images
  timestamp: string;
  isSystem?: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: Role;
  position: string;
  salaryType: 'รายเดือน' | 'รายวัน/รายจ๊อบ';
  baseSalary: number;
  commissionRate?: number; // percent
  bankAccount: string;
  
  // HR Onboarding Data
  status: 'Active' | 'Resigned';
  phone?: string;
  joinedDate?: string;
  photoUrl?: string;
  educationDocUrl?: string;
  idCardDocUrl?: string;
  notes?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string;
  salary: number;
  commission: number;
  extraPay: number; // Job based
  total: number;
  status: 'รอจ่าย' | 'จ่ายแล้ว';
}