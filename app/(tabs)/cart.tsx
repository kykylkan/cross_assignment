import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';
import { removeItem, updateQuantity } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

/**
 * Cart screen
 * Displays items added to cart and allows placing an order
 */
export default function CartScreen() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const handleCheckout = () => {
    // Order placement logic will be here (integration with backend / payment gateway)
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const targetItem = cartItems.find((item) => item.id === id);
    if (!targetItem) {
      return;
    }
    dispatch(updateQuantity({ id, quantity: targetItem.quantity + delta }));
  };

  if (cartItems.length === 0) {
    return (
      <ScreenContainer centerContent>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="cart-outline" size={80} color={coffeeColors.textSecondary} />
          <Text style={styles.emptyTitle}>Cart is Empty</Text>
          <Text style={styles.emptyText}>Add items from the home screen</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      <View style={styles.itemsList}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.optionsSummary ? <Text style={styles.itemMeta}>{item.optionsSummary}</Text> : null}
              <Text style={styles.itemPrice}>{formatCurrency(item.price)} / cup</Text>
              <View style={styles.quantityRow}>
                <Pressable style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, -1)}>
                  <Feather name="minus" size={16} color={coffeeColors.brandPrimary} />
                </Pressable>
                <Text style={styles.quantityValue}>{item.quantity}</Text>
                <Pressable style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, 1)}>
                  <Feather name="plus" size={16} color={coffeeColors.brandPrimary} />
                </Pressable>
              </View>
            </View>
            <View style={styles.itemActions}>
              <Text style={styles.itemTotal}>{formatCurrency(item.price * item.quantity)}</Text>
              <Pressable style={styles.removeButton} onPress={() => dispatch(removeItem(item.id))}>
                <Feather name="trash-2" size={16} color={coffeeColors.textSecondary} />
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>{formatCurrency(totalPrice)}</Text>
        </View>
        <PrimaryButton title="Place Order" onPress={handleCheckout} disabled={cartItems.length === 0} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: coffeeSpacing.xl,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  itemsList: {
    gap: coffeeSpacing.md,
    marginBottom: coffeeSpacing.xl,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    backgroundColor: coffeeColors.surface,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
    gap: coffeeSpacing.xs,
  },
  itemTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  itemPrice: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
  },
  itemMeta: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
  },
  itemTotal: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.sm,
    marginTop: coffeeSpacing.xs,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: coffeeColors.surfaceMuted,
  },
  quantityValue: {
    ...coffeeTypography.subheading,
    color: coffeeColors.brandPrimary,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'flex-end',
    gap: coffeeSpacing.sm,
  },
  removeButton: {
    padding: coffeeSpacing.xs,
  },
  footer: {
    gap: coffeeSpacing.md,
    paddingTop: coffeeSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: coffeeColors.surfaceBorder,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  totalPrice: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.md,
    padding: coffeeSpacing.xl,
  },
  emptyTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  emptyText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    textAlign: 'center',
  },
});

