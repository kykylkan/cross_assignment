import { ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { coffeeColors, coffeeLayout, coffeeSpacing } from '@/constants/coffeeTheme';
import { useThemeMode } from '@/context/ThemeModeContext';

type ScreenContainerProps = {
  children: ReactNode;
  withPadding?: boolean;
  centerContent?: boolean;
};

export function ScreenContainer({ children, withPadding = true, centerContent = false }: ScreenContainerProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { palette } = useThemeMode();
  const contentWidth = Math.min(width - coffeeSpacing.lg * 2, coffeeLayout.maxContentWidth);
  const topInsetPadding = Math.max(insets.top, coffeeSpacing.xl);

  return (
    <View style={[styles.root, { backgroundColor: palette.backgroundPrimary }]}>
      {/*<View style={styles.backgroundTop} />*/}
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: topInsetPadding },
          withPadding && {
            paddingHorizontal: coffeeSpacing.lg,
            paddingBottom: Platform.select({ ios: coffeeSpacing.xl, default: coffeeSpacing.lg }),
          },
          centerContent && styles.centerContent,
          { width: '100%', alignItems: 'center', flexGrow: 1 },
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.inner,
            { width: contentWidth, backgroundColor: palette.backgroundSecondary, borderRadius: 24 },
            centerContent && styles.innerCentered,
          ]}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: coffeeColors.backgroundBase,
  },
  backgroundTop: {
    ...StyleSheet.absoluteFillObject,
    height: '40%',
    backgroundColor: coffeeColors.backgroundTop,
  },
  content: {
    paddingTop: coffeeSpacing.xl,
  },
  inner: {
    width: '100%',
  },
  centerContent: {
    justifyContent: 'center',
  },
  innerCentered: {
    alignItems: 'center',
  },
});

