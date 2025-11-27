import { Feather } from '@expo/vector-icons';
import { useRouter, type Href } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

type OrderStatus = 'completed' | 'processing';

type Order = {
  id: string;
  cafeName: string;
  dateTime: string;
  items: string[];
  total: string;
  status: OrderStatus;
  image: string;
  rated: boolean;
  reorderRoute: Href;
};

const orders: Order[] = [
  {
    id: 'order-1',
    cafeName: 'The Daily Grind',
    dateTime: 'Oct 29, 2025 · 2:15 PM',
    items: ['1× Caramel Latte (Medium)'],
    total: '$5.50',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=60',
    rated: false,
    reorderRoute: '/menu',
  },
  {
    id: 'order-2',
    cafeName: 'Brew & Co',
    dateTime: 'Oct 28, 2025 · 9:30 AM',
    items: ['1× Cappuccino (Large)', '1× Croissant'],
    total: '$8.00',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=60',
    rated: true,
    reorderRoute: '/menu',
  },
  {
    id: 'order-3',
    cafeName: 'Coffee District',
    dateTime: 'Oct 27, 2025 · 3:45 PM',
    items: ['2× Iced Coffee (Medium)', '1× Almond Biscotti'],
    total: '$8.00',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=60',
    rated: true,
    reorderRoute: '/menu',
  },
];

/**
 * Order history screen
 * Displays a list of user's previous orders
 */
export default function OrdersScreen() {
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <ScreenContainer centerContent>
        <View style={styles.emptyState}>
          <Feather name="package" size={80} color={coffeeColors.textSecondary} />
          <Text style={styles.emptyTitle}>No Orders</Text>
          <Text style={styles.emptyText}>Your order history will appear here</Text>
        </View>
      </ScreenContainer>
    );
  }

  const openDetails = (orderId: string) => {
    router.push({ pathname: '/order/[id]', params: { id: orderId } });
  };

  const handleReorder = (route: Href) => {
    router.push(route);
  };

  return (
    <ScreenContainer withPadding={false}>
      <View style={styles.content}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Order History</Text>
          <Text style={styles.headerSubtitle}>Track and reorder your recent purchases</Text>
        </View>

        <View style={styles.list}>
          {orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <Pressable style={styles.cardBody} onPress={() => openDetails(order.id)} accessibilityRole="button">
                <Image source={{ uri: order.image }} style={styles.thumbnail} />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardTitleRow}>
                      <Text style={styles.cafeName}>{order.cafeName}</Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>
                          {order.status === 'completed' ? 'Completed' : 'Processing'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.orderDate}>{order.dateTime}</Text>
                  </View>
                  <View style={styles.items}>
                    {order.items.map((item, idx) => (
                      <Text key={`${order.id}-item-${idx}`} style={styles.itemText}>
                        {item}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.total}>{order.total}</Text>
                </View>
                <Feather name="chevron-right" size={18} color={coffeeColors.textSecondary} />
              </Pressable>

              <View style={styles.cardActions}>
                <Pressable
                  style={[styles.actionButton, styles.actionSecondary]}
                  onPress={() => handleReorder(order.reorderRoute)}
                  accessibilityRole="button">
                  <Feather name="refresh-ccw" size={16} color={coffeeColors.textPrimary} />
                  <Text style={styles.actionSecondaryText}>Reorder</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.actionButton,
                    order.rated ? styles.actionRated : styles.actionPrimary,
                  ]}
                  onPress={() => openDetails(order.id)}
                  accessibilityRole="button">
                  <Feather
                    name="star"
                    size={16}
                    color={order.rated ? '#F9A826' : '#FFFFFF'}
                  />
                  <Text style={order.rated ? styles.actionRatedText : styles.actionPrimaryText}>
                    {order.rated ? 'Rated' : 'Rate'}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
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
  headerCard: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    ...coffeeShadow.card,
    gap: coffeeSpacing.xs,
  },
  headerTitle: {
    color: coffeeColors.brandPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: coffeeColors.textSecondary,
    fontSize: 14,
  },
  list: {
    gap: coffeeSpacing.lg,
  },
  card: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    ...coffeeShadow.card,
    padding: coffeeSpacing.md,
    gap: coffeeSpacing.md,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: coffeeSpacing.md,
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderRadius: coffeeRadius.sm,
  },
  cardContent: {
    flex: 1,
    gap: coffeeSpacing.sm,
  },
  cardHeader: {
    gap: 4,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: coffeeSpacing.sm,
  },
  cafeName: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#E5F7EB',
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    color: '#1D7A3E',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDate: {
    color: coffeeColors.textSecondary,
    fontSize: 14,
  },
  items: {
    gap: 4,
  },
  itemText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  total: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  cardActions: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.xs,
  },
  actionSecondary: {
    borderWidth: 1,
    borderColor: coffeeColors.surfaceBorder,
    backgroundColor: coffeeColors.surfaceMuted,
  },
  actionSecondaryText: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  actionPrimary: {
    backgroundColor: coffeeColors.brandPrimary,
  },
  actionPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionRated: {
    backgroundColor: '#FFF5D6',
  },
  actionRatedText: {
    color: '#C47A00',
    fontWeight: '600',
  },
  emptyState: {
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

