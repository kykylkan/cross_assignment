import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import { coffeeColors, coffeeRadius, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * Mock order data (in a real app, this would be fetched from API)
 */
const mockOrders = [
  {
    id: '1',
    date: '2024-01-15',
    items: ['Espresso', 'Cappuccino'],
    total: 110,
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-01-14',
    items: ['Latte', 'Mocha'],
    total: 155,
    status: 'completed',
  },
];

/**
 * Order history screen
 * Displays a list of user's previous orders
 */
export default function OrdersScreen() {
  const router = useRouter();

  const handleOrderPress = (orderId: string) => {
    // Navigate to order details
    router.push({
      pathname: '/order/[id]' as any,
      params: { id: orderId },
    });
  };

  if (mockOrders.length === 0) {
    return (
      <ScreenContainer centerContent>
        <View style={styles.emptyContainer}>
          <Feather name="package" size={80} color={coffeeColors.textSecondary} />
          <Text style={styles.emptyTitle}>No Orders</Text>
          <Text style={styles.emptyText}>Your order history will appear here</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
      </View>

      <View style={styles.ordersList}>
        {mockOrders.map((order) => (
          <Pressable
            key={order.id}
            onPress={() => handleOrderPress(order.id)}
            style={({ pressed }) => [styles.orderCard, pressed && styles.orderCardPressed]}
            accessibilityRole="button">
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderDate}>Order from {order.date}</Text>
                <Text style={styles.orderItems}>{order.items.join(', ')}</Text>
              </View>
              <Feather name="chevron-right" size={20} color={coffeeColors.textSecondary} />
            </View>
            <View style={styles.orderFooter}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {order.status === 'completed' ? 'Completed' : 'Processing'}
                </Text>
              </View>
              <Text style={styles.orderTotal}>{order.total} UAH</Text>
            </View>
          </Pressable>
        ))}
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
  ordersList: {
    gap: coffeeSpacing.md,
  },
  orderCard: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.md,
    padding: coffeeSpacing.md,
    gap: coffeeSpacing.md,
  },
  orderCardPressed: {
    opacity: 0.7,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderDate: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '600',
    marginBottom: coffeeSpacing.xs,
  },
  orderItems: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: coffeeSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: coffeeColors.surfaceBorder,
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
  orderTotal: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
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

