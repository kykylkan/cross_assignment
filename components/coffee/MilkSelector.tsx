import { Pressable, StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type MilkOption = {
  id: string;
  label: string;
  priceModifier?: number;
};

type MilkSelectorProps = {
  options: MilkOption[];
  selectedMilkId?: string;
  onSelect: (milkId: string) => void;
};

export function MilkSelector({ options, selectedMilkId, onSelect }: MilkSelectorProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selectedMilkId === option.id;
        const hasPriceModifier = typeof option.priceModifier === 'number' && option.priceModifier > 0;
        return (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={[styles.milkButton, isSelected && styles.milkButtonSelected]}>
            <Text style={[styles.milkLabel, isSelected && styles.milkLabelSelected]}>{option.label}</Text>
            {hasPriceModifier && option.priceModifier && (
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>+${option.priceModifier.toFixed(2)}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: coffeeSpacing.md,
  },
  milkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: coffeeSpacing.md,
    paddingHorizontal: coffeeSpacing.md,
    borderRadius: coffeeRadius.md,
    borderWidth: 1.4,
    borderColor: '#D4D7E1',
    backgroundColor: coffeeColors.backgroundBase,
    minHeight: 49,
  },
  milkButtonSelected: {
    backgroundColor: '#EAF5FF',
    borderColor: coffeeColors.brandPrimary,
  },
  milkLabel: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.paragraph,
    fontSize: 14,
    fontWeight: '500',
  },
  milkLabelSelected: {
    color: coffeeColors.textPrimary,
  },
  priceBadge: {
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
    backgroundColor: 'rgba(10, 107, 255, 0.2)',
  },
  priceText: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.caption,
    fontSize: 14,
    fontWeight: '500',
  },
});

