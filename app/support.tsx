import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * Support screen
 * Provides contact information and ways to get in touch
 */
export default function SupportScreen() {
  const router = useRouter();

  const contactMethods = [
    {
      id: 'email',
      title: 'Email',
      description: 'support@coffeego.com',
      icon: <Feather name="mail" size={24} color={coffeeColors.brandPrimary} />,
    },
    {
      id: 'phone',
      title: 'Phone',
      description: '+380 50 123 4567',
      icon: <Feather name="phone" size={24} color={coffeeColors.brandPrimary} />,
    },
    {
      id: 'chat',
      title: 'Online Chat',
      description: 'Available 24/7',
      icon: <Feather name="message-circle" size={24} color={coffeeColors.brandPrimary} />,
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={coffeeColors.brandPrimary} />
        </Pressable>
        <Text style={styles.title}>Support</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Have questions or need help? Contact us in any convenient way.
        </Text>

        <View style={styles.contactMethods}>
          {contactMethods.map((method) => (
            <View key={method.id} style={styles.contactCard}>
              <View style={styles.contactIcon}>{method.icon}</View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactDescription}>{method.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            <Text style={styles.faqItem}>• How to cancel an order?</Text>
            <Text style={styles.faqItem}>• How to change delivery address?</Text>
            <Text style={styles.faqItem}>• What payment methods are available?</Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: coffeeSpacing.xl,
    gap: coffeeSpacing.md,
  },
  backButton: {
    padding: coffeeSpacing.xs,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  content: {
    gap: coffeeSpacing.xl,
  },
  description: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    lineHeight: 22,
  },
  contactMethods: {
    gap: coffeeSpacing.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.md,
    gap: coffeeSpacing.md,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.md,
    backgroundColor: coffeeColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContent: {
    flex: 1,
    gap: coffeeSpacing.xs,
  },
  contactTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  contactDescription: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  faqSection: {
    gap: coffeeSpacing.md,
  },
  sectionTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  faqList: {
    gap: coffeeSpacing.sm,
    padding: coffeeSpacing.md,
    backgroundColor: coffeeColors.surfaceMuted,
    borderRadius: coffeeRadius.md,
  },
  faqItem: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
});

