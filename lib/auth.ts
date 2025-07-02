import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

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

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login time
    await updateDoc(doc(db, 'users', userCredential.user.uid), {
      lastLoginAt: serverTimestamp()
    });
    
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Create new user account
export const createUserAccount = async (
  email: string, 
  password: string, 
  displayName: string,
  role: UserRole = 'guest'
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      isActive: true,
      preferences: {
        theme: 'system',
        currency: 'USD',
        notifications: true
      }
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // Send email verification
    await sendEmailVerification(user);
    
    return user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error('Failed to sign out');
  }
};

// Send password reset email
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error('Failed to update profile');
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    default:
      return 'An error occurred. Please try again';
  }
};

// Create test user (for development)
export const createTestUser = async () => {
  try {
    const testUser = await createUserAccount(
      'test@blop.design',
      'test123',
      'Admin User',
      'admin'
    );
    
    console.log('Test user created successfully');
    return testUser;
  } catch (error) {
    console.log('Test user might already exist');
  }
};