// Mock Firestore service for demo mode when Firebase is not configured
import { Investor } from '../App';

export interface BaseDocument {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncomeDocument extends BaseDocument {
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  frequency?: string;
  investors: Array<{
    name: string;
    percentage: number;
  }>;
}

export interface ExpenseDocument extends BaseDocument {
  description: string;
  amount: number;
  currency: string;
  category: string;
  frequency: string;
  date: string;
  paid: boolean;
  investors: Array<{
    name: string;
    percentage: number;
  }>;
}

export interface InvestorDocument extends BaseDocument {
  name: string;
  expensePercentage: number;
  incomePercentage: number;
}

// In-memory storage for demo mode
let mockIncome: IncomeDocument[] = [];
let mockExpenses: ExpenseDocument[] = [];
let mockInvestors: InvestorDocument[] = [];

// Counter for unique IDs
let idCounter = 0;

// Load from localStorage if available
try {
  const savedIncome = localStorage.getItem('blop-mock-income');
  const savedExpenses = localStorage.getItem('blop-mock-expenses');
  const savedInvestors = localStorage.getItem('blop-mock-investors');
  const savedCounter = localStorage.getItem('blop-mock-id-counter');
  
  if (savedIncome) mockIncome = JSON.parse(savedIncome);
  if (savedExpenses) mockExpenses = JSON.parse(savedExpenses);
  if (savedInvestors) mockInvestors = JSON.parse(savedInvestors);
  if (savedCounter) idCounter = parseInt(savedCounter, 10);
} catch (error) {
  console.warn('Error loading mock data from localStorage:', error);
}

// Generate unique ID
const generateUniqueId = (): string => {
  idCounter++;
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  const id = `${timestamp}-${idCounter}-${random}`;
  
  // Save counter to localStorage
  try {
    localStorage.setItem('blop-mock-id-counter', idCounter.toString());
  } catch (error) {
    console.warn('Error saving ID counter to localStorage:', error);
  }
  
  return id;
};

// Save to localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem('blop-mock-income', JSON.stringify(mockIncome));
    localStorage.setItem('blop-mock-expenses', JSON.stringify(mockExpenses));
    localStorage.setItem('blop-mock-investors', JSON.stringify(mockInvestors));
  } catch (error) {
    console.warn('Error saving mock data to localStorage:', error);
  }
};

// Mock income service
export const mockIncomeService = {
  async add(userId: string, income: Omit<IncomeDocument, keyof BaseDocument>): Promise<string> {
    const id = generateUniqueId();
    const newIncome: IncomeDocument = {
      ...income,
      id,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockIncome.push(newIncome);
    saveToStorage();
    
    // Trigger listeners
    setTimeout(() => {
      incomeListeners.forEach(listener => {
        if (listener.userId === userId) {
          const userIncome = mockIncome.filter(item => item.userId === userId);
          listener.callback(userIncome);
        }
      });
    }, 0);
    
    return id;
  },

  async update(id: string, updates: Partial<IncomeDocument>): Promise<void> {
    const index = mockIncome.findIndex(item => item.id === id);
    if (index !== -1) {
      const userId = mockIncome[index].userId;
      mockIncome[index] = { ...mockIncome[index], ...updates, updatedAt: new Date() };
      saveToStorage();
      
      // Trigger listeners
      setTimeout(() => {
        incomeListeners.forEach(listener => {
          if (listener.userId === userId) {
            const userIncome = mockIncome.filter(item => item.userId === userId);
            listener.callback(userIncome);
          }
        });
      }, 0);
    }
  },

  async delete(id: string): Promise<void> {
    const itemToDelete = mockIncome.find(item => item.id === id);
    const userId = itemToDelete?.userId;
    mockIncome = mockIncome.filter(item => item.id !== id);
    saveToStorage();
    
    // Trigger listeners
    if (userId) {
      setTimeout(() => {
        incomeListeners.forEach(listener => {
          if (listener.userId === userId) {
            const userIncome = mockIncome.filter(item => item.userId === userId);
            listener.callback(userIncome);
          }
        });
      }, 0);
    }
  },

  async getAll(userId: string): Promise<IncomeDocument[]> {
    return mockIncome.filter(item => item.userId === userId);
  },

  onSnapshot(userId: string, callback: (income: IncomeDocument[]) => void) {
    const data = mockIncome.filter(item => item.userId === userId);
    callback(data);
    
    // Store listener for future updates
    const listener = { userId, callback };
    incomeListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = incomeListeners.indexOf(listener);
      if (index > -1) {
        incomeListeners.splice(index, 1);
      }
    };
  }
};

// Listener storage
const incomeListeners: Array<{ userId: string; callback: (data: IncomeDocument[]) => void }> = [];
const expenseListeners: Array<{ userId: string; callback: (data: ExpenseDocument[]) => void }> = [];
const investorListeners: Array<{ userId: string; callback: (data: InvestorDocument[]) => void }> = [];

