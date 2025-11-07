import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type OutlineButtonProps = {
  title: string;
  onPress?: () => void;
  leading?: ReactNode;
};

export function OutlineButton({ title, onPress, leading }: OutlineButtonProps) {
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
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    borderRadius: coffeeRadius.md,
    backgroundColor: coffeeColors.surface,
    paddingVertical: coffeeSpacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: coffeeSpacing.sm,
    flex: 1,
  },
  label: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});

