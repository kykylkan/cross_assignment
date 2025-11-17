import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type LocationSearchProps = {
  address: string;
  city: string;
  onPress?: () => void;
};

export function LocationSearch({ address, city, onPress }: LocationSearchProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button">
      <View style={styles.iconContainer}>
        <Feather name="map-pin" size={20} color={coffeeColors.surface} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.city}>{city}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={coffeeColors.surface} style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: coffeeRadius.md,
    padding: coffeeSpacing.md,
    gap: coffeeSpacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 0,
  },
  address: {
    color: coffeeColors.surface,
    ...coffeeTypography.paragraph,
    fontWeight: '500',
  },
  city: {
    color: coffeeColors.surface,
    ...coffeeTypography.paragraph,
    opacity: 0.7,
  },
  chevron: {
    opacity: 0.7,
  },
});

