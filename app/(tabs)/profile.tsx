import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OutlineButton } from '@/components/coffee/OutlineButton';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * User profile screen
 * Displays user information and provides access to settings
 */
export default function ProfileScreen() {
  const router = useRouter();

  // Mock user data
  const user = {
    name: 'Alexander',
    email: 'alex@example.com',
  };

  const menuItems = [
    {
      id: 'settings',
      title: 'Settings',
      icon: <Feather name="settings" size={20} color={coffeeColors.brandPrimary} />,
      onPress: () => router.push('/settings'),
    },
    {
      id: 'support',
      title: 'Support',
      icon: <Feather name="help-circle" size={20} color={coffeeColors.brandPrimary} />,
      onPress: () => router.push('/support'),
    },
    {
      id: 'about',
      title: 'About',
      icon: <Feather name="info" size={20} color={coffeeColors.brandPrimary} />,
      onPress: () => router.push('/about'),
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Feather name="user" size={40} color={coffeeColors.brandPrimary} />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={item.onPress}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
            accessibilityRole="button">
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemIcon}>{item.icon}</View>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={coffeeColors.textSecondary} />
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <OutlineButton title="Sign Out" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: coffeeSpacing.xl,
    gap: coffeeSpacing.md,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: coffeeColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: coffeeColors.brandPrimary,
  },
  name: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  email: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  menu: {
    gap: coffeeSpacing.sm,
    marginBottom: coffeeSpacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: coffeeSpacing.md,
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.md,
  },
  menuItemPressed: {
    opacity: 0.7,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: coffeeRadius.sm,
    backgroundColor: coffeeColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTitle: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '500',
  },
  footer: {
    marginTop: 'auto',
  },
});

