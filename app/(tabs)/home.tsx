import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CategoryButton } from '@/components/coffee/CategoryButton';
import { LastOrderCard } from '@/components/coffee/LastOrderCard';
import { LocationSearch } from '@/components/coffee/LocationSearch';
import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { ShopCard } from '@/components/coffee/ShopCard';
import { coffeeColors, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

/**
 * Mock data for the home screen
 */
const lastOrder = {
  item: 'Caramel Latte, Medium',
};

const categories = [
  { id: '1', emoji: '☕', label: 'Coffee' },
  { id: '2', emoji: '🧊', label: 'Cold' },
  { id: '3', emoji: '🥐', label: 'Snacks' },
  { id: '4', emoji: '🍵', label: 'Tea' },
];

const nearbyShops = [
  {
    id: '1',
    name: 'The Daily Grind',
    distance: '0.3 mi',
    timeRange: '5-10 min',
    rating: 4.8,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Brew & Co',
    distance: '0.5 mi',
    timeRange: '8-12 min',
    rating: 4.6,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
  },
];

/**
 * Main home screen
 * Implements the design from Figma with header, last order, categories, and nearby shops
 */
export default function HomeScreen() {
  const router = useRouter();

  const handleReorder = () => {
    // Navigate to reorder or cart
  };

  const handleCategoryPress = (categoryId: string) => {
    // Filter by category
  };

  const handleShopPress = (shopId: string) => {
    // Navigate to shop details
  };

  const handleShopMenuPress = (shopId: string) => {
    // Navigate to shop menu
    router.push('/menu');
  };

  const handleMenuNavigate = () => {
    router.push('/menu');
  };

  return (
    <View style={styles.root}>
      {/* Header with gradient */}
      <LinearGradient
        colors={['#1533FE', '#006FFC', '#4F39F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Good morning ☀️</Text>
            <Text style={styles.title}>Let&apos;s get your coffee</Text>
          </View>
          <Pressable style={styles.notificationButton}>
            <Feather name="bell" size={20} color={coffeeColors.surface} />
          </Pressable>
        </View>
        <View style={styles.locationContainer}>
          <LocationSearch address="123 Main Street" city="New York, NY" />
        </View>
        <PrimaryButton title="Explore Menu" onPress={handleMenuNavigate} size="small" />
      </LinearGradient>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Last Order Card */}
        <View style={styles.section}>
          <LastOrderCard orderItem={lastOrder.item} onReorder={handleReorder} />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                emoji={category.emoji}
                label={category.label}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </View>
        </View>

        {/* Nearby Shops */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Shops</Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <Feather name="chevron-right" size={16} color={coffeeColors.brandPrimary} />
            </Pressable>
          </View>
          <View style={styles.shopsContainer}>
            {nearbyShops.map((shop) => (
              <ShopCard
                key={shop.id}
                name={shop.name}
                distance={shop.distance}
                timeRange={shop.timeRange}
                rating={shop.rating}
                isOpen={shop.isOpen}
                imageUrl={shop.imageUrl}
                onPress={() => handleShopPress(shop.id)}
                onMenuPress={() => handleShopMenuPress(shop.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: coffeeColors.backgroundMiddle,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: coffeeSpacing.lg,
    paddingBottom: coffeeSpacing.xl,
    gap: coffeeSpacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTextContainer: {
    flex: 1,
    gap: coffeeSpacing.xs,
  },
  greeting: {
    color: coffeeColors.surface,
    opacity: 0.8,
    ...coffeeTypography.paragraph,
  },
  title: {
    color: coffeeColors.surface,
    ...coffeeTypography.heading,
    fontSize: 28,
    fontWeight: '700',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    marginTop: coffeeSpacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: coffeeSpacing.lg,
    paddingTop: coffeeSpacing.lg,
    paddingBottom: coffeeSpacing.xxl,
    gap: coffeeSpacing.xl,
  },
  section: {
    gap: coffeeSpacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
    fontSize: 20,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
  },
  seeAllText: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.paragraph,
    fontWeight: '500',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: coffeeSpacing.md,
    justifyContent: 'space-between',
  },
  shopsContainer: {
    gap: coffeeSpacing.md,
  },
});
