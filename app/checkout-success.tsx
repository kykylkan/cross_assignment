import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

const timeline = [
  { id: 'accepted', title: 'Замовлення прийнято', time: '2:15 PM' },
  { id: 'preparing', title: 'Готуємо напої', time: '2:17 PM' },
  { id: 'ready', title: 'Готово до видачі', time: '2:23 PM' },
];

const orderItems = [
  {
    id: 'item-1',
    name: '1x Caramel Latte (Medium)',
    price: '$5.50',
    note: 'Вівсяне молоко, карамельний сироп, 100% солодощі',
  },
];

export default function CheckoutSuccessScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <LinearGradient colors={['#0A6BFF', '#58A6FF']} style={styles.heroCard}>
          <Text style={styles.orderNumber}>Order #70887</Text>
          <Text style={styles.heroTitle}>🎉 Замовлення готове!</Text>
          <View style={styles.statusPill}>
            <Feather name='check-circle' size={16} color='#0A6BFF' />
            <Text style={styles.statusPillText}>Ready for pickup</Text>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Статус замовлення</Text>
          <View style={styles.timeline}>
            {timeline.map((step, index) => {
              const last = isLast(index);
              return (
                <View key={step.id} style={styles.timelineRow}>
                  <View style={styles.timelineIndicator}>
                    <View style={styles.timelineDot} />
                    {!last && <View style={styles.timelineConnector} />}
                  </View>
                  <View style={[styles.timelineText, last && styles.timelineTextLast]}>
                    <Text style={styles.timelineTitle}>{step.title}</Text>
                    <Text style={styles.timelineTime}>{step.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Місце отримання</Text>
          <View style={styles.locationRow}>
            <View style={[styles.iconBadge, { backgroundColor: '#F3EDFF' }]}>
              <Feather name='map-pin' size={18} color='#7A42FF' />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationTitle}>The Daily Grind</Text>
              <Text style={styles.locationSubtitle}>123 Main Street, New York</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <View style={[styles.iconBadge, { backgroundColor: '#E3F8EF' }]}>
              <Feather name='clock' size={18} color='#1A8C4F' />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationTitle}>Готово за 5-10 хв</Text>
              <Text style={styles.locationSubtitle}>Покажіть QR код на стійці видачі</Text>
            </View>
          </View>
          <Pressable style={styles.qrButton} onPress={() => {}}>
            <Feather name='maximize' size={16} color='#FFFFFF' />
            <Text style={styles.qrButtonText}>Показати QR</Text>
          </Pressable>
        </View>

        <LinearGradient colors={['#E9FDF2', '#FFFFFF']} style={styles.highlightCard}>
          <View style={styles.highlightRow}>
            <View style={[styles.iconBadge, { backgroundColor: '#0FA958' }]}>
              <Feather name='check' size={18} color='#FFFFFF' />
            </View>
            <View style={styles.highlightText}>
              <Text style={styles.highlightTitle}>Ready for Pickup!</Text>
              <Text style={styles.highlightSubtitle}>
                Покажіть QR код та отримайте замовлення без черги
              </Text>
            </View>
          </View>
          <Pressable style={styles.highlightButton} onPress={() => router.replace('/orders')}>
            <Text style={styles.highlightButtonText}>До історії замовлень</Text>
          </Pressable>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Напої</Text>
          {orderItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemNote}>{item.note}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.replace('/(tabs)/home')}>
          <Text style={styles.primaryButtonText}>Повернутися до меню</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const isLast = (index: number) => index === timeline.length - 1;

const styles = StyleSheet.create({
  content: {
    width: '100%',
    gap: coffeeSpacing.lg,
  },
  heroCard: {
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.sm,
    ...coffeeShadow.card,
  },
  orderNumber: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.xs,
    alignSelf: 'center',
    marginTop: coffeeSpacing.sm,
    paddingHorizontal: coffeeSpacing.md,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statusPillText: {
    color: '#0A6BFF',
    fontWeight: '600',
  },
  card: {
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
  timeline: {
    gap: coffeeSpacing.md,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: coffeeSpacing.md,
  },
  timelineIndicator: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0A6BFF',
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: coffeeColors.surfaceBorder,
    marginTop: coffeeSpacing.xs,
  },
  timelineText: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: coffeeColors.surfaceBorder,
    paddingBottom: coffeeSpacing.sm,
  },
  timelineTextLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  timelineTitle: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  timelineTime: {
    color: coffeeColors.textSecondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  locationSubtitle: {
    color: coffeeColors.textSecondary,
    fontSize: 13,
  },
  qrButton: {
    marginTop: coffeeSpacing.sm,
    height: 48,
    borderRadius: coffeeRadius.md,
    backgroundColor: coffeeColors.brandPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.sm,
  },
  qrButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  highlightCard: {
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.md,
  },
  highlightRow: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
    alignItems: 'center',
  },
  highlightText: {
    flex: 1,
  },
  highlightTitle: {
    color: '#0FA958',
    fontWeight: '700',
  },
  highlightSubtitle: {
    color: coffeeColors.textSecondary,
    fontSize: 13,
  },
  highlightButton: {
    height: 48,
    borderRadius: coffeeRadius.md,
    borderWidth: 1,
    borderColor: '#0FA958',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightButtonText: {
    color: '#0FA958',
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: coffeeSpacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: coffeeColors.textPrimary,
    fontWeight: '600',
  },
  itemNote: {
    color: coffeeColors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  itemPrice: {
    color: coffeeColors.brandPrimary,
    fontWeight: '600',
  },
  primaryButton: {
    height: 56,
    borderRadius: coffeeRadius.lg,
    backgroundColor: coffeeColors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    ...coffeeShadow.soft,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

