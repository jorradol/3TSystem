import { Job, Customer, FinancialRecord, ChatMessage, Employee, PayrollRecord } from '../types';
import { INITIAL_JOBS, MOCK_CUSTOMERS, MOCK_FINANCE, INITIAL_CHAT, MOCK_EMPLOYEES, MOCK_PAYROLL } from './mockData';

// Keys for LocalStorage
const KEYS = {
  JOBS: '3t_jobs_v1',
  CUSTOMERS: '3t_customers_v1',
  FINANCE: '3t_finance_v1',
  CHAT: '3t_chat_v1',
  EMPLOYEES: '3t_employees_v1',
  PAYROLL: '3t_payroll_v1'
};

// Helper to simulate network delay (for realistic UX)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic Helper to get data or initialize default
function getOrInit<T>(key: string, defaultData: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
}

// --- JOBS API ---
export const JobAPI = {
  getAll: async (): Promise<Job[]> => {
    await delay(500); // Simulate network
    return getOrInit<Job>(KEYS.JOBS, INITIAL_JOBS);
  },
  create: async (job: Job): Promise<Job> => {
    await delay(300);
    const jobs = getOrInit<Job>(KEYS.JOBS, INITIAL_JOBS);
    const newJobs = [job, ...jobs];
    localStorage.setItem(KEYS.JOBS, JSON.stringify(newJobs));
    return job;
  },
  update: async (updatedJob: Job): Promise<Job> => {
    await delay(300);
    const jobs = getOrInit<Job>(KEYS.JOBS, INITIAL_JOBS);
    const newJobs = jobs.map(j => j.id === updatedJob.id ? updatedJob : j);
    localStorage.setItem(KEYS.JOBS, JSON.stringify(newJobs));
    return updatedJob;
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const jobs = getOrInit<Job>(KEYS.JOBS, INITIAL_JOBS);
    const newJobs = jobs.filter(j => j.id !== id);
    localStorage.setItem(KEYS.JOBS, JSON.stringify(newJobs));
  }
};

// --- CRM API ---
export const CustomerAPI = {
  getAll: async (): Promise<Customer[]> => {
    await delay(400);
    return getOrInit<Customer>(KEYS.CUSTOMERS, MOCK_CUSTOMERS);
  },
  create: async (customer: Customer): Promise<Customer> => {
    await delay(300);
    const customers = getOrInit<Customer>(KEYS.CUSTOMERS, MOCK_CUSTOMERS);
    const newCustomers = [...customers, customer];
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(newCustomers));
    return customer;
  },
  update: async (customer: Customer): Promise<Customer> => {
    await delay(300);
    const customers = getOrInit<Customer>(KEYS.CUSTOMERS, MOCK_CUSTOMERS);
    const newCustomers = customers.map(c => c.id === customer.id ? customer : c);
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(newCustomers));
    return customer;
  }
};

// --- FINANCE API ---
export const FinanceAPI = {
  getAll: async (): Promise<FinancialRecord[]> => {
    await delay(300);
    return getOrInit<FinancialRecord>(KEYS.FINANCE, MOCK_FINANCE);
  },
  create: async (record: FinancialRecord): Promise<FinancialRecord> => {
    await delay(300);
    const records = getOrInit<FinancialRecord>(KEYS.FINANCE, MOCK_FINANCE);
    const newRecords = [record, ...records];
    localStorage.setItem(KEYS.FINANCE, JSON.stringify(newRecords));
    return record;
  }
};

// --- CHAT API ---
export const ChatAPI = {
  getAll: async (): Promise<ChatMessage[]> => {
    // Chat loads faster
    return getOrInit<ChatMessage>(KEYS.CHAT, INITIAL_CHAT);
  },
  send: async (msg: ChatMessage): Promise<ChatMessage> => {
    const msgs = getOrInit<ChatMessage>(KEYS.CHAT, INITIAL_CHAT);
    const newMsgs = [...msgs, msg];
    localStorage.setItem(KEYS.CHAT, JSON.stringify(newMsgs));
    return msg;
  }
};

// --- HR API ---
export const HRAPI = {
  getEmployees: async (): Promise<Employee[]> => {
    return getOrInit<Employee>(KEYS.EMPLOYEES, MOCK_EMPLOYEES);
  },
  updateEmployee: async (emp: Employee): Promise<Employee> => {
      const emps = getOrInit<Employee>(KEYS.EMPLOYEES, MOCK_EMPLOYEES);
      const newEmps = emps.some(e => e.id === emp.id) 
        ? emps.map(e => e.id === emp.id ? emp : e) 
        : [...emps, emp];
      localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(newEmps));
      return emp;
  },
  getPayroll: async (): Promise<PayrollRecord[]> => {
    return getOrInit<PayrollRecord>(KEYS.PAYROLL, MOCK_PAYROLL);
  }
};

// Reset System (For Debugging)
export const resetSystem = () => {
  localStorage.clear();
  window.location.reload();
};