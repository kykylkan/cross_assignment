import { Pressable, StyleSheet, Text, View } from 'react-native';

import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

type SweetnessLevel = {
  id: string;
  label: string;
  value: number;
};

type SweetnessSelectorProps = {
  levels: SweetnessLevel[];
  selectedLevelId?: string;
  onSelect: (levelId: string) => void;
};

export function SweetnessSelector({ levels, selectedLevelId, onSelect }: SweetnessSelectorProps) {
  return (
    <View style={styles.container}>
      {levels.map((level) => {
        const isSelected = selectedLevelId === level.id;
        return (
          <Pressable
            key={level.id}
            onPress={() => onSelect(level.id)}
            style={[styles.levelButton, isSelected && styles.levelButtonSelected]}>
            <Text style={[styles.levelLabel, isSelected && styles.levelLabelSelected]}>{level.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: coffeeSpacing.sm,
  },
  levelButton: {
    flex: 1,
    paddingVertical: coffeeSpacing.sm,
    paddingHorizontal: coffeeSpacing.sm,
    borderRadius: 20,
    borderWidth: 1.4,
    borderColor: '#D4D7E1',
    backgroundColor: coffeeColors.backgroundBase,
    alignItems: 'center',
  },
  levelButtonSelected: {
    backgroundColor: '#EAF5FF',
    borderColor: coffeeColors.brandPrimary,
  },
  levelLabel: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.paragraph,
    fontSize: 14,
    fontWeight: '500',
  },
  levelLabelSelected: {
    color: coffeeColors.textPrimary,
  },
});

