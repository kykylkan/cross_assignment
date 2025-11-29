import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/coffee/ScreenContainer';
import {
  coffeeColors,
  coffeeRadius,
  coffeeShadow,
  coffeeSpacing,
  coffeeTypography,
} from '@/constants/coffeeTheme';
import { useAsyncData } from '@/hooks/useAsyncData';
import { fetchUserById } from '@/lib/api';

export default function ProfileScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [avatarError, setAvatarError] = useState(false);
  const { data: user, isLoading, error } = useAsyncData(() => fetchUserById(1), []);

  const stats = [
    { id: 'orders', label: 'Orders', value: '24' },
    { id: 'points', label: 'Points', value: '350' },
    { id: 'savings', label: 'Saved', value: '$120' },
  ];

  const personalFields = user
    ? [
        { id: 'fullName', label: 'Full Name', value: user.name },
        { id: 'email', label: 'Email', value: user.email },
        { id: 'phone', label: 'Phone', value: user.phone },
      ]
    : [];

  const quickShortcuts: Array<{
    id: string;
    title: string;
    description: string;
    icon: any;
    iconBg: string;
    iconColor: string;
    route?: Href;
  }> = [
    {
      id: 'addresses',
      title: 'Saved Addresses',
      description: 'Manage delivery locations',
      icon: 'map-pin',
      iconBg: '#FDF0CC',
      iconColor: '#E26A00',
      route: '/settings',
    },
    {
      id: 'payments',
      title: 'Payment Methods',
      description: 'Manage cards and wallets',
      icon: 'credit-card',
      iconBg: '#E4F0FF',
      iconColor: '#1573FF',
      route: '/settings',
    },
    {
      id: 'rewards',
      title: 'Rewards & Offers',
      description: 'View available discounts',
      icon: 'gift',
      iconBg: '#DFFCE7',
      iconColor: '#1C8B45',
      route: '/orders',
    },
  ];

  const supportAndPrefs: Array<{
    id: string;
    title: string;
    description: string;
    icon: any;
    iconBg: string;
    iconColor: string;
    type?: 'toggle';
    route?: Href;
  }> = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Order updates and offers',
      icon: 'bell',
      iconBg: '#F1E4FF',
      iconColor: '#871BFF',
      type: 'toggle' as const,
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Customize your experience',
      icon: 'sliders',
      iconBg: '#FFE6D6',
      iconColor: '#FF5A1F',
      route: '/settings',
    },
    {
      id: 'support',
      title: 'Help & Support',
      description: 'FAQ and contact us',
      icon: 'life-buoy',
      iconBg: '#E4EBFF',
      iconColor: '#3F51B5',
      route: '/support',
    },
  ];

  const navigateTo = (path?: Href) => () => {
    if (path) {
      router.push(path);
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={coffeeColors.brandPrimary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !user) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'User data not found'}</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <LinearGradient
          colors={['#0070FD', '#2B91FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>Profile</Text>
            <Pressable style={styles.heroSettings} onPress={navigateTo('/settings')} accessibilityRole="button">
              <Feather name="settings" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              {!avatarError ? (
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/150?img=12',
                  }}
                  style={styles.avatarImage}
                  onError={() => setAvatarError(true)}
                />
              ) : null}
              {/*<View style={styles.avatarInitialFallback}>*/}
              {/*  <Text style={styles.avatarInitial}>{user.name.charAt(0)}</Text>*/}
              {/*</View>*/}
              {/*<Pressable style={styles.avatarEdit} hitSlop={12}>*/}
              {/*  <Feather name="camera" size={14} color={coffeeColors.brandPrimary} />*/}
              {/*</Pressable>*/}
            </View>

            <View style={styles.userMeta}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <Pressable
              style={styles.heroAction}
              onPress={navigateTo('/settings')}
              accessibilityRole="button">
              <Feather name="edit-3" size={16} color={coffeeColors.brandPrimary} />
              <Text style={styles.heroActionText}>Edit</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            {stats.map((stat, index) => (
              <View
                key={stat.id}
                style={[styles.statCard, index < stats.length - 1 && styles.statDivider]}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <Pressable style={styles.cardAction} onPress={navigateTo('/settings')}>
              <Feather name="edit-3" size={16} color={coffeeColors.brandPrimary} />
              <Text style={styles.cardActionText}>Edit</Text>
            </Pressable>
          </View>
          {personalFields.map((field, index) => (
            <View key={field.id} style={[styles.fieldRow, index < personalFields.length - 1 && styles.rowDivider]}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <Text style={styles.fieldValue}>{field.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          {quickShortcuts.map((shortcut, index) => (
            <Pressable
              key={shortcut.id}
              style={[styles.row, index < quickShortcuts.length - 1 && styles.rowDivider]}
              onPress={navigateTo(shortcut.route)}
              accessibilityRole={shortcut.route ? 'button' : undefined}>
              <View style={[styles.rowIcon, { backgroundColor: shortcut.iconBg }]}>
                <Feather name={shortcut.icon as any} size={18} color={shortcut.iconColor} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{shortcut.title}</Text>
                <Text style={styles.rowSubtitle}>{shortcut.description}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={coffeeColors.textSecondary} />
            </Pressable>
          ))}
        </View>

        <View style={styles.card}>
          {supportAndPrefs.map((item, index) => (
            <View key={item.id} style={[styles.row, index < supportAndPrefs.length - 1 && styles.rowDivider]}>
              <View style={[styles.rowIcon, { backgroundColor: item.iconBg }]}>
                <Feather name={item.icon as any} size={18} color={item.iconColor} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSubtitle}>{item.description}</Text>
              </View>
              {item.type === 'toggle' ? (
                <Switch
                  value={pushEnabled}
                  onValueChange={setPushEnabled}
                  trackColor={{ false: '#D7DBE8', true: '#0A6BFF' }}
                  thumbColor="#FFFFFF"
                />
              ) : (
                <Pressable onPress={navigateTo(item.route)} accessibilityRole="button">
                  <Feather name="chevron-right" size={18} color={coffeeColors.textSecondary} />
                </Pressable>
              )}
            </View>
          ))}
        </View>

        <Pressable style={styles.signOutButton} onPress={() => {}} accessibilityRole="button">
          <Feather name="log-out" size={18} color="#D7263D" />
          <Text style={styles.signOutText}>Log Out</Text>
        </Pressable>

        <Text style={styles.versionLabel}>CoffeeGo v1.0.0</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    gap: coffeeSpacing.lg,
  },
  heroCard: {
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    ...coffeeShadow.card,
    gap: coffeeSpacing.lg,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  heroSettings: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  avatarInitialFallback: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  avatarEdit: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...coffeeShadow.soft,
  },
  userMeta: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  userEmail: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  heroAction: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: coffeeSpacing.md,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.xs,
    ...coffeeShadow.soft,
  },
  heroActionText: {
    color: coffeeColors.brandPrimary,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: coffeeRadius.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  statCard: {
    flex: 1,
    paddingVertical: coffeeSpacing.md,
    alignItems: 'center',
  },
  statDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  card: {
    backgroundColor: coffeeColors.surface,
    borderRadius: coffeeRadius.lg,
    padding: coffeeSpacing.lg,
    gap: coffeeSpacing.md,
    ...coffeeShadow.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: coffeeColors.brandPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.xs,
  },
  cardActionText: {
    color: coffeeColors.brandPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  fieldRow: {
    gap: 6,
  },
  fieldLabel: {
    color: coffeeColors.brandPrimary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    color: coffeeColors.textPrimary,
    ...coffeeTypography.subheading,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: coffeeSpacing.md,
    paddingVertical: coffeeSpacing.sm,
  },
  rowIcon: {
    width: 48,
    height: 48,
    borderRadius: coffeeRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    color: coffeeColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  rowSubtitle: {
    color: coffeeColors.textSecondary,
    marginTop: 2,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: coffeeColors.surfaceBorder,
  },
  signOutButton: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#FFD0D5',
    backgroundColor: '#F8F5FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.sm,
  },
  signOutText: {
    color: '#D7263D',
    fontSize: 16,
    fontWeight: '600',
  },
  versionLabel: {
    color: coffeeColors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.md,
    padding: coffeeSpacing.xl,
  },
  loadingText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: coffeeSpacing.md,
    padding: coffeeSpacing.xl,
  },
  errorText: {
    color: coffeeColors.textSecondary,
    ...coffeeTypography.paragraph,
    textAlign: 'center',
  },
});

