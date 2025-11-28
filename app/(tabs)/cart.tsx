import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';
import { CartItem, removeItem, updateQuantity } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const productImages = [
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=60',
];

const paymentOptions = [
  { id: 'apple', title: 'Apple Pay', subtitle: 'Швидка оплата', icon: 'apple-pay' },
  { id: 'google', title: 'Google Pay', subtitle: 'Безпечна оплата', icon: 'google-pay' },
  { id: 'card', title: 'Картка', subtitle: '•••• 4242', icon: 'credit-card' },
];

const deliveryOptions = [
  {
    id: 'pickup',
    title: 'Самовивіз',
    subtitle: 'Готово за 5-10 хв',
    badge: 'Безкоштовно',
    icon: 'shopping-bag',
    fee: 0,
  },
  {
    id: 'delivery',
    title: 'Доставка',
    subtitle: 'За 20-30 хв',
    badge: '$2.99',
    icon: 'truck',
    fee: 2.99,
  },
];

type CartItemWithImage = CartItem & { image: string };

export default function CartScreen() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedPayment, setSelectedPayment] = useState('apple');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const deliveryFee = deliveryOptions.find((option) => option.id === deliveryType)?.fee ?? 0;
  const discount = appliedPromo === 'COFFEE10' ? subtotal * 0.1 : 0;
  const total = Math.max(subtotal + tax + deliveryFee - discount, 0);

  const formatCurrency = useCallback((value: number) => `$${value.toFixed(2)}`, []);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const triggerLayoutAnimation = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const handleQuantityChange = useCallback(
    (id: string, delta: number) => {
      const targetItem = cartItems.find((item) => item.id === id);
      if (!targetItem) return;
      const newQuantity = targetItem.quantity + delta;
      if (newQuantity <= 0) {
        dispatch(removeItem(id));
        return;
      }
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    },
    [cartItems, dispatch],
  );

  const handleIncrement = useCallback(
    (id: string) => {
      handleQuantityChange(id, 1);
    },
    [handleQuantityChange],
  );

  const handleDecrement = useCallback(
    (id: string) => {
      handleQuantityChange(id, -1);
    },
    [handleQuantityChange],
  );

  const handleRemove = useCallback(
    (id: string) => {
      dispatch(removeItem(id));
    },
    [dispatch],
  );

  const handleDeliverySelect = useCallback(
    (id: 'pickup' | 'delivery') => {
      triggerLayoutAnimation();
      setDeliveryType(id);
    },
    [triggerLayoutAnimation],
  );

  const handlePaymentSelect = useCallback(
    (id: string) => {
      triggerLayoutAnimation();
      setSelectedPayment(id);
    },
    [triggerLayoutAnimation],
  );

  const cartItemsWithImages = useMemo<CartItemWithImage[]>(
    () =>
      cartItems.map((item, index) => ({
        ...item,
        image: item.imageUrl ?? productImages[index % productImages.length],
      })),
    [cartItems],
  );

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'COFFEE10') {
      setAppliedPromo('COFFEE10');
    } else {
      setAppliedPromo(null);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <ScreenContainer centerContent>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name='cart-outline' size={80} color={coffeeColors.textSecondary} />
          <Text style={styles.emptyTitle}>Кошик порожній</Text>
          <Text style={styles.emptyText}>Додайте напої з головного екрана, щоб продовжити</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer withPadding={false}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name='chevron-left' size={20} color={coffeeColors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Кошик ({cartItems.length})</Text>
      </View>

      <View style={styles.content}>


        <View style={styles.sectionStack}>
          {cartItemsWithImages.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
              formatCurrency={formatCurrency}
            />
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Спосіб отримання</Text>
          <View style={styles.cardDivider} />
          <View style={styles.vStack}>
            {deliveryOptions.map((option) => {
              const isActive = option.id === deliveryType;
              return (
                <Pressable
                  key={option.id}
                  style={[
                    styles.optionRow,
                    isActive ? styles.optionActive : styles.optionIdle,
                  ]}
                  onPress={() => handleDeliverySelect(option.id as 'pickup' | 'delivery')}>
                  <View style={[styles.optionIcon, isActive && styles.optionIconActive]}>
                    <Feather
                      name={option.icon as any}
                      size={18}
                      color={isActive ? coffeeColors.brandPrimary : coffeeColors.textSecondary}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                  </View>
                  <Text style={[styles.optionBadge, isActive && styles.optionBadgeActive]}>
                    {option.badge}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Promo code</Text>
          <View style={styles.cardDivider} />
          <View style={styles.promoRow}>
            <View style={styles.promoInputWrapper}>
              <Feather name='tag' size={16} color={coffeeColors.textSecondary} />
              <TextInput
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder='Enter the code (спробуйте COFFEE10)'
                placeholderTextColor={coffeeColors.textSecondary}
                style={styles.promoInput}
              />
            </View>
            <Pressable style={styles.promoButton} onPress={handleApplyPromo}>
              <Text style={styles.promoButtonText}>Apply</Text>
            </Pressable>
          </View>
          {appliedPromo === null && promoCode !== '' ? (
            <Text style={styles.promoHint}>Код не знайдено</Text>
          ) : null}
          {appliedPromo === 'COFFEE10' ? (
            <Text style={styles.promoSuccess}>Код застосовано: -10%</Text>
          ) : null}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Спосіб оплати</Text>
          <View style={styles.cardDivider} />
          <View style={styles.vStack}>
            {paymentOptions.map((option) => {
              const isSelected = option.id === selectedPayment;
              return (
                <Pressable
                  key={option.id}
                  style={[styles.paymentRow, isSelected && styles.optionActive]}
                  onPress={() => handlePaymentSelect(option.id)}>
                  <View
                    style={[
                      styles.paymentIcon,
                      option.id === 'apple' && styles.appleIcon,
                      option.id === 'google' && styles.googleIcon,
                      option.id === 'card' && styles.cardIcon,
                    ]}
                  />
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                  </View>
                  {isSelected ? (
                    <Feather name='check-circle' size={18} color={coffeeColors.brandPrimary} />
                  ) : (
                    <Feather name='circle' size={18} color={coffeeColors.surfaceBorder} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Total</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sum</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>{deliveryFee === 0 ? 'free' : formatCurrency(deliveryFee)}</Text>
          </View>
          {discount > 0 ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>- {formatCurrency(discount)}</Text>
            </View>
          ) : null}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Pay</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>

          <LinearGradient colors={['#0A6BFF', '#58A6FF']} style={styles.payButton}>
            <Pressable style={styles.payButtonInner} onPress={handleCheckout}>
              <Text style={styles.payButtonText}>Оплатити замовлення • {formatCurrency(total)}</Text>
            </Pressable>
          </LinearGradient>
          <Text style={styles.summaryHint}>Натискаючи кнопку, ви підтверджуєте замовлення</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

type CartItemRowProps = {
  item: CartItemWithImage;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  formatCurrency: (value: number) => string;
};

const CartItemRow = memo(({ item, onIncrement, onDecrement, onRemove, formatCurrency }: CartItemRowProps) => {
  const increment = useCallback(() => onIncrement(item.id), [item.id, onIncrement]);
  const decrement = useCallback(() => onDecrement(item.id), [item.id, onDecrement]);
  const remove = useCallback(() => onRemove(item.id), [item.id, onRemove]);
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.count(`CartItemRow render – ${item.id}`);
  }

  return (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.optionsSummary ? <Text style={styles.itemMeta}>{item.optionsSummary}</Text> : null}
            <Text style={styles.itemMeta}>100% sweetness · Medium</Text>
          </View>
          <Pressable style={styles.removeBadge} onPress={remove}>
            <Feather name='trash-2' size={14} color='#F03D5C' />
          </Pressable>
        </View>
        <View style={styles.itemFooter}>
          <View style={styles.quantityControl}>
            <Pressable style={styles.quantityButton} onPress={decrement}>
              <Feather name='minus' size={16} color={coffeeColors.brandPrimary} />
            </Pressable>
            <Text style={styles.quantityValue}>{item.quantity}</Text>
            <Pressable style={styles.quantityButton} onPress={increment}>
              <Feather name='plus' size={16} color={coffeeColors.brandPrimary} />
            </Pressable>
          </View>
          <Text style={styles.itemTotal}>{formatCurrency(item.price * item.quantity)}</Text>
        </View>
      </View>
    </View>
  );
});

CartItemRow.displayName = 'CartItemRow';

const styles = StyleSheet.create({
  content: {
    width: '100%',
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
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  sectionStack: {
    gap: coffeeSpacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.md,
    gap: coffeeSpacing.md,
    ...coffeeShadow.card,
  },
  itemImage: {
    width: 96,
    height: 96,
    borderRadius: coffeeRadius.sm,
  },
  itemContent: {
    flex: 1,
    gap: coffeeSpacing.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  itemMeta: {
    color: coffeeColors.textSecondary,
    fontSize: 14,
  },
  removeBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE1E7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    gap: coffeeSpacing.sm,
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    color: coffeeColors.brandPrimary,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  itemTotal: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '700',
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
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: coffeeColors.surfaceBorder,
  },
  vStack: {
    gap: coffeeSpacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    borderRadius: coffeeRadius.md,
    borderWidth: 1,
    gap: coffeeSpacing.md,
  },
  optionIdle: {
    borderColor: coffeeColors.surfaceBorder,
  },
  optionActive: {
    borderColor: coffeeColors.brandPrimary,
    backgroundColor: '#F0F5FF',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.sm,
    backgroundColor: coffeeColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconActive: {
    backgroundColor: '#E2EDFF',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  optionSubtitle: {
    color: coffeeColors.textSecondary,
    fontSize: 12,
  },
  optionBadge: {
    color: coffeeColors.textSecondary,
  },
  optionBadgeActive: {
    color: coffeeColors.brandPrimary,
    fontWeight: '600',
  },
  promoRow: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
  },
  promoInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.sm,
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    borderRadius: coffeeRadius.md,
    paddingHorizontal: coffeeSpacing.md,
    height: 48,
  },
  promoInput: {
    flex: 1,
    color: coffeeColors.textPrimary,
  },
  promoButton: {
    height: 48,
    borderRadius: coffeeRadius.md,
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: coffeeSpacing.lg,
  },
  promoButtonText: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  promoHint: {
    color: '#F03D5C',
    fontSize: 12,
  },
  promoSuccess: {
    color: '#1D7A3E',
    fontSize: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
    padding: coffeeSpacing.md,
    borderRadius: coffeeRadius.md,
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.sm,
  },
  appleIcon: {
    backgroundColor: '#000',
  },
  googleIcon: {
    backgroundColor: '#F4F5FA',
  },
  cardIcon: {
    backgroundColor: '#E9F1FF',
  },
  summaryCard: {
    backgroundColor: '#F5F7FF',
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.md,
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
  discountValue: {
    color: '#F03D5C',
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: coffeeColors.surfaceBorder,
  },
  totalLabel: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  totalValue: {
    color: coffeeColors.brandPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  payButton: {
    borderRadius: coffeeRadius.lg,
  },
  payButtonInner: {
    paddingVertical: coffeeSpacing.md,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  summaryHint: {
    color: coffeeColors.textSecondary,
    textAlign: 'center',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    gap: coffeeSpacing.md,
    padding: coffeeSpacing.xl,
  },
  emptyTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  emptyText: {
    color: coffeeColors.textSecondary,
    textAlign: 'center',
  },
});