// Mock expense service
export const mockExpenseService = {
  async add(userId: string, expense: Omit<ExpenseDocument, keyof BaseDocument>): Promise<string> {
    const id = generateUniqueId();
    const newExpense: ExpenseDocument = {
      ...expense,
      id,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockExpenses.push(newExpense);
    saveToStorage();
    
    // Trigger listeners
    setTimeout(() => {
      expenseListeners.forEach(listener => {
        if (listener.userId === userId) {
          const userExpenses = mockExpenses.filter(item => item.userId === userId);
          listener.callback(userExpenses);
        }
      });
    }, 0);
    
    return id;
  },

  async update(id: string, updates: Partial<ExpenseDocument>): Promise<void> {
    const index = mockExpenses.findIndex(item => item.id === id);
    if (index !== -1) {
      const userId = mockExpenses[index].userId;
      mockExpenses[index] = { ...mockExpenses[index], ...updates, updatedAt: new Date() };
      saveToStorage();
      
      // Trigger listeners
      setTimeout(() => {
        expenseListeners.forEach(listener => {
          if (listener.userId === userId) {
            const userExpenses = mockExpenses.filter(item => item.userId === userId);
            listener.callback(userExpenses);
          }
        });
      }, 0);
    }
  },

  async delete(id: string): Promise<void> {
    const itemToDelete = mockExpenses.find(item => item.id === id);
    const userId = itemToDelete?.userId;
    mockExpenses = mockExpenses.filter(item => item.id !== id);
    saveToStorage();
    
    // Trigger listeners
    if (userId) {
      setTimeout(() => {
        expenseListeners.forEach(listener => {
          if (listener.userId === userId) {
            const userExpenses = mockExpenses.filter(item => item.userId === userId);
            listener.callback(userExpenses);
          }
        });
      }, 0);
    }
  },

  async togglePaid(id: string, paid: boolean): Promise<void> {
    const index = mockExpenses.findIndex(item => item.id === id);
    if (index !== -1) {
      const userId = mockExpenses[index].userId;
      mockExpenses[index].paid = paid;
      mockExpenses[index].updatedAt = new Date();
      saveToStorage();
      
      // Trigger listeners
      setTimeout(() => {
        expenseListeners.forEach(listener => {
          if (listener.userId === userId) {
            const userExpenses = mockExpenses.filter(item => item.userId === userId);
            listener.callback(userExpenses);
          }
        });
      }, 0);
    }
  },

  async getAll(userId: string): Promise<ExpenseDocument[]> {
    return mockExpenses.filter(item => item.userId === userId);
  },

  onSnapshot(userId: string, callback: (expenses: ExpenseDocument[]) => void) {
    const data = mockExpenses.filter(item => item.userId === userId);
    callback(data);
    
    // Store listener for future updates
    const listener = { userId, callback };
    expenseListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = expenseListeners.indexOf(listener);
      if (index > -1) {
        expenseListeners.splice(index, 1);
      }
    };
  }
};

// Mock investor service
export const mockInvestorService = {
  async add(userId: string, investor: Omit<InvestorDocument, keyof BaseDocument>): Promise<string> {
    const id = generateUniqueId();
    const newInvestor: InvestorDocument = {
      ...investor,
      id,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockInvestors.push(newInvestor);
    saveToStorage();
    
    // Trigger listeners
    setTimeout(() => {
      investorListeners.forEach(listener => {
        if (listener.userId === userId) {
          const userInvestors = mockInvestors.filter(item => item.userId === userId);
          listener.callback(userInvestors);
        }
      });
    }, 0);
    
    return id;
  },

  async update(id: string, updates: Partial<InvestorDocument>): Promise<void> {
    const index = mockInvestors.findIndex(item => item.id === id);
    if (index !== -1) {
      const userId = mockInvestors[index].userId;
      mockInvestors[index] = { ...mockInvestors[index], ...updates, updatedAt: new Date() };
      saveToStorage();
      
      // Trigger listeners
      setTimeout(() => {
        investorListeners.forEach(listener => {
          if (listener.userId === userId) {
            const userInvestors = mockInvestors.filter(item => item.userId === userId);
            listener.callback(userInvestors);
          }
        });
      }, 0);
    }
  },

  async delete(id: string): Promise<void> {
    const itemToDelete = mockInvestors.find(item => item.id === id);
    const userId = itemToDelete?.userId;
    mockInvestors = mockInvestors.filter(item => item.id !== id);
    saveToStorage();
    
    // Trigger listeners
    if (userId) {
      setTimeout(() => {
        investorListeners.forEach(listener => {
          if (listener.userId === userId) {
            const userInvestors = mockInvestors.filter(item => item.userId === userId);
            listener.callback(userInvestors);
          }
        });
      }, 0);
    }
  },

  async getAll(userId: string): Promise<InvestorDocument[]> {
    return mockInvestors.filter(item => item.userId === userId);
  },

  onSnapshot(userId: string, callback: (investors: InvestorDocument[]) => void) {
    const data = mockInvestors.filter(item => item.userId === userId);
    callback(data);
    
    // Store listener for future updates
    const listener = { userId, callback };
    investorListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = investorListeners.indexOf(listener);
      if (index > -1) {
        investorListeners.splice(index, 1);
      }
    };
  },

  async initializeDefault(userId: string): Promise<void> {
    // Check if default investors already exist
    const existingInvestors = mockInvestors.filter(item => item.userId === userId);
    if (existingInvestors.length > 0) return;

    const defaultInvestors = [
      { name: 'Abdulrahman Mahamood', expensePercentage: 42, incomePercentage: 34 },
      { name: 'Mohammed Alshalabi', expensePercentage: 42, incomePercentage: 33 },
      { name: 'Mohammad Hani', expensePercentage: 16, incomePercentage: 33 }
    ];

    for (const investor of defaultInvestors) {
      await this.add(userId, investor);
    }
  }
};

// Mock utilities
export const mockFirestoreUtils = {
  timestampToDate(timestamp: any): string {
    if (timestamp instanceof Date) {
      return timestamp.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  },

  dateToTimestamp(dateString: string): Date {
    return new Date(dateString);
  },

  async getRecentTransactions(userId: string, limitCount: number = 10) {
    const income = mockIncome
      .filter(item => item.userId === userId)
      .map(item => ({ ...item, type: 'income' as const }));
    
    const expenses = mockExpenses
      .filter(item => item.userId === userId)
      .map(item => ({ ...item, type: 'expense' as const }));

    const allTransactions = [...income, ...expenses].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return allTransactions.slice(0, limitCount);
  }
};