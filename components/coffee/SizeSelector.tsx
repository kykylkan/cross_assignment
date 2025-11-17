import { Pressable, StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type SizeOption = {
  id: string;
  label: string;
  volume: string;
  priceModifier?: number;
};

type SizeSelectorProps = {
  sizes: SizeOption[];
  selectedSizeId?: string;
  onSelect: (sizeId: string) => void;
};

export function SizeSelector({ sizes, selectedSizeId, onSelect }: SizeSelectorProps) {
  return (
    <View style={styles.container}>
      {sizes.map((size) => {
        const isSelected = selectedSizeId === size.id;
        const hasPriceModifier = typeof size.priceModifier === 'number' && size.priceModifier > 0;
        return (
          <Pressable
            key={size.id}
            onPress={() => onSelect(size.id)}
            style={[styles.sizeButton, isSelected && styles.sizeButtonSelected]}>
            <Text style={[styles.sizeLabel, isSelected && styles.sizeLabelSelected]}>{size.label}</Text>
            <Text style={[styles.sizeVolume, isSelected && styles.sizeVolumeSelected]}>{size.volume}</Text>
            {hasPriceModifier && size.priceModifier && (
              <Text style={[styles.priceModifier, isSelected && styles.priceModifierSelected]}>
                +${size.priceModifier.toFixed(2)}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: coffeeSpacing.md,
    paddingHorizontal: coffeeSpacing.sm,
    borderRadius: coffeeRadius.md,
    borderWidth: 1.4,
    borderColor: '#D4D7E1',
    backgroundColor: coffeeColors.backgroundBase,
    alignItems: 'center',
    gap: 12,
    minHeight: 100,
    justifyContent: 'center',
  },
  sizeButtonSelected: {
    backgroundColor: '#EAF5FF',
    borderColor: coffeeColors.brandPrimary,
  },
  sizeLabel: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.paragraph,
    fontSize: 14,
    fontWeight: '600',
  },
  sizeLabelSelected: {
    color: coffeeColors.brandPrimary,
  },
  sizeVolume: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
    fontSize: 14,
  },
  sizeVolumeSelected: {
    color: coffeeColors.textSecondary,
  },
  priceModifier: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.caption,
    fontSize: 14,
    fontWeight: '500',
  },
  priceModifierSelected: {
    color: coffeeColors.brandPrimary,
  },
});

