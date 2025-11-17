/**
 * Constants for navigation screen names
 * Used for type-safe navigation and avoiding errors in names
 */
export const SCREENS = {
  // Auth & Onboarding
  LOGIN: 'index',
  ONBOARDING: 'onboarding',
  
  // Main Tabs
  HOME: 'home',
  CART: 'cart',
  PROFILE: 'profile',
  ORDERS: 'orders',
  
  // Stack Screens
  PRODUCT_DETAILS: 'product/[id]',
  ORDER_DETAILS: 'order/[id]',
  
  // Drawer Screens
  SETTINGS: 'settings',
  SUPPORT: 'support',
  ABOUT: 'about',
  
  // Modal
  MODAL: 'modal',
} as const;

/**
 * Types for type-safe navigation
 */
export type ScreenName = typeof SCREENS[keyof typeof SCREENS];

