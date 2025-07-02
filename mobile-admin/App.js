import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './src/screens/LoginScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';

const Stack = createStackNavigator();

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('admin_token');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
      await SplashScreen.hideAsync();
    }
  };

  const handleLogin = async () => {
    await SecureStore.setItemAsync('admin_token', 'authenticated');
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('admin_token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return null; // Splash screen is showing
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main">
            {() => <MainTabNavigator onLogout={handleLogout} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={handleLogin} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}