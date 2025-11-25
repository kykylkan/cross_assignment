import { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeShadow, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
  leading?: ReactNode;
  size?: 'default' | 'small';
  disabled?: boolean;
};

export function PrimaryButton({ title, onPress, leading, size = 'default', disabled = false }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        size === 'small' && styles.buttonSmall,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      accessibilityRole="button">
      {leading}
      <Text style={[styles.label, size === 'small' && styles.labelSmall]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: coffeeColors.brandPrimary,
    borderRadius: coffeeRadius.md,
    paddingVertical: coffeeSpacing.md,
    paddingHorizontal: coffeeSpacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: coffeeSpacing.sm,
    ...(Platform.OS === 'ios' ? coffeeShadow.soft : {}),
  },
  buttonSmall: {
    paddingVertical: coffeeSpacing.sm,
    paddingHorizontal: coffeeSpacing.md,
    borderRadius: 20,
  },
  label: {
    color: coffeeColors.backgroundBase,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  labelSmall: {
    ...coffeeTypography.paragraph,
    fontSize: 14,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});

