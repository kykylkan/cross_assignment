import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

type LastOrderCardProps = {
  orderItem: string;
  onReorder?: () => void;
};

export function LastOrderCard({ orderItem, onReorder }: LastOrderCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['rgba(0, 151, 255, 0.2)', 'rgba(0, 151, 255, 0.1)']}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: -0.25, y: 0.25 }}
            style={styles.gradient}>
            <Feather name="coffee" size={28} color={coffeeColors.brandPrimary} />
          </LinearGradient>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.label}>Last Order</Text>
            <View style={styles.badge}>
              <Feather name="zap" size={12} color={coffeeColors.brandPrimary} />
              <Text style={styles.badgeText}>Quick</Text>
            </View>
          </View>
          <Text style={styles.orderText}>{orderItem}</Text>
        </View>
      </View>
      <PrimaryButton title="Reorder Now" onPress={onReorder || (() => {})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.md,
    gap: coffeeSpacing.md,
    borderWidth: 0.7,
    borderColor: 'rgba(0, 110, 253, 0.05)',
    ...coffeeShadow.soft,
  },
  content: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: coffeeRadius.md,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: coffeeSpacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.sm,
  },
  label: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.paragraph,
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 151, 255, 0.2)',
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
  },
  badgeText: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.caption,
    fontWeight: '500',
  },
  orderText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
});

