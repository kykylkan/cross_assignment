import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/coffee/BrandLogo';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import {
  coffeeColors,
  coffeeRadius,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BrandLogo size={96} />
        <View style={styles.headerText}>
          <Text style={styles.title}>CoffeeGo</Text>
          <Text style={styles.subtitle}>Order coffee in advance, skip the line</Text>
        </View>
      </View>

      <Text>Home</Text>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: coffeeSpacing.md,
    marginBottom: coffeeSpacing.xl,
  },
  headerText: {
    alignItems: 'center',
    gap: coffeeSpacing.xs,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  subtitle: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  form: {
    gap: coffeeSpacing.md,
    marginBottom: coffeeSpacing.md,
  },
  linkWrapper: {
    marginBottom: coffeeSpacing.xl,
  },
  link: {
    textAlign: 'center',
    color: coffeeColors.brandSecondary,
    fontWeight: '600',
  },
  socialSection: {
    gap: coffeeSpacing.lg,
    marginBottom: coffeeSpacing.xl,
  },
  socialRow: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
  },
  skipWrapper: {
    borderRadius: coffeeRadius.sm,
    paddingVertical: coffeeSpacing.sm,
  },
  skip: {
    textAlign: 'center',
    color: coffeeColors.textSecondary,
    fontWeight: '500',
  },
});

