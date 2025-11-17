import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

type ShopCardProps = {
  name: string;
  distance: string;
  timeRange: string;
  rating: number;
  isOpen: boolean;
  imageUrl?: string;
  onPress?: () => void;
  onMenuPress?: () => void;
};

export function ShopCard({
  name,
  distance,
  timeRange,
  rating,
  isOpen,
  imageUrl,
  onPress,
  onMenuPress,
}: ShopCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button">
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <View style={styles.badgesContainer}>
          <View style={styles.ratingBadge}>
            <Feather name="star" size={12} color="#FFB800" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <View style={[styles.statusBadge, isOpen && styles.statusBadgeOpen]}>
            <Text style={styles.statusText}>{isOpen ? 'Open' : 'Closed'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.details}>
            {distance} • {timeRange}
          </Text>
        </View>
        <PrimaryButton title="Menu" onPress={onMenuPress || (() => {})} size="small" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    overflow: 'hidden',
    ...coffeeShadow.soft,
  },
  pressed: {
    opacity: 0.9,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: coffeeColors.surfaceMuted,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  badgesContainer: {
    position: 'absolute',
    top: 16,
    right: 20,
    flexDirection: 'row',
    gap: coffeeSpacing.sm,
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
    ...coffeeShadow.soft,
  },
  ratingText: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.caption,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
    ...coffeeShadow.soft,
  },
  statusBadgeOpen: {
    backgroundColor: coffeeColors.success,
  },
  statusText: {
    color: coffeeColors.surface,
    ...coffeeTypography.caption,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    gap: coffeeSpacing.md,
  },
  infoContainer: {
    flex: 1,
    gap: coffeeSpacing.xs,
  },
  name: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  details: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
});

