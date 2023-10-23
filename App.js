import React from 'react';
import { getApps, initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ConsultantProvider } from './components/ConsultantContext';

import AddEditConsultant from './components/AddEditConsultant'; 
import ConsultantProfile from './components/ConsultantProfile'; 
import ConsultantList from './components/ConsultantList'; 

import Ionicons from "react-native-vector-icons/Ionicons";

import CameraScreen from './components/CameraComponents.js/CameraScreen';
import ImageScreen from './components/CameraComponents.js/ImageScreen';


export default function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyDwRHZhSglXdxYzhax41K9yYxBS06qmwiQ",
    authDomain: "g-o-1-6e6c4.firebaseapp.com",
    projectId: "g-o-1-6e6c4",
    storageBucket: "g-o-1-6e6c4.appspot.com",
    messagingSenderId: "415712287764",
    appId: "1:415712287764:web:6eda139736495c7e7d5b01",
    databaseURL: "https://g-o-1-6e6c4-default-rtdb.europe-west1.firebasedatabase.app"
  };
  

 
   // Initialiserer Firebase, hvis det ikke allerede er initialiseret
   if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase aktiveret!");
  }

  // Opretter en stack navigator
  const Stack = createStackNavigator();

  // Opretter en bundfane navigator
  const Tab = createBottomTabNavigator();

  // Stack navigationskomponent
  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={'Consultant List'} component={ConsultantList} />
        <Stack.Screen name={'Consultant Profile'} component={ConsultantProfile} />
        <Stack.Screen name={'Edit Consultant'} component={AddEditConsultant} />
        <Stack.Screen name={'Camera'} component={CameraScreen} />
        <Stack.Screen name={'Image'} component={ImageScreen} />
      </Stack.Navigator>
    );
  };
  

  return (
    <ConsultantProvider>
      <NavigationContainer>
      <Tab.Navigator>
  <Tab.Screen 
    name={'Home'} 
    component={StackNavigation} 
    options={{ tabBarIcon: () => (<Ionicons name="home" size={20} />), headerShown: null }}
  />
  <Tab.Screen 
    name={'Add'} 
    component={AddEditConsultant} 
    options={{ tabBarIcon: () => (<Ionicons name="add" size={20} />) }}
  />
  <Tab.Screen 
    name={'Camera'} 
    component={CameraScreen} 
    options={{ tabBarIcon: () => (<Ionicons name="camera" size={20} />) }}
  />
</Tab.Navigator>

      </NavigationContainer>
    </ConsultantProvider>
  );
}