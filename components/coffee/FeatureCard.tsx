import { ReactNode } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

type FeatureCardProps = {
  title: string;
  description: string;
  leading: ReactNode;
};

export function FeatureCard({ title, description, leading }: FeatureCardProps) {
  return (
    <View style={[styles.card, Platform.OS === 'ios' ? coffeeShadow.soft : undefined]}>
      <View style={styles.leading}>{leading}</View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
    borderRadius: coffeeRadius.lg,
    backgroundColor: coffeeColors.surface,
    paddingVertical: coffeeSpacing.lg,
    paddingHorizontal: coffeeSpacing.lg,
    borderWidth: Platform.select({ ios: 0, default: 1 }),
    borderColor: Platform.select({ ios: 'transparent', default: coffeeColors.surfaceBorder }),
  },
  leading: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: coffeeColors.surfaceMuted,
  },
  content: {
    flex: 1,
    gap: coffeeSpacing.xs,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  description: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
});

