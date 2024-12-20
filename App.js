import React, { useState, useEffect, StyleSheet } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import { auth } from "./Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./Components/Profile";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "./Components/PressableButton";
import Map from "./Components/Map";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      notification => {
        const { title, body } = notification.request.content;
        console.log('Notification received:');
        console.log('Title:', title);
        console.log('Body:', body);
      }
    );

    return () => subscription.remove();
  }, []);

  if (initializing) return null;

  const AuthStack = (
    <>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "My Goals",
          headerLeft: null,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "My Profile",
        }}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => ({
          title: route.params?.goalData?.text || "Goal Details",
        })}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Location Map",
        }}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        {user ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
