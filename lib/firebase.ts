import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Check if Firebase environment variables are available
const isFirebaseConfigured = !!(
  import.meta.env?.VITE_FIREBASE_API_KEY
);

// Default Firebase configuration for development/demo
const defaultFirebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id",
  measurementId: "demo-measurement-id"
};

// Production Firebase configuration
const productionFirebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env?.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID
};

// Use production config if available, otherwise use default config
const firebaseConfig = isFirebaseConfigured ? productionFirebaseConfig : defaultFirebaseConfig;

// Initialize Firebase
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Connect to emulators in development (only if not in production)
  if (import.meta.env?.DEV && !isFirebaseConfigured) {
    console.log('Running in demo mode with mock Firebase services');
  }
} catch (error) {
  console.warn('Firebase initialization failed, running in demo mode:', error);
}

// Export Firebase services with null checks
export { auth, db, storage };
export default app;

// Export configuration status for other parts of the app
export const isFirebaseEnabled = !!app && isFirebaseConfigured;
export const isDemoMode = !isFirebaseConfigured;