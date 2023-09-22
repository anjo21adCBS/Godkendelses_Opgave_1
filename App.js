import React, { createContext, useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AddEditConsultant from './components/AddEditConsultant'; 
import ConsultantProfile from './components/ConsultantProfile'; 
import ConsultantList from './components/ConsultantList'; 

import Ionicons from "react-native-vector-icons/Ionicons";

// Create a Context for Consultant
export const ConsultantContext = createContext();

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
        {/* Definerer stack skærme */}
        <Stack.Screen name={'Consultant List'} component={ConsultantList} />
        <Stack.Screen name={'Consultant Profile'} component={ConsultantProfile} />
        <Stack.Screen name={'Edit Consultant'} component={AddEditConsultant} />
      </Stack.Navigator>
    );
  };

  // Hovedreturfunktion for App-komponenten
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Definerer faneblade */}
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Definerer stilarter for App-komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});