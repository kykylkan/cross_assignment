import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * Mock order data (in a real app, this would be fetched from API)
 */
const mockOrders: Record<
  string,
  { date: string; items: Array<{ title: string; quantity: number; price: number }>; total: number; status: string }
> = {
  '1': {
    date: '2024-01-15',
    items: [
      { title: 'Espresso', quantity: 1, price: 45 },
      { title: 'Cappuccino', quantity: 1, price: 65 },
    ],
    total: 110,
    status: 'completed',
  },
  '2': {
    date: '2024-01-14',
    items: [
      { title: 'Latte', quantity: 1, price: 70 },
      { title: 'Mocha', quantity: 1, price: 85 },
    ],
    total: 155,
    status: 'completed',
  },
};

/**
 * Order details screen
 * Receives id parameter through route.params and displays full order information
 */
export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Validate id parameter
  if (!id) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: order not found</Text>
        </View>
      </ScreenContainer>
    );
  }

  const order = mockOrders[id];

  // Handle case when order is not found
  if (!order) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order with ID {id} not found</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.orderNumber}>#{id}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{order.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {order.status === 'completed' ? 'Completed' : 'Processing'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items:</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price * item.quantity} UAH</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>{order.total} UAH</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: coffeeSpacing.xl,
    gap: coffeeSpacing.xs,
  },
  title: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
  },
  orderNumber: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  content: {
    gap: coffeeSpacing.lg,
  },
  infoCard: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.md,
    padding: coffeeSpacing.md,
    gap: coffeeSpacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  infoValue: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: coffeeColors.surfaceMuted,
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: coffeeRadius.sm,
  },
  statusText: {
    color: coffeeColors.success,
    ...coffeeTypography.caption,
    fontWeight: '600',
  },
  itemsSection: {
    gap: coffeeSpacing.md,
  },
  sectionTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.md,
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
  itemQuantity: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.caption,
  },
  itemPrice: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  totalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: coffeeSpacing.md,
    backgroundColor: coffeeColors.surfaceMuted,
    borderRadius: coffeeRadius.md,
    marginTop: coffeeSpacing.md,
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
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: coffeeSpacing.xl,
  },
  errorText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    textAlign: 'center',
  },
});

