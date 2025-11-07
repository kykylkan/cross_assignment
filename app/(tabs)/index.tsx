import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthInput } from '@/components/coffee/AuthInput';
import { BrandLogo } from '@/components/coffee/BrandLogo';
import { OutlineButton } from '@/components/coffee/OutlineButton';
import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { SectionDivider } from '@/components/coffee/SectionDivider';
import {
  coffeeColors,
  coffeeRadius,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthenticate = () => {
    router.replace('/onboarding');
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BrandLogo size={96} />
        <View style={styles.headerText}>
          <Text style={styles.title}>CoffeeGo</Text>
          <Text style={styles.subtitle}>Order coffee in advance, skip the line</Text>
        </View>
      </View>

      <View style={styles.form}>
        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />
        <PrimaryButton title="Log In" onPress={handleAuthenticate} />
      </View>

      <Pressable accessibilityRole="button" onPress={() => router.push('/onboarding')} style={styles.linkWrapper}>
        <Text style={styles.link}>Don&apos;t have an account? Sign up</Text>
      </Pressable>

      <View style={styles.socialSection}>
        <SectionDivider label="Or continue with" />
        <View style={styles.socialRow}>
          <OutlineButton
            title="Google"
            leading={<FontAwesome name="google" size={18} color={coffeeColors.textPrimary} />}
            onPress={handleAuthenticate}
          />
          <OutlineButton
            title="Apple"
            leading={<FontAwesome name="apple" size={20} color={coffeeColors.textPrimary} />}
            onPress={handleAuthenticate}
          />
        </View>
      </View>

      <Pressable accessibilityRole="button" onPress={handleAuthenticate} style={styles.skipWrapper}>
        <Text style={styles.skip}>Skip for now</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: coffeeSpacing.md,
    marginBottom: coffeeSpacing.xl,
  },
  headerText: {
    alignItems: 'center',
    gap: coffeeSpacing.xs,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  subtitle: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  form: {
    gap: coffeeSpacing.md,
    marginBottom: coffeeSpacing.md,
  },
  linkWrapper: {
    marginBottom: coffeeSpacing.xl,
  },
  link: {
    textAlign: 'center',
    color: coffeeColors.brandSecondary,
    fontWeight: '600',
  },
  socialSection: {
    gap: coffeeSpacing.lg,
    marginBottom: coffeeSpacing.xl,
  },
  socialRow: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
  },
  skipWrapper: {
    borderRadius: coffeeRadius.sm,
    paddingVertical: coffeeSpacing.sm,
  },
  skip: {
    textAlign: 'center',
    color: coffeeColors.textSecondary,
    fontWeight: '500',
  },
});

