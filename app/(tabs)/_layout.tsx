import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { coffeeColors } from '@/constants/coffeeTheme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Tab navigation for main app sections
 * Includes: Home, Cart, History, Profile
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: coffeeColors.brandPrimary,
        tabBarInactiveTintColor: coffeeColors.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Hide from tab bar
          tabBarStyle: styles.hiddenTabBar,
        }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{
          href: null, // Hide from tab bar
          tabBarStyle: styles.hiddenTabBar,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <IconSymbol
                size={20}
                name="house.fill"
                color={focused ? coffeeColors.brandPrimary : coffeeColors.textSecondary}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <IconSymbol
                size={20}
                name="list.bullet"
                color={focused ? coffeeColors.brandPrimary : coffeeColors.textSecondary}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <IconSymbol
                size={20}
                name="cart.fill"
                color={focused ? coffeeColors.brandPrimary : coffeeColors.textSecondary}
              />
            </View>
          ),
          tabBarBadge: undefined, // Can add item count
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <IconSymbol
                size={20}
                name="clock.fill"
                color={focused ? coffeeColors.brandPrimary : coffeeColors.textSecondary}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <IconSymbol
                size={20}
                name="person.fill"
                color={focused ? coffeeColors.brandPrimary : coffeeColors.textSecondary}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
    height: 88,
    borderRadius: 32,
    backgroundColor: coffeeColors.surface,
    borderTopWidth: 0,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 30,
  },
  tabBarItem: {
    justifyContent: 'center',
  },
  hiddenTabBar: {
    display: 'none',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(10, 107, 255, 0.12)',
  },
});
