import { ReactNode } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type AuthInputProps = {
  label: string;
  icon?: ReactNode;
} & TextInputProps;

export function AuthInput({ label, icon, style, ...props }: AuthInputProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {icon}
      </View>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={coffeeColors.textSecondary}
        selectionColor={coffeeColors.brandSecondary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: coffeeSpacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.caption,
    letterSpacing: 0.3,
  },
  input: {
    borderRadius: coffeeRadius.md,
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    backgroundColor: coffeeColors.surface,
    paddingHorizontal: coffeeSpacing.md,
    paddingVertical: Platform.select({ ios: coffeeSpacing.md, default: coffeeSpacing.sm }),
    color: coffeeColors.textPrimary,
    fontSize: 16,
  },
});

