import { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: ReactNode;
  onPress?: () => void;
};

/**
 * Product card component for displaying in a list
 * Used on the home screen to show available products
 */
export function ProductCard({ id, title, description, price, image, onPress }: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${price} UAH`}>
      {image && <View style={styles.imageContainer}>{image}</View>}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{price} UAH</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: coffeeRadius.lg,
    backgroundColor: coffeeColors.surface,
    padding: coffeeSpacing.md,
    marginBottom: coffeeSpacing.md,
    borderWidth: Platform.select({ ios: 0, default: 1 }),
    borderColor: Platform.select({ ios: 'transparent', default: coffeeColors.surfaceBorder }),
    ...(Platform.OS === 'ios' ? coffeeShadow.soft : {}),
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    height: 160,
    borderRadius: coffeeRadius.md,
    backgroundColor: coffeeColors.surfaceMuted,
    marginBottom: coffeeSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    gap: coffeeSpacing.xs,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
    marginBottom: coffeeSpacing.xs,
  },
  description: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    marginBottom: coffeeSpacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: coffeeSpacing.xs,
  },
  price: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
});

