import { Pressable, StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type CategoryButtonProps = {
  emoji: string;
  label: string;
  onPress?: () => void;
};

export function CategoryButton({ emoji, label, onPress }: CategoryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button">
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 89,
    height: 104,
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  emojiContainer: {
    width: 30,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 30,
  },
  label: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.paragraph,
    fontWeight: '500',
  },
});

