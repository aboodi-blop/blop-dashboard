import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { isFirebaseEnabled, isDemoMode } from '../lib/firebase';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'investor' | 'accountant' | 'guest';
  phone?: string;
  companyName?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    currency: 'USD' | 'SAR';
    notifications: boolean;
  };
  createdAt?: string;
  lastLoginAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isDemo: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, role: User['role']) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authService, setAuthService] = useState<any>(null);

  // Initialize default demo data
  const initializeDemoData = async (userId: string) => {
    try {
      const { getServices } = await import('../lib/firestore');
      const { incomeService, expenseService, investorService } = await getServices();
      
      // Initialize default investors
      if (investorService?.initializeDefault) {
        await investorService.initializeDefault(userId);
      }
      
      // Add some sample income data
      const sampleIncome = [
        {
          description: 'Q4 Software Consulting',
          amount: 15000,
          currency: 'USD',
          category: 'Consulting',
          date: '2025-01-15',
          frequency: 'Quarterly',
          investors: [
            { name: 'Abdulrahman Mahamood', percentage: 34 },
            { name: 'Mohammed Alshalabi', percentage: 33 },
            { name: 'Mohammad Hani', percentage: 33 }
          ]
        },
        {
          description: 'SaaS Platform Revenue',
          amount: 8500,
          currency: 'USD',
          category: 'Software',
          date: '2025-01-10',
          frequency: 'Monthly',
          investors: [
            { name: 'Abdulrahman Mahamood', percentage: 34 },
            { name: 'Mohammed Alshalabi', percentage: 33 },
            { name: 'Mohammad Hani', percentage: 33 }
          ]
        },
        {
          description: 'Mobile App Development',
          amount: 12000,
          currency: 'USD',
          category: 'Development',
          date: '2025-01-05',
          frequency: 'One-time',
          investors: [
            { name: 'Abdulrahman Mahamood', percentage: 34 },
            { name: 'Mohammed Alshalabi', percentage: 33 },
            { name: 'Mohammad Hani', percentage: 33 }
          ]
        }
      ];
      
      // Add some sample expense data
      const sampleExpenses = [
        {
          description: 'AWS Infrastructure',
          amount: 450,
          currency: 'USD',
          category: 'Cloud Services',
          frequency: 'Monthly',
          date: '2025-01-20',
          paid: true,
          investors: [
            { name: 'Abdulrahman Mahamood', percentage: 42 },
            { name: 'Mohammed Alshalabi', percentage: 42 },
            { name: 'Mohammad Hani', percentage: 16 }
          ]
        },
        {
          description: 'Office Rent',
          amount: 2500,
          currency: 'USD',
          category: 'Office',
          frequency: 'Monthly',
          date: '2025-01-01',
          paid: true,
          investors: [
            { name: 'Abdulrahman Mahamood', percentage: 42 },
            { name: 'Mohammed Alshalabi', percentage: 42 },
            { name: 'Mohammad Hani', percentage: 16 }
          ]
        },
        {
          description: 'Software Licenses',
          amount: 850,
          currency: 'USD',
          category: 'Software',
          frequency: 'Monthly',
          date: '2025-01-15',
          paid: false,
          investors: [
            { name: 'Abdulrahman Mahamood', percentage: 42 },
            { name: 'Mohammed Alshalabi', percentage: 42 },
            { name: 'Mohammad Hani', percentage: 16 }
          ]
        },
        {
          description: 'Marketing Campaign',
          amount: 3200,
          currency: 'USD',
          category: 'Marketing',
          frequency: 'Quarterly',
          date: '2025-01-10',
          paid: true,
          investors: [
            { name: 'Abdulrahman Mahamood', percentage: 42 },
            { name: 'Mohammed Alshalabi', percentage: 42 },
            { name: 'Mohammad Hani', percentage: 16 }
          ]
        }
      ];
      
      // Check if data already exists
      const existingIncome = await incomeService?.getAll(userId) || [];
      const existingExpenses = await expenseService?.getAll(userId) || [];
      
      // Only add sample data if none exists
      if (existingIncome.length === 0) {
        for (const income of sampleIncome) {
          await incomeService?.add(userId, income);
        }
      }
      
      if (existingExpenses.length === 0) {
        for (const expense of sampleExpenses) {
          await expenseService?.add(userId, expense);
        }
      }
      
      console.log('Demo data initialized successfully');
    } catch (error) {
      console.error('Error initializing demo data:', error);
    }
  };

  // Initialize auth service
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isFirebaseEnabled) {
          // Initialize Firebase auth
          const { auth, onAuthStateChanged } = await import('firebase/auth');
          const { auth: firebaseAuth } = await import('../lib/firebase');
          const { getUserProfile, createUserProfile } = await import('../lib/auth');
          
          setAuthService({
            type: 'firebase',
            auth: firebaseAuth,
            onAuthStateChanged,
            getUserProfile,
            createUserProfile
          });
        } else {
          // Initialize mock auth
          const mockAuth = await import('../lib/mockAuth');
          setAuthService({
            type: 'mock',
            ...mockAuth
          });
        }
      } catch (error) {
        console.error('Error initializing auth service:', error);
        // Fallback to mock auth
        const mockAuth = await import('../lib/mockAuth');
        setAuthService({
          type: 'mock',
          ...mockAuth
        });
      }
    };

    initializeAuth();
  }, []);

  // Set up auth state listener
  useEffect(() => {
    if (!authService) return;

    let unsubscribe: (() => void) | undefined;

    const setupAuthListener = async () => {
      try {
        if (authService.type === 'firebase') {
          // Firebase auth state listener
          unsubscribe = authService.onAuthStateChanged(authService.auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
              try {
                const userProfile = await authService.getUserProfile(firebaseUser.uid);
                if (userProfile) {
                  setUser(userProfile);
                } else {
                  // Create profile if it doesn't exist
                  const newUser: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || '',
                    role: 'guest',
                    preferences: {
                      theme: 'system',
                      currency: 'USD',
                      notifications: true
                    },
                    createdAt: new Date().toISOString(),
                    lastLoginAt: new Date().toISOString()
                  };
                  await authService.createUserProfile(firebaseUser.uid, newUser);
                  setUser(newUser);
                }
              } catch (error) {
                console.error('Error loading user profile:', error);
                setUser(null);
              }
            } else {
              setUser(null);
            }
            setLoading(false);
          });
        } else {
          // Mock auth - check for stored user or create demo user
          const storedUser = localStorage.getItem('demoUser');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } else {
            // Create default demo user
            const demoUser: User = {
              uid: 'demo-user-1',
              email: 'demo@blop.app',
              displayName: 'Demo User',
              role: 'admin',
              companyName: 'Demo Company',
              phone: '+1 (555) 123-4567',
              preferences: {
                theme: 'system',
                currency: 'USD',
                notifications: true
              },
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString()
            };
            localStorage.setItem('demoUser', JSON.stringify(demoUser));
            setUser(demoUser);
            
            // Initialize demo data in the background
            setTimeout(() => {
              initializeDemoData(demoUser.uid);
            }, 1000);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error setting up auth listener:', error);
        setLoading(false);
      }
    };

    setupAuthListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [authService]);

  const login = async (email: string, password: string) => {
    if (!authService) throw new Error('Auth service not initialized');

    try {
      if (authService.type === 'firebase') {
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        await signInWithEmailAndPassword(authService.auth, email, password);
      } else {
        // Mock login
        const result = await authService.mockLogin(email, password);
        setUser(result.user);
        localStorage.setItem('demoUser', JSON.stringify(result.user));
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string, role: User['role']) => {
    if (!authService) throw new Error('Auth service not initialized');

    try {
      if (authService.type === 'firebase') {
        const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
        const userCredential = await createUserWithEmailAndPassword(authService.auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        
        // Create user profile
        const newUser: User = {
          uid: userCredential.user.uid,
          email,
          displayName,
          role,
          preferences: {
            theme: 'system',
            currency: 'USD',
            notifications: true
          },
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };
        await authService.createUserProfile(userCredential.user.uid, newUser);
      } else {
        // Mock register
        const result = await authService.mockRegister(email, password, displayName, role);
        setUser(result.user);
        localStorage.setItem('demoUser', JSON.stringify(result.user));
        
        // Initialize demo data for new user
        setTimeout(() => {
          initializeDemoData(result.user.uid);
        }, 1000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!authService) return;

    try {
      if (authService.type === 'firebase') {
        const { signOut } = await import('firebase/auth');
        await signOut(authService.auth);
      } else {
        // Mock logout
        await authService.mockLogout();
        setUser(null);
        localStorage.removeItem('demoUser');
        // Clear demo data
        localStorage.removeItem('blop-mock-income');
        localStorage.removeItem('blop-mock-expenses');
        localStorage.removeItem('blop-mock-investors');
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (!user || !authService) return;

    try {
      if (authService.type === 'firebase') {
        const userProfile = await authService.getUserProfile(user.uid);
        if (userProfile) {
          setUser(userProfile);
        }
      } else {
        // Mock refresh - get from localStorage
        const storedUser = localStorage.getItem('demoUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user || !authService) return;

    try {
      if (authService.type === 'firebase') {
        const { updateUserProfile } = await import('../lib/auth');
        await updateUserProfile(user.uid, updates);
        setUser(prev => prev ? { ...prev, ...updates } : null);
      } else {
        // Mock update
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('demoUser', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isDemo: isDemoMode,
    login,
    register,
    logout,
    refreshUser,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}