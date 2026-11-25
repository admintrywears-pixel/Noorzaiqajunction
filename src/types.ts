export type PageId =
  | 'home'
  | 'menu'
  | 'health'
  | 'orders'
  | 'story'
  | 'branches'
  | 'reserve'
  | 'contact'
  | 'privacy';

export type SpiceLevel = 'Mild & Sweet' | 'Classic Masala' | 'Spicy Homestyle';

export type Category =
  | 'Homemade Curries & Biryani'
  | 'Shami Kababs'
  | 'Desserts (Meetha)'
  | 'Combos, Noodles & Breads';

export interface MenuItem {
  id: string;
  name: string;
  urduTag: string;
  category: Category;
  pricePkr: number;
  spice: SpiceLevel;
  prepTime: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface CartEntry {
  item: MenuItem;
  quantity: number;
}

export interface CulinaryStage {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  keyIngredients: string[];
  heatTemp: string;
  duration: string;
}

export interface HealthBenefit {
  id: string;
  num: string;
  goal: string;
  title: string;
  metric: string;
  unit: string;
  summary: string;
  scienceNote: string;
}

export interface ComparisonRow {
  pillar: string;
  zaiqaStandard: string;
  ordinaryRestaurant: string;
}

export interface BranchInfo {
  index: string;
  city: string;
  area: string;
  hours: string;
  seats: string;
  signature: string;
  story: string;
  image: string;
  align: 'left' | 'right';
}

export interface WhatsAppOrderPayload {
  orderId: string;
  fulfillment: 'delivery' | 'pickup';
  branch: string;
  entries: CartEntry[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  address?: string;
  notes?: string;
}
