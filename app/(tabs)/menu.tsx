import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MenuItemCard } from '@/components/coffee/MenuItemCard';
import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { SearchInput } from '@/components/coffee/SearchInput';
import { coffeeColors, coffeeShadow, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: '☕ Coffee' },
  { id: 'cold', label: '🧊 Cold' },
  { id: 'snacks', label: '🥐 Snacks' },
];

const menuItems = [
  {
    id: '1',
    title: 'Caramel Latte',
    description: 'Espresso with steamed milk and caramel.',
    price: 5.5,
    category: 'coffee',
    badgeLabel: 'Hot',
  },
  {
    id: '2',
    title: 'Cappuccino',
    description: 'Espresso with steamed milk foam.',
    price: 4.5,
    category: 'coffee',
    badgeLabel: 'Hot',
  },
  {
    id: '3',
    title: 'Espresso',
    description: 'Rich and bold coffee shot.',
    price: 3.0,
    category: 'coffee',
  },
  {
    id: '4',
    title: 'Iced Coffee',
    description: 'Cold brew coffee over ice.',
    price: 4.0,
    category: 'cold',
  },
  {
    id: '5',
    title: 'Croissant',
    description: 'Buttery, flaky pastry.',
    price: 3.5,
    category: 'snacks',
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>
        <SearchInput placeholder="Search drinks or food..." value={searchQuery} onChangeText={setSearchQuery} />
        <View style={styles.filtersRow}>
          {filters.map((filter) => {
            const isActive = filter.id === selectedFilter;
            return (
              <Pressable
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={[styles.filterChip, isActive && styles.filterChipActive]}>
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            {...item}
            onPress={() => router.push({ pathname: '/product/[id]' as any, params: { id: item.id } })}
          />
        ))}
        {filteredItems.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No items found</Text>
            <Text style={styles.emptySubtitle}>Try different keywords or filters.</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.ctaBar}>
        <PrimaryButton title="Go to Cart" onPress={() => router.push('/cart')} />
      </View>
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
    paddingBottom: coffeeSpacing.lg,
    gap: coffeeSpacing.md,
    backgroundColor: coffeeColors.backgroundBase,
    ...coffeeShadow.soft,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: coffeeColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: coffeeColors.textPrimary,
    fontSize: 20,
  },
  headerTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
    fontSize: 24,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: coffeeSpacing.sm,
  },
  filterChip: {
    paddingHorizontal: coffeeSpacing.md,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 107, 255, 0.08)',
  },
  filterChipActive: {
    backgroundColor: coffeeColors.brandPrimary,
  },
  filterText: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.paragraph,
    fontWeight: '500',
  },
  filterTextActive: {
    color: coffeeColors.surface,
  },
  list: {
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.md,
    paddingBottom: coffeeSpacing.xxl * 1.5,
  },
  emptyState: {
    alignItems: 'center',
    gap: coffeeSpacing.sm,
    padding: coffeeSpacing.xl,
  },
  emptyTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    textAlign: 'center',
  },
  ctaBar: {
    position: 'absolute',
    bottom: coffeeSpacing.lg,
    left: coffeeSpacing.lg,
    right: coffeeSpacing.lg,
  },
});


