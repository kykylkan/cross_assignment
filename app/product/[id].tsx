import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MilkSelector } from '@/components/coffee/MilkSelector';
import { PrimaryButton } from '@/components/coffee/PrimaryButton';
import { QuantitySelector } from '@/components/coffee/QuantitySelector';
import { SizeSelector } from '@/components/coffee/SizeSelector';
import { SweetnessSelector } from '@/components/coffee/SweetnessSelector';
import { SyrupSelector } from '@/components/coffee/SyrupSelector';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';

/**
 * Mock product data (in a real app, this would be fetched from API)
 */
const mockProducts: Record<
  string,
  {
    title: string;
    description: string;
    basePrice: number;
    rating: number;
    isAvailable: boolean;
    imageUrl?: string;
  }
> = {
  '1': {
    title: 'Caramel Latte',
    description: 'Espresso with steamed milk and caramel',
    basePrice: 5.0,
    rating: 4.8,
    isAvailable: true,
  },
  '2': {
    title: 'Cappuccino',
    description: 'Espresso with steamed milk foam',
    basePrice: 4.5,
    rating: 4.8,
    isAvailable: true,
  },
  '3': {
    title: 'Espresso',
    description: 'Rich and bold coffee shot',
    basePrice: 3.0,
    rating: 4.8,
    isAvailable: true,
  },
  '4': {
    title: 'Iced Coffee',
    description: 'Cold brew coffee over ice',
    basePrice: 4.0,
    rating: 4.8,
    isAvailable: true,
  },
  '5': {
    title: 'Croissant',
    description: 'Buttery, flaky pastry',
    basePrice: 3.5,
    rating: 4.8,
    isAvailable: true,
  },
};

const sizeOptions = [
  { id: 's', label: 'S', volume: '12 oz', priceModifier: 0 },
  { id: 'm', label: 'M', volume: '16 oz', priceModifier: 0.5 },
  { id: 'l', label: 'L', volume: '20 oz', priceModifier: 1.0 },
];

const milkOptions = [
  { id: 'whole', label: 'Whole Milk', priceModifier: 0 },
  { id: 'skim', label: 'Skim Milk', priceModifier: 0 },
  { id: 'oat', label: 'Oat Milk', priceModifier: 0.5 },
  { id: 'almond', label: 'Almond Milk', priceModifier: 0.5 },
  { id: 'soy', label: 'Soy Milk', priceModifier: 0.5 },
];

const syrupOptions = [
  { id: 'none', label: 'No Syrup', priceModifier: 0 },
  { id: 'vanilla', label: 'Vanilla', priceModifier: 0.5 },
  { id: 'caramel', label: 'Caramel', priceModifier: 0.5 },
  { id: 'hazelnut', label: 'Hazelnut', priceModifier: 0.5 },
];

const sweetnessLevels = [
  { id: '0', label: '0%', value: 0 },
  { id: '25', label: '25%', value: 25 },
  { id: '50', label: '50%', value: 50 },
  { id: '75', label: '75%', value: 75 },
  { id: '100', label: '100%', value: 100 },
];

/**
 * Product details screen
 * Receives id parameter through route.params and displays full product information
 * Implements the design from Figma with all customization options
 */
