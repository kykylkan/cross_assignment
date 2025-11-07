import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Auth',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
        <Tabs.Screen
            name="onboarding"
            options={{
                title: 'Onboarding',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
        />
        <Tabs.Screen
            name="home"
            options={{
                href: null,
                headerShown: false,
                tabBarStyle: { display: 'none' },
            }}
        />
    </Tabs>
  );
}
