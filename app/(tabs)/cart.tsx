import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * Cart screen
 * Displays items added to cart and allows placing an order
 */
export default function CartScreen() {
  // Mock cart data (in a real app, this would be retrieved from state)
  const cartItems: Array<{ id: string; title: string; price: number; quantity: number }> = [];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Order placement logic will be here
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
              <Text style={styles.itemPrice}>
                {item.price} UAH × {item.quantity}
              </Text>
            </View>
            <Text style={styles.itemTotal}>{item.price * item.quantity} UAH</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>{totalPrice} UAH</Text>
        </View>
        <PrimaryButton title="Place Order" onPress={handleCheckout} />
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
  itemTotal: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
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

