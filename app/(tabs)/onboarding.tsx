import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/coffee/BrandLogo';
import { FeatureCard } from '@/components/coffee/FeatureCard';
import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

const featureItems = [
  {
    title: 'Find Nearby Shops',
    description: 'Browse coffee shops near you and check their menus in seconds.',
    icon: <Feather name="map-pin" size={22} color={coffeeColors.brandPrimary} />,
  },
  {
    title: 'Customize Your Order',
    description: 'Make your drink exactly how you like it with saved preferences.',
    icon: <MaterialCommunityIcons name="cup" size={22} color={coffeeColors.brandPrimary} />,
  },
  {
    title: 'Skip The Line',
    description: 'Pick up your order without the wait and save precious time.',
    icon: <Feather name="zap" size={22} color={coffeeColors.brandPrimary} />,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BrandLogo />
        <View style={styles.headerText}>
          <Text style={styles.title}>Welcome to CoffeeGo</Text>
          <Text style={styles.subtitle}>
            Order your favorite coffee in advance and skip the line. Pick up your drink when it&apos;s ready.
          </Text>
        </View>
      </View>

      <View style={styles.features}>
        {featureItems.map((item) => (
          <FeatureCard
            key={item.title}
            title={item.title}
            description={item.description}
            leading={item.icon}
          />
        ))}
      </View>

      <PrimaryButton title="Get Started" onPress={() => router.push('/home')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: coffeeSpacing.lg,
    marginBottom: coffeeSpacing.xl,
  },
  headerText: {
    alignItems: 'center',
    gap: coffeeSpacing.sm,
  },
  title: {
    color: coffeeColors.brandPrimary,
    textAlign: 'center',
    ...coffeeTypography.heading,
  },
  subtitle: {
    textAlign: 'center',
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  features: {
    gap: coffeeSpacing.md,
    marginBottom: coffeeSpacing.xl,
  },
});

