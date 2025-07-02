// Mock authentication service for demo mode

export type UserRole = 'admin' | 'investor' | 'accountant' | 'guest';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: any;
  updatedAt: any;
  lastLoginAt: any;
  isActive: boolean;
  companyName?: string;
  phone?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    currency: 'USD' | 'SAR';
    notifications: boolean;
  };
}

// Mock user data storage
let currentUser: UserProfile | null = null;
let mockUsers: UserProfile[] = [];

// Load from localStorage if available
try {
  const savedUser = localStorage.getItem('blop-mock-current-user');
  const savedUsers = localStorage.getItem('blop-mock-users');
  
  if (savedUser) currentUser = JSON.parse(savedUser);
  if (savedUsers) mockUsers = JSON.parse(savedUsers);
} catch (error) {
  console.warn('Error loading mock auth data from localStorage:', error);
}

// Save to localStorage
const saveAuthToStorage = () => {
  try {
    localStorage.setItem('blop-mock-current-user', JSON.stringify(currentUser));
    localStorage.setItem('blop-mock-users', JSON.stringify(mockUsers));
  } catch (error) {
    console.warn('Error saving mock auth data to localStorage:', error);
  }
};

// Initialize with test user if no users exist
if (mockUsers.length === 0) {
  const testUser: UserProfile = {
    uid: 'test-user-123',
    email: 'test@blop.design',
    displayName: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    isActive: true,
    preferences: {
      theme: 'system',
      currency: 'USD',
      notifications: true
    }
  };
  mockUsers.push(testUser);
  saveAuthToStorage();
}

// Mock authentication functions
export const signInWithEmail = async (email: string, password: string) => {
  // Demo credentials
  if (email === 'test@blop.design' && password === 'test123') {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      currentUser = { ...user, lastLoginAt: new Date() };
      saveAuthToStorage();
      return currentUser;
    }
  }
  
  throw new Error('Invalid email or password');
};

export const createUserAccount = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole = 'guest'
) => {
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error('An account with this email already exists');
  }

  const newUser: UserProfile = {
    uid: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email,
    displayName,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    isActive: true,
    preferences: {
      theme: 'system',
      currency: 'USD',
      notifications: true
    }
  };

  mockUsers.push(newUser);
  currentUser = newUser;
  saveAuthToStorage();
  
  return newUser;
};

export const signOutUser = async () => {
  currentUser = null;
  saveAuthToStorage();
};

export const resetPassword = async (email: string) => {
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    throw new Error('No account found with this email address');
  }
  // In demo mode, we just simulate sending the email
  console.log(`Password reset email sent to ${email} (demo mode)`);
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  return mockUsers.find(u => u.uid === uid) || null;
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  const userIndex = mockUsers.findIndex(u => u.uid === uid);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates, updatedAt: new Date() };
    if (currentUser && currentUser.uid === uid) {
      currentUser = mockUsers[userIndex];
    }
    saveAuthToStorage();
  }
};

// Auth state change listeners
const authStateListeners: ((user: UserProfile | null) => void)[] = [];

export const onAuthStateChange = (callback: (user: UserProfile | null) => void) => {
  authStateListeners.push(callback);
  
  // Immediately call with current user
  callback(currentUser);
  
  // Return unsubscribe function
  return () => {
    const index = authStateListeners.indexOf(callback);
    if (index > -1) {
      authStateListeners.splice(index, 1);
    }
  };
};

// Trigger auth state change for all listeners
const triggerAuthStateChange = () => {
  authStateListeners.forEach(callback => callback(currentUser));
};

// Get current user
export const getCurrentUser = () => currentUser;

// AuthContext compatible functions
export const mockLogin = async (email: string, password: string) => {
  const user = await signInWithEmail(email, password);
  return { user };
};

export const mockRegister = async (email: string, password: string, displayName: string, role: UserRole) => {
  const user = await createUserAccount(email, password, displayName, role);
  return { user };
};

export const mockLogout = async () => {
  await signOutUser();
  // Clear all demo data on logout
  localStorage.removeItem('blop-mock-current-user');
  localStorage.removeItem('blop-mock-users');
  localStorage.removeItem('blop-mock-income');
  localStorage.removeItem('blop-mock-expenses');
  localStorage.removeItem('blop-mock-investors');
  localStorage.removeItem('demoUser');
};

export const mockUpdateProfile = async (uid: string, updates: any) => {
  await updateUserProfile(uid, updates);
};