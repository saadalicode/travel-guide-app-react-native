import React, { useState, useEffect, createContext, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/app/home/home";
import AttractionDetails from "./src/screens/app/AttractionDetails";
import Gallery from "./src/screens/app/Gallery";
import Map from "./src/screens/app/Map";
import OnBoard from "./src/screens/auth/OnBoard";
import Signin from "./src/screens/auth/Signin";
import Signup from "./src/screens/auth/Signup";
import { auth } from "./src/screens/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();

// Create a context for authentication
const AuthContext = createContext();

// Authentication provider to manage the user's state
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once the user is checked
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access authentication context
function useAuth() {
  return useContext(AuthContext);
}

function AppNavigator() {
  const { user, loading } = useAuth();

  // Show a loading screen while checking auth status
  if (loading) {
    return null; // Optionally, render a loading spinner or splash screen
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Protected routes for authenticated users
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AttractionDetails" component={AttractionDetails} />
          <Stack.Screen name="Gallery" component={Gallery} />
          <Stack.Screen name="Map" component={Map} />
        </>
      ) : (
        // Public routes for unauthenticated users
        <>
          <Stack.Screen name="OnBoard" component={OnBoard} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
