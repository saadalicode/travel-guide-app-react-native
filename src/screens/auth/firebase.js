// Firebase configuration (already provided by you)
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Firebase configuration object
const firebaseConfig = {
  apiKey: "", // enter here the api key from firebase after creating your project
  authDomain: "", //enter here the auth domain from firebase after creating your project
  projectId: "travel-app-e2522",
  storageBucket: "travel-app-e2522.appspot.com",
  messagingSenderId: "1010159654925",
  appId: "1:1010159654925:android:8306991de6d44a1a995d44",
  // measurementId: "YOUR_MEASUREMENT_ID", // Uncomment if you use Analytics
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });



export { auth };
