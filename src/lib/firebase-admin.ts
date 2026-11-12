import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getDatabase } from "firebase-admin/database";
import { getStorage } from "firebase-admin/storage";

const projectId =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  "gdgcloudislamabad";

const databaseURL =
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
  "https://gdgcloudislamabad-default-rtdb.firebaseio.com";

const storageBucket =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  "gdgcloudislamabad.appspot.com";

function initAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      databaseURL,
      storageBucket,
    });
  }

  return initializeApp({
    projectId,
    databaseURL,
    storageBucket,
  });
}

const adminApp = initAdminApp();

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminRtdb = getDatabase(adminApp);
export const adminStorage = getStorage(adminApp);
