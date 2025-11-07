import { Feather } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeShadow, coffeeSpacing } from '@/constants/coffeeTheme';

type BrandLogoProps = {
  size?: number;
};

export function BrandLogo({ size = 112 }: BrandLogoProps) {
  const containerStyle = useMemo(() => {
    const shadow = Platform.select({ ios: coffeeShadow.card, default: {} });

    return [styles.container, shadow, { width: size, height: size, borderRadius: coffeeRadius.xl }];
  }, [size]);

  const iconSize = size * 0.45;

  return (
    <View style={containerStyle}>
      <View style={styles.innerAccent} />
      <Feather name="coffee" size={iconSize} color={coffeeColors.backgroundBase} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: coffeeColors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerAccent: {
    borderRadius: coffeeRadius.lg,
    backgroundColor: coffeeColors.brandSecondary,
    opacity: 0.4,
    top: coffeeSpacing.sm,
    left: coffeeSpacing.sm,
  },
});

