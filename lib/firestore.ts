import { isFirebaseEnabled } from './firebase';

// Import types
export interface BaseDocument {
  id: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
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

// Initialize services
let incomeService: any = null;
let expenseService: any = null;
let investorService: any = null;
let firestoreUtils: any = null;

// Flag to track if services are initialized
let servicesInitialized = false;
let initializationPromise: Promise<void> | null = null;

// Initialize services function
const initializeServices = async (): Promise<void> => {
  if (servicesInitialized) return;
  if (initializationPromise) return initializationPromise;

  initializationPromise = (async () => {
    try {
      if (isFirebaseEnabled) {
        // Try to import and use Firebase services
        await initializeFirebaseServices();
      } else {
        // Use mock services if Firebase is not enabled
        await initializeMockServices();
      }
    } catch (error) {
      console.warn('Error initializing Firebase services, falling back to mock services:', error);
      await initializeMockServices();
    }
  })();

  return initializationPromise;
};

// Initialize Firebase services
const initializeFirebaseServices = async () => {
  try {
    // Dynamic import to avoid issues if Firebase modules are not available
    const firestoreModule = await import('firebase/firestore');
    const {
      collection,
      doc,
      addDoc,
      updateDoc,
      deleteDoc,
      getDocs,
      getDoc,
      query,
      where,
      orderBy,
      limit,
      onSnapshot,
      serverTimestamp,
      Timestamp,
      writeBatch
    } = firestoreModule;
    
    const { db } = await import('./firebase');

    // Collection names
    const USERS_COLLECTION = 'users';
    const INCOME_COLLECTION = 'income';
    const EXPENSES_COLLECTION = 'expenses';
    const INVESTORS_COLLECTION = 'investors';

    // Income operations
    incomeService = {
      async add(userId: string, income: Omit<IncomeDocument, keyof BaseDocument>): Promise<string> {
        try {
          const docRef = await addDoc(collection(db, INCOME_COLLECTION), {
            ...income,
            userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          return docRef.id;
        } catch (error) {
          console.error('Error adding income:', error);
          throw new Error('Failed to add income');
        }
      },

      async update(id: string, updates: Partial<IncomeDocument>): Promise<void> {
        try {
          await updateDoc(doc(db, INCOME_COLLECTION, id), {
            ...updates,
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          console.error('Error updating income:', error);
          throw new Error('Failed to update income');
        }
      },

      async delete(id: string): Promise<void> {
        try {
          await deleteDoc(doc(db, INCOME_COLLECTION, id));
        } catch (error) {
          console.error('Error deleting income:', error);
          throw new Error('Failed to delete income');
        }
      },

      async getAll(userId: string): Promise<IncomeDocument[]> {
        try {
          const q = query(
            collection(db, INCOME_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
          );
          const snapshot = await getDocs(q);
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IncomeDocument));
        } catch (error) {
          console.error('Error getting income:', error);
          throw new Error('Failed to get income');
        }
      },

      onSnapshot(userId: string, callback: (income: IncomeDocument[]) => void) {
        const q = query(
          collection(db, INCOME_COLLECTION),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        
        return onSnapshot(q, (snapshot) => {
          const income = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IncomeDocument));
          callback(income);
        });
      }
    };

    // Expense operations
    expenseService = {
      async add(userId: string, expense: Omit<ExpenseDocument, keyof BaseDocument>): Promise<string> {
        try {
          const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), {
            ...expense,
            userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          return docRef.id;
        } catch (error) {
          console.error('Error adding expense:', error);
          throw new Error('Failed to add expense');
        }
      },

      async update(id: string, updates: Partial<ExpenseDocument>): Promise<void> {
        try {
          await updateDoc(doc(db, EXPENSES_COLLECTION, id), {
            ...updates,
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          console.error('Error updating expense:', error);
          throw new Error('Failed to update expense');
        }
      },

      async delete(id: string): Promise<void> {
        try {
          await deleteDoc(doc(db, EXPENSES_COLLECTION, id));
        } catch (error) {
          console.error('Error deleting expense:', error);
          throw new Error('Failed to delete expense');
        }
      },

      async togglePaid(id: string, paid: boolean): Promise<void> {
        try {
          await updateDoc(doc(db, EXPENSES_COLLECTION, id), {
            paid,
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          console.error('Error toggling expense paid status:', error);
          throw new Error('Failed to update expense status');
        }
      },

      async getAll(userId: string): Promise<ExpenseDocument[]> {
        try {
          const q = query(
            collection(db, EXPENSES_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
          );
          const snapshot = await getDocs(q);
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExpenseDocument));
        } catch (error) {
          console.error('Error getting expenses:', error);
          throw new Error('Failed to get expenses');
        }
      },

      onSnapshot(userId: string, callback: (expenses: ExpenseDocument[]) => void) {
        const q = query(
          collection(db, EXPENSES_COLLECTION),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        
        return onSnapshot(q, (snapshot) => {
          const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExpenseDocument));
          callback(expenses);
        });
      }
    };

    // Investor operations
    investorService = {
      async add(userId: string, investor: Omit<InvestorDocument, keyof BaseDocument>): Promise<string> {
        try {
          const docRef = await addDoc(collection(db, INVESTORS_COLLECTION), {
            ...investor,
            userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          return docRef.id;
        } catch (error) {
          console.error('Error adding investor:', error);
          throw new Error('Failed to add investor');
        }
      },

      async update(id: string, updates: Partial<InvestorDocument>): Promise<void> {
        try {
          await updateDoc(doc(db, INVESTORS_COLLECTION, id), {
            ...updates,
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          console.error('Error updating investor:', error);
          throw new Error('Failed to update investor');
        }
      },

      async delete(id: string): Promise<void> {
        try {
          await deleteDoc(doc(db, INVESTORS_COLLECTION, id));
        } catch (error) {
          console.error('Error deleting investor:', error);
          throw new Error('Failed to delete investor');
        }
      },

      async getAll(userId: string): Promise<InvestorDocument[]> {
        try {
          const q = query(
            collection(db, INVESTORS_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'asc')
          );
          const snapshot = await getDocs(q);
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestorDocument));
        } catch (error) {
          console.error('Error getting investors:', error);
          throw new Error('Failed to get investors');
        }
      },

      onSnapshot(userId: string, callback: (investors: InvestorDocument[]) => void) {
        const q = query(
          collection(db, INVESTORS_COLLECTION),
          where('userId', '==', userId),
          orderBy('createdAt', 'asc')
        );
        
        return onSnapshot(q, (snapshot) => {
          const investors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestorDocument));
          callback(investors);
        });
      },

      async initializeDefault(userId: string): Promise<void> {
        try {
          const batch = writeBatch(db);
          
          const defaultInvestors = [
            { name: 'Abdulrahman Mahamood', expensePercentage: 42, incomePercentage: 34 },
            { name: 'Mohammed Alshalabi', expensePercentage: 42, incomePercentage: 33 },
            { name: 'Mohammad Hani', expensePercentage: 16, incomePercentage: 33 }
          ];

          defaultInvestors.forEach(investor => {
            const docRef = doc(collection(db, INVESTORS_COLLECTION));
            batch.set(docRef, {
              ...investor,
              userId,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          });

          await batch.commit();
        } catch (error) {
          console.error('Error initializing default investors:', error);
          throw new Error('Failed to initialize default investors');
        }
      }
    };

    // Utility functions
    firestoreUtils = {
      timestampToDate(timestamp: any): string {
        if (timestamp?.toDate) {
          return timestamp.toDate().toISOString().split('T')[0];
        }
        return new Date().toISOString().split('T')[0];
      },

      dateToTimestamp(dateString: string): any {
        return Timestamp.fromDate(new Date(dateString));
      },

      async getRecentTransactions(userId: string, limitCount: number = 10) {
        try {
          const [incomeSnapshot, expenseSnapshot] = await Promise.all([
            getDocs(query(
              collection(db, INCOME_COLLECTION),
              where('userId', '==', userId),
              orderBy('createdAt', 'desc'),
              limit(limitCount)
            )),
            getDocs(query(
              collection(db, EXPENSES_COLLECTION),
              where('userId', '==', userId),
              orderBy('createdAt', 'desc'),
              limit(limitCount)
            ))
          ]);

          const income = incomeSnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            type: 'income' as const
          }));
          
          const expenses = expenseSnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            type: 'expense' as const
          }));

          const allTransactions = [...income, ...expenses].sort((a: any, b: any) => 
            (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          );

          return allTransactions.slice(0, limitCount);
        } catch (error) {
          console.error('Error getting recent transactions:', error);
          throw new Error('Failed to get recent transactions');
        }
      }
    };

    console.log('Firebase services initialized successfully');
    servicesInitialized = true;

  } catch (error) {
    console.error('Error initializing Firebase services:', error);
    throw error;
  }
};

// Initialize mock services
const initializeMockServices = async () => {
  try {
    const {
      mockIncomeService,
      mockExpenseService,
      mockInvestorService,
      mockFirestoreUtils
    } = await import('./mockFirestore');

    incomeService = mockIncomeService;
    expenseService = mockExpenseService;
    investorService = mockInvestorService;
    firestoreUtils = mockFirestoreUtils;

    console.log('Mock services initialized successfully (demo mode)');
    servicesInitialized = true;
  } catch (error) {
    console.error('Error initializing mock services:', error);
    throw new Error('Failed to initialize services');
  }
};

// Export function to get services (initializes if needed)
export const getServices = async () => {
  if (!servicesInitialized) {
    await initializeServices();
  }
  
  return {
    incomeService,
    expenseService,
    investorService,
    firestoreUtils
  };
};

// Export individual services with lazy initialization
export const getIncomeService = async () => {
  const { incomeService } = await getServices();
  return incomeService;
};

export const getExpenseService = async () => {
  const { expenseService } = await getServices();
  return expenseService;
};

export const getInvestorService = async () => {
  const { investorService } = await getServices();
  return investorService;
};

export const getFirestoreUtils = async () => {
  const { firestoreUtils } = await getServices();
  return firestoreUtils;
};

// Export initialization status
export const areServicesInitialized = () => servicesInitialized;

// Re-export firebase status for convenience
export { isFirebaseEnabled };