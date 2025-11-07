import { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeShadow, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
  leading?: ReactNode;
};

export function PrimaryButton({ title, onPress, leading }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button">
      {leading}
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: coffeeColors.brandPrimary,
    borderRadius: coffeeRadius.md,
    paddingVertical: coffeeSpacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: coffeeSpacing.sm,
    ...(Platform.OS === 'ios' ? coffeeShadow.soft : {}),
  },
  label: {
    color: coffeeColors.backgroundBase,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});

