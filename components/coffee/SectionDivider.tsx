import { StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type SectionDividerProps = {
  label: string;
};

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: coffeeColors.surfaceBorder,
  },
  label: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
  },
});

