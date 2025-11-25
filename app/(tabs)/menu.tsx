import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MenuItemCard } from '@/components/coffee/MenuItemCard';
import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { SearchInput } from '@/components/coffee/SearchInput';
import { coffeeRadius, coffeeShadow, coffeeSpacing, coffeeTypography } from '@/constants/coffeeTheme';
import { ThemePalette, useThemeMode } from '@/context/ThemeModeContext';
import { fetchPosts, Post } from '@/lib/api';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: '☕ Coffee' },
  { id: 'cold', label: '🧊 Cold' },
  { id: 'snacks', label: '🥐 Snacks' },
];

type MenuItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'coffee' | 'cold' | 'snacks';
  badgeLabel?: string;
  imageUrl?: string;
};

const menuImages = [
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=400&q=80',
];

const categoryCycle: MenuItem['category'][] = ['coffee', 'cold', 'snacks'];
const badgeByCategory: Record<MenuItem['category'], string> = {
  coffee: 'Hot',
  cold: 'Iced',
  snacks: 'Fresh',
};

const mapPostToMenuItem = (post: Post, index: number): MenuItem => {
  const cleanTitle = post.title.trim();
  const preparedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
  const cleanBody = post.body.replace(/\s+/g, ' ').trim();
  const truncatedBody = cleanBody.length > 90 ? `${cleanBody.slice(0, 90)}…` : cleanBody;
  const category = categoryCycle[index % categoryCycle.length];

  return {
    id: String(post.id),
    title: preparedTitle,
    description: `${truncatedBody} Perfect for your daily ritual.`,
    price: Number((4 + ((post.id % 7) + 1) * 0.45).toFixed(2)),
    category,
    badgeLabel: badgeByCategory[category],
    imageUrl: menuImages[index % menuImages.length],
  };
};

export default function MenuScreen() {
  const router = useRouter();
  const { palette } = useThemeMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMenuItems = useCallback(async (isPullToRefresh = false) => {
    if (isPullToRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      setError(null);
      const posts = await fetchPosts();
      const normalizedItems = posts.slice(0, 30).map(mapPostToMenuItem);
      setMenuItems(normalizedItems);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load menu items.';
      setError(errorMessage);
    } finally {
      if (isPullToRefresh) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadMenuItems();
  }, [loadMenuItems]);

  const styles = useMemo(() => createStyles(palette), [palette]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [menuItems, searchQuery, selectedFilter]);

  const renderItem: ListRenderItem<MenuItem> = ({ item }) => (
    <MenuItemCard
      {...item}
      onPress={() => router.push({ pathname: '/product/[id]' as const, params: { id: item.id } })}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      {isLoading ? (
        <>
          <ActivityIndicator color={palette.accent} size="large" />
          <Text style={styles.emptySubtitle}>Loading menu...</Text>
        </>
      ) : error ? (
        <>
          <Text style={styles.emptyTitle}>Unable to load menu</Text>
          <Text style={styles.emptySubtitle}>{error}</Text>
          <Pressable onPress={() => loadMenuItems()} style={styles.retryButton}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.emptyTitle}>No items found</Text>
          <Text style={styles.emptySubtitle}>Try different keywords or filters.</Text>
        </>
      )}
    </View>
  );

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

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        contentContainerStyle={[
          styles.list,
          filteredItems.length === 0 && styles.listEmpty,
        ]}
        refreshing={isRefreshing}
        onRefresh={() => loadMenuItems(true)}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.ctaBar}>
        <PrimaryButton title="Go to Cart" onPress={() => router.push('/cart')} />
      </View>
    </View>
  );
}

const createStyles = (palette: ThemePalette) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.backgroundPrimary,
    },
    header: {
      paddingTop: 48,
      paddingHorizontal: coffeeSpacing.lg,
      paddingBottom: coffeeSpacing.lg,
      gap: coffeeSpacing.md,
      backgroundColor: palette.backgroundSecondary,
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
      backgroundColor: palette.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backText: {
      color: palette.textPrimary,
      fontSize: 20,
    },
    headerTitle: {
      color: palette.textPrimary,
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
      backgroundColor: palette.overlay,
    },
    filterChipActive: {
      backgroundColor: palette.accent,
    },
    filterText: {
      color: palette.textPrimary,
      ...coffeeTypography.paragraph,
      fontWeight: '500',
    },
    filterTextActive: {
      color: palette.onHeroText,
    },
    list: {
      padding: coffeeSpacing.lg,
      paddingBottom: coffeeSpacing.xxl * 1.5,
    },
    listEmpty: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    listSeparator: {
      height: coffeeSpacing.md,
    },
    emptyState: {
      alignItems: 'center',
      gap: coffeeSpacing.sm,
      padding: coffeeSpacing.xl,
    },
    emptyTitle: {
      color: palette.accent,
      ...coffeeTypography.subheading,
      fontWeight: '700',
    },
    emptySubtitle: {
      color: palette.textSecondary,
      ...coffeeTypography.paragraph,
      textAlign: 'center',
    },
    retryButton: {
      marginTop: coffeeSpacing.md,
      paddingHorizontal: coffeeSpacing.lg,
      paddingVertical: coffeeSpacing.sm,
      borderRadius: coffeeRadius.lg,
      backgroundColor: palette.accent,
    },
    retryText: {
      color: palette.onHeroText,
      ...coffeeTypography.paragraph,
      fontWeight: '600',
    },
    ctaBar: {
      position: 'absolute',
      bottom: coffeeSpacing.lg,
      left: coffeeSpacing.lg,
      right: coffeeSpacing.lg,
    },
  });


