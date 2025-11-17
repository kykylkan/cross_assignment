import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * Settings screen
 * Accessible through profile or Drawer navigation
 */
export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Receive notifications about orders',
      type: 'switch' as const,
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      id: 'darkMode',
      title: 'Dark Theme',
      description: 'Enable dark mode',
      type: 'switch' as const,
      value: darkModeEnabled,
      onValueChange: setDarkModeEnabled,
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={coffeeColors.brandPrimary} />
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.settingsList}>
        {settingsItems.map((item) => (
          <View key={item.id} style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
            </View>
            {item.type === 'switch' && (
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: coffeeColors.surfaceBorder, true: coffeeColors.brandPrimary }}
                thumbColor={coffeeColors.backgroundBase}
              />
            )}
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: coffeeSpacing.xl,
    gap: coffeeSpacing.md,
  },
  backButton: {
    padding: coffeeSpacing.xs,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  settingsList: {
    gap: coffeeSpacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.md,
  },
  settingContent: {
    flex: 1,
    gap: coffeeSpacing.xs,
  },
  settingTitle: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  settingDescription: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
  },
});

