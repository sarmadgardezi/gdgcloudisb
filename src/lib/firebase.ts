// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import type { Analytics } from "firebase/analytics";

// Build config from env (all public keys)
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  // measurementId is optional; only used on web when Analytics is enabled
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

// Avoid duplicate initialization (works in Next.js SSR/CSR & HMR)
const isAlreadyInitialized = getApps().length > 0;
const app: FirebaseApp = isAlreadyInitialized ? getApp() : initializeApp(firebaseConfig);

// Firestore (avoid re-calling initializeFirestore during Next.js HMR)
const db = isAlreadyInitialized
  ? getFirestore(app)
  : initializeFirestore(app, { experimentalForceLongPolling: true });

// Realtime Database, Auth & Storage
const rtdb = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Optional: Web Analytics (guarded to avoid SSR issues)
let analytics: Analytics | null = null;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  // Lazy import to keep server bundles clean
  import("firebase/analytics").then(({ getAnalytics, isSupported }) => {
    isSupported().then((ok) => {
      if (ok) analytics = getAnalytics(app);
    });
  });
}

export { app, auth, db, rtdb, storage, analytics };
