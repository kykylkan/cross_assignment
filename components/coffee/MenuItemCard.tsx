import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

type MenuItemCardProps = {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  badgeLabel?: string;
  onPress?: () => void;
};

export function MenuItemCard({ title, description, price, imageUrl, badgeLabel, onPress }: MenuItemCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button">
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              imageUrl ??
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
          }}
          style={styles.image}
        />
        {badgeLabel && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeLabel}</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <Text style={styles.price}>{price.toFixed(2)} UAH</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.md,
    ...coffeeShadow.soft,
  },
  pressed: {
    opacity: 0.9,
  },
  imageWrapper: {
    width: 112,
    height: 112,
    borderRadius: coffeeRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: coffeeSpacing.sm,
    right: coffeeSpacing.sm,
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
    backgroundColor: '#FF6B3D',
  },
  badgeText: {
    color: coffeeColors.surface,
    ...coffeeTypography.caption,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: coffeeSpacing.xs,
  },
  textGroup: {
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
  price: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
});


