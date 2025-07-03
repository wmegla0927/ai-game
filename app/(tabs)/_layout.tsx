import React from 'react';
import { Tabs } from 'expo-router';
import { Backpack, Home } from 'lucide-react-native';
import colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.darker,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.darker,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: 'monospace',
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ARCANE ODYSSEY",
          tabBarLabel: "Adventure",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "INVENTORY",
          tabBarLabel: "Inventory",
          tabBarIcon: ({ color }) => <Backpack size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}