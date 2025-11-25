import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider as ReduxProvider } from 'react-redux';

import { coffeeColors } from '@/constants/coffeeTheme';
import { ThemeModeProvider } from '@/context/ThemeModeContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Main Stack navigator for the application
 * Defines navigation structure and screen styling
 * 
 * Navigation structure:
 * - (tabs) - Tab navigation for main sections
 * - product/[id] - Product details screen (Stack)
 * - order/[id] - Order details screen (Stack)
 * - settings, support, about - Profile screens (Stack)
 * - modal - Modal screen
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Custom theme for navigation that matches the app design
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: coffeeColors.brandPrimary,
      background: coffeeColors.backgroundBase,
      card: coffeeColors.surface,
      text: coffeeColors.textPrimary,
      border: coffeeColors.surfaceBorder,
      notification: coffeeColors.brandSecondary,
    },
  };

  return (
    <ReduxProvider store={store}>
      <ThemeModeProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : customTheme}>
          <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: coffeeColors.backgroundBase,
          },
          headerTintColor: coffeeColors.brandPrimary,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: coffeeColors.backgroundBase,
          },
        }}>
        {/* Tab navigation - main app sections */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        {/* Stack screens - linear transitions */}
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="order/[id]"
          options={{
            title: 'Order Details',
            presentation: 'card',
          }}
        />

        {/* Profile screens - accessible through Stack navigation */}
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="support"
          options={{
            title: 'Support',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: 'About',
            presentation: 'card',
          }}
        />

        {/* Modal screen */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Modal',
          }}
        />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ThemeModeProvider>
    </ReduxProvider>
  );
}
