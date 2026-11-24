import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjlaMl9gkat9W02SdJMmvH66HIHHLjqeA",
  authDomain: "chronos-store-b8ae7.firebaseapp.com",
  projectId: "chronos-store-b8ae7",
  storageBucket: "chronos-store-b8ae7.firebasestorage.app",
  messagingSenderId: "373297933631",
  appId: "1:373297933631:web:a1ad72a6072369f164f78a",
  measurementId: "G-1B01E6FDV4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
