import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FCD34D',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#FCD34D',
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#000000',
          borderBottomColor: '#FCD34D',
          borderBottomWidth: 1,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        options={{ title: 'Painel' }}
      >
        {() => <DashboardScreen />}
      </Tab.Screen>
      <Tab.Screen 
        name="Calendar" 
        options={{ title: 'Calendário' }}
      >
        {() => <CalendarScreen />}
      </Tab.Screen>
      <Tab.Screen 
        name="Settings" 
        options={{ title: 'Definições' }}
      >
        {() => <SettingsScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTabNavigator;