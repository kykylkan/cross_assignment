import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeVariant = 'light' | 'dark';

export type ThemePalette = {
  backgroundPrimary: string;
  backgroundSecondary: string;
  card: string;
  cardBorder: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  onHeroText: string;
  onCardText: string;
  accent: string;
  accentMuted: string;
  overlay: string;
  heroGradient: [string, string, string];
};

const themePalettes: Record<ThemeVariant, ThemePalette> = {
  light: {
    backgroundPrimary: '#F8F9FF',
    backgroundSecondary: '#FFFFFF',
    card: '#FFFFFF',
    cardBorder: '#E3E6F0',
    surfaceMuted: '#F4F5FA',
    textPrimary: '#043072',
    textSecondary: '#717387',
    onHeroText: '#F2F4FF',
    onCardText: '#043072',
    accent: '#0A6BFF',
    accentMuted: '#58A6FF',
    overlay: 'rgba(10, 107, 255, 0.08)',
    heroGradient: ['#1533FE', '#006FFC', '#4F39F6'],
  },
  dark: {
    backgroundPrimary: '#0F172A',
    backgroundSecondary: '#111827',
    card: '#1F2937',
    cardBorder: '#374151',
    surfaceMuted: '#1C2540',
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5F5',
    onHeroText: '#F8FAFC',
    onCardText: '#F8FAFC',
    accent: '#58A6FF',
    accentMuted: '#0A6BFF',
    overlay: 'rgba(88, 166, 255, 0.16)',
    heroGradient: ['#111C44', '#15294C', '#1F3A64'],
  },
};

type ThemeModeContextValue = {
  theme: ThemeVariant;
  palette: ThemePalette;
  toggleTheme: () => void;
  setTheme: (variant: ThemeVariant) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeVariant>(systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      palette: themePalettes[theme],
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme],
  );

  return <ThemeModeContext.Provider value={contextValue}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }

  return context;
}