export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState('m');
  const [selectedMilk, setSelectedMilk] = useState('whole');
  const [selectedSyrup, setSelectedSyrup] = useState('none');
  const [selectedSweetness, setSelectedSweetness] = useState('100');
  const [quantity, setQuantity] = useState(1);

  // Validate id parameter
  if (!id) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: product not found</Text>
        <PrimaryButton title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const product = mockProducts[id];

  // Handle case when product is not found
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product with ID {id} not found</Text>
        <PrimaryButton title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  // Calculate total price
  const sizePrice = sizeOptions.find((s) => s.id === selectedSize)?.priceModifier || 0;
  const milkPrice = milkOptions.find((m) => m.id === selectedMilk)?.priceModifier || 0;
  const syrupPrice = syrupOptions.find((s) => s.id === selectedSyrup)?.priceModifier || 0;
  const totalPrice = (product.basePrice + sizePrice + milkPrice + syrupPrice) * quantity;

  const handleAddToCart = () => {
    // Cart addition logic will be here
    console.log('Add to cart:', {
      productId: id,
      size: selectedSize,
      milk: selectedMilk,
      syrup: selectedSyrup,
      sweetness: selectedSweetness,
      quantity,
      totalPrice,
    });
    // For demonstration, just go back
    router.back();
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header with image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                product.imageUrl ??
                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
            }}
            style={styles.image}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.imageGradient}
          />
          <View style={styles.headerButtons}>
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <Feather name="chevron-left" size={16} color={coffeeColors.textPrimary} />
            </Pressable>
            <Pressable style={styles.headerButton}>
              <Feather name="heart" size={16} color={coffeeColors.textPrimary} />
            </Pressable>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Product Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <View style={styles.badgesRow}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {product.rating}</Text>
              </View>
              <View style={styles.availabilityBadge}>
                <Text style={styles.availabilityText}>✓ Available</Text>
              </View>
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Choose Size</Text>
            <SizeSelector sizes={sizeOptions} selectedSizeId={selectedSize} onSelect={setSelectedSize} />
          </View>

          {/* Milk Selection */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Choose Milk</Text>
            <MilkSelector options={milkOptions} selectedMilkId={selectedMilk} onSelect={setSelectedMilk} />
          </View>

          {/* Syrup Selection */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Add Syrup (Optional)</Text>
            <SyrupSelector options={syrupOptions} selectedSyrupId={selectedSyrup} onSelect={setSelectedSyrup} />
          </View>

          {/* Sweetness Level */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Sweetness Level</Text>
            <SweetnessSelector
              levels={sweetnessLevels}
              selectedLevelId={selectedSweetness}
              onSelect={setSelectedSweetness}
            />
          </View>

          {/* Quantity */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
              onIncrease={() => setQuantity(Math.min(10, quantity + 1))}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA Bar */}
      <LinearGradient
        colors={[coffeeColors.backgroundMiddle, coffeeColors.backgroundMiddle, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.ctaGradient}>
        <View style={styles.ctaBar}>
          <Pressable onPress={handleAddToCart} style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart • ${totalPrice.toFixed(2)}</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: coffeeColors.backgroundMiddle,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 384,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerButtons: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: coffeeSpacing.lg,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    ...coffeeShadow.soft,
  },
  content: {
    paddingHorizontal: coffeeSpacing.lg,
    paddingTop: coffeeSpacing.lg,
    paddingBottom: coffeeSpacing.xxl,
    gap: coffeeSpacing.lg,
  },
  infoCard: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.sm,
    ...coffeeShadow.soft,
  },
  productTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.heading,
    fontSize: 24,
    fontWeight: '700',
  },
  productDescription: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    fontSize: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: coffeeSpacing.sm,
    marginTop: coffeeSpacing.xs,
  },
  ratingBadge: {
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
    backgroundColor: 'rgba(10, 107, 255, 0.2)',
  },
  ratingText: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.caption,
    fontSize: 14,
    fontWeight: '600',
  },
  availabilityBadge: {
    paddingHorizontal: coffeeSpacing.sm,
    paddingVertical: coffeeSpacing.xs,
    borderRadius: 14,
    backgroundColor: '#DCFFE7',
  },
  availabilityText: {
    color: '#008235',
    ...coffeeTypography.caption,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.md,
    ...coffeeShadow.soft,
  },
  sectionTitle: {
    color: coffeeColors.brandPrimary,
    ...coffeeTypography.subheading,
    fontSize: 20,
    fontWeight: '700',
  },
  ctaGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: coffeeSpacing.xl,
    paddingBottom: coffeeSpacing.lg,
    paddingHorizontal: coffeeSpacing.lg,
  },
  ctaBar: {
    paddingTop: coffeeSpacing.lg,
    paddingBottom: coffeeSpacing.md,
  },
  addToCartButton: {
    backgroundColor: coffeeColors.brandPrimary,
    borderRadius: 16,
    paddingVertical: coffeeSpacing.md,
    paddingHorizontal: coffeeSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  addToCartText: {
    color: coffeeColors.backgroundBase,
    ...coffeeTypography.subheading,
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.lg,
    padding: coffeeSpacing.xl,
    backgroundColor: coffeeColors.backgroundBase,
  },
  errorText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    textAlign: 'center',
  },
});
