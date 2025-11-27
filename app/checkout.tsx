import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';
import { useAppSelector } from '@/store/hooks';

const paymentMethods = [
  {
    id: 'apple',
    title: 'Apple Pay',
    subtitle: 'Оплата через Apple Pay',
    icon: '🍎',
    accent: '#E6EDFF',
  },
  {
    id: 'google',
    title: 'Google Pay',
    subtitle: 'Оплата через Google Pay',
    icon: 'G',
    accent: '#FFF2E0',
  },
  {
    id: 'card',
    title: 'Credit/Debit Card',
    subtitle: 'Картка, що закінчується на 4242',
    icon: '💳',
    accent: '#ECE4FF',
  },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.replace('/checkout-success');
    }, 1500);
  };

  return (
    <ScreenContainer withPadding={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Feather name='chevron-left' size={20} color={coffeeColors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Оплата</Text>
        </View>

        <LinearGradient colors={['#0A6BFF', '#58A6FF']} style={styles.totalCard}>
          <Text style={styles.totalLabel}>До сплати</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </LinearGradient>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Виберіть спосіб оплати</Text>
          <View style={styles.vStack}>
            {paymentMethods.map((method) => {
              const isSelected = method.id === selectedMethod;
              return (
                <Pressable
                  key={method.id}
                  style={[
                    styles.paymentOption,
                    isSelected ? styles.paymentOptionActive : styles.paymentOptionIdle,
                  ]}
                  onPress={() => setSelectedMethod(method.id)}>
                  <View style={[styles.paymentIcon, { backgroundColor: method.accent }]}>
                    <Text style={styles.paymentIconLabel}>{method.icon}</Text>
                  </View>
                  <View style={styles.paymentText}>
                    <Text style={styles.paymentTitle}>{method.title}</Text>
                    <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
                  </View>
                  {isSelected ? (
                    <Feather name='check-circle' size={20} color={coffeeColors.brandPrimary} />
                  ) : (
                    <Feather name='circle' size={20} color={coffeeColors.surfaceBorder} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.securityRow}>
            <View style={styles.securityIcon}>
              <Feather name='shield' size={20} color='#0A6BFF' />
            </View>
            <View style={styles.securityText}>
              <Text style={styles.securityTitle}>Захищена оплата</Text>
              <Text style={styles.securitySubtitle}>
                Дані карти зашифровані та ніколи не зберігаються на сервері.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Деталі замовлення</Text>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Feather name='clock' size={18} color='#0FA958' />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Час готовності</Text>
              <Text style={styles.detailValue}>5-10 хвилин</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, styles.detailIconPurple]}>
              <Feather name='map-pin' size={18} color='#7A42FF' />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Локація</Text>
              <Text style={styles.detailValue}>The Daily Grind, 123 Main Street</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Сума</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Податок</Text>
            <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Разом</Text>
            <Text style={styles.summaryTotalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>

        <Pressable
          style={[styles.confirmButton, isProcessing && styles.confirmButtonDisabled]}
          onPress={handleConfirmOrder}
          disabled={isProcessing}>
          {isProcessing ? (
            <ActivityIndicator color='#FFFFFF' />
          ) : (
            <Text style={styles.confirmButtonText}>
              Підтвердити оплату • {formatCurrency(total)}
            </Text>
          )}
        </Pressable>

        <Text style={styles.footerText}>Натискаючи кнопку, ви підтверджуєте замовлення</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  totalCard: {
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    ...coffeeShadow.card,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginTop: coffeeSpacing.xs,
  },
  sectionCard: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.md,
    ...coffeeShadow.card,
  },
  sectionTitle: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  vStack: {
    gap: coffeeSpacing.sm,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    borderRadius: coffeeRadius.md,
    borderWidth: 1,
    gap: coffeeSpacing.md,
  },
  paymentOptionIdle: {
    borderColor: coffeeColors.surfaceBorder,
  },
  paymentOptionActive: {
    borderColor: coffeeColors.brandPrimary,
    backgroundColor: '#EFF3FF',
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconLabel: {
    fontSize: 20,
  },
  paymentText: {
    flex: 1,
  },
  paymentTitle: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  paymentSubtitle: {
    color: coffeeColors.textSecondary,
    fontSize: 12,
  },
  securityRow: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
    alignItems: 'center',
  },
  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.sm,
    backgroundColor: '#E6EDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    color: '#0A6BFF',
    fontWeight: '600',
  },
  securitySubtitle: {
    color: coffeeColors.textSecondary,
    fontSize: 13,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.sm,
    backgroundColor: '#E4F9EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailIconPurple: {
    backgroundColor: '#F0E9FF',
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    color: coffeeColors.textSecondary,
    fontSize: 13,
  },
  detailValue: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: coffeeColors.textSecondary,
  },
  summaryValue: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: coffeeColors.surfaceBorder,
  },
  summaryTotalLabel: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  summaryTotalValue: {
    color: coffeeColors.brandPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  confirmButton: {
    height: 56,
    borderRadius: coffeeRadius.lg,
    backgroundColor: coffeeColors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    ...coffeeShadow.soft,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footerText: {
    color: coffeeColors.textSecondary,
    textAlign: 'center',
    fontSize: 12,
  },
});

