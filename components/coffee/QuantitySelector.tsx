import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type QuantitySelectorProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
};

export function QuantitySelector({ quantity, onDecrease, onIncrease, min = 1, max = 10 }: QuantitySelectorProps) {
  const canDecrease = quantity > min;
  const canIncrease = quantity < max;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onDecrease}
        disabled={!canDecrease}
        style={[styles.button, !canDecrease && styles.buttonDisabled]}>
        <Feather name="minus" size={16} color={coffeeColors.textPrimary} />
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable
        onPress={onIncrease}
        disabled={!canIncrease}
        style={[styles.button, !canIncrease && styles.buttonDisabled]}>
        <Feather name="plus" size={16} color={coffeeColors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.lg,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.4,
    borderColor: '#D4D7E1',
    backgroundColor: coffeeColors.backgroundBase,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  quantity: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
    fontSize: 24,
    fontWeight: '700',
    minWidth: 64,
    textAlign: 'center',
  },
});

