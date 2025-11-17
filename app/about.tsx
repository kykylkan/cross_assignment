import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native';

import { BrandLogo } from '@/components/coffee/BrandLogo';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * About screen
 * Displays information about the app, version, and developers
 */
export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={coffeeColors.brandPrimary} />
        </Pressable>
        <Text style={styles.title}>About</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <BrandLogo size={120} />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.appName}>CoffeeGo</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.description}>
            CoffeeGo is a modern coffee ordering app. Order your favorite coffee in advance
            and save time by avoiding queues.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features:</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Feather name="check" size={20} color={coffeeColors.success} />
              <Text style={styles.featureText}>Quick Ordering</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check" size={20} color={coffeeColors.success} />
              <Text style={styles.featureText}>Order History</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check" size={20} color={coffeeColors.success} />
              <Text style={styles.featureText}>Personal Profile</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check" size={20} color={coffeeColors.success} />
              <Text style={styles.featureText}>Easy Navigation</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 CoffeeGo. All rights reserved.</Text>
        </View>
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
  content: {
    gap: coffeeSpacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: coffeeSpacing.md,
  },
  infoSection: {
    alignItems: 'center',
    gap: coffeeSpacing.sm,
    marginBottom: coffeeSpacing.lg,
  },
  appName: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
    fontSize: 28,
  },
  version: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
  },
  description: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: coffeeSpacing.md,
  },
  featuresSection: {
    gap: coffeeSpacing.md,
  },
  sectionTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  featuresList: {
    gap: coffeeSpacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  featureText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  footer: {
    marginTop: coffeeSpacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
  },
});

