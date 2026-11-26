export type PageId =
  | 'home'
  | 'menu'
  | 'products'
  | 'health'
  | 'orders'
  | 'story'
  | 'reserve'
  | 'contact'
  | 'privacy';

export type SpiceLevel = 'Mild & Sweet' | 'Classic Masala' | 'Spicy Homestyle';

export type Category =
  | 'Homemade Curries & Biryani'
  | 'Shami Kababs'
  | 'Desserts (Meetha)'
  | 'Combos, Noodles & Breads'
  | 'Packed Pantry';

export type PackedCategory =
  | 'All Packs'
  | 'Pastes & Purees'
  | 'Fried & Frozen'
  | 'Pickles & Chutneys'
  | 'Spices & Masalas';

export interface PackedProduct {
  id: string;
  name: string;
  urduName: string;
  urduTag: string;
  packSize: string;
  shelfLife: string;
  category: Exclude<PackedCategory, 'All Packs'>;
  pricePkr: number;
  description: string;
  urduSummary: string;
  purityNote: string;
  image: string;
  featured?: boolean;
}

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

export interface WhatsAppOrderPayload {
  orderId: string;
  fulfillment: 'delivery' | 'pickup';
  entries: CartEntry[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  address?: string;
  notes?: string;
}
