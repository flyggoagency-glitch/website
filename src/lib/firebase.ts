import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// We conditionally import getAnalytics since it's only supported in the browser environment
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCV2Sx1PpVf90Uo3qxYw9bp6hpVGK1zCS0",
  authDomain: "flygo-website.firebaseapp.com",
  projectId: "flygo-website",
  storageBucket: "flygo-website.firebasestorage.app",
  messagingSenderId: "5463446768",
  appId: "1:5463446768:web:84962d29d2b5ad97029e35",
  measurementId: "G-Z69SKCLMY8"
};

// Initialize Firebase (Singleton pattern to prevent re-initializing in Next.js dev server)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics safely (only on client side)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
