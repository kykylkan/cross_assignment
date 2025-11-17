import { Pressable, StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type SyrupOption = {
  id: string;
  label: string;
  priceModifier?: number;
};

type SyrupSelectorProps = {
  options: SyrupOption[];
  selectedSyrupId?: string;
  onSelect: (syrupId: string) => void;
};

export function SyrupSelector({ options, selectedSyrupId, onSelect }: SyrupSelectorProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selectedSyrupId === option.id;
        const hasPriceModifier = typeof option.priceModifier === 'number' && option.priceModifier > 0;
        return (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={[styles.syrupButton, isSelected && styles.syrupButtonSelected]}>
            <Text style={[styles.syrupLabel, isSelected && styles.syrupLabelSelected]}>{option.label}</Text>
            {hasPriceModifier && option.priceModifier && (
              <Text style={[styles.priceModifier, isSelected && styles.priceModifierSelected]}>
                +${option.priceModifier.toFixed(2)}
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
    flexWrap: 'wrap',
    gap: coffeeSpacing.md,
  },
  syrupButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: coffeeSpacing.md,
    paddingHorizontal: coffeeSpacing.sm,
    borderRadius: coffeeRadius.md,
    borderWidth: 1.4,
    borderColor: '#D4D7E1',
    backgroundColor: coffeeColors.backgroundBase,
    alignItems: 'center',
    gap: coffeeSpacing.xs,
    minHeight: 75,
    justifyContent: 'center',
  },
  syrupButtonSelected: {
    backgroundColor: '#EAF5FF',
    borderColor: coffeeColors.brandPrimary,
  },
  syrupLabel: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.paragraph,
    fontSize: 14,
    fontWeight: '500',
  },
  syrupLabelSelected: {
    color: coffeeColors.textPrimary,
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

