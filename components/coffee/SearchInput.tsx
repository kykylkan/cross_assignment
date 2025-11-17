import { Feather } from '@expo/vector-icons';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type SearchInputProps = {
  placeholder?: string;
} & Omit<TextInputProps, 'style'>;

export function SearchInput({ placeholder = 'Search...', ...props }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color={coffeeColors.textSecondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={coffeeColors.textSecondary}
        selectionColor={coffeeColors.brandPrimary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: coffeeColors.surfaceMuted,
    borderRadius: coffeeRadius.md,
    paddingHorizontal: coffeeSpacing.md,
    paddingVertical: coffeeSpacing.sm,
    gap: coffeeSpacing.sm,
  },
  icon: {
    marginRight: coffeeSpacing.xs,
  },
  input: {
    flex: 1,
    color: coffeeColors.textPrimary,
    ...coffeeTypography.paragraph,
    padding: 0,
  },
});

