import type {
  BranchInfo,
  Category,
  ComparisonRow,
  CulinaryStage,
  HealthBenefit,
  MenuItem,
  PageId,
  SpiceLevel,
  WhatsAppOrderPayload,
} from '../types';

export const WHATSAPP_DISPLAY = '+92 371 2442688';
export const WHATSAPP_NUMBER = '923712442688';

export const IMAGE_ASSETS = {
  beefShami: '/src/assets/images/dish_beef_shami_kabab_1795608112991.jpg',
  chickenShami: '/src/assets/images/dish_chicken_shami_kabab_1795608113257.jpg',
  chickenAchaari: '/src/assets/images/dish_chicken_achaari_1795608113895.jpg',
  chickenBiryani: '/src/assets/images/dish_chicken_biryani_1795608114048.jpg',
  chickenQorma: '/src/assets/images/dish_chicken_qorma_1795608120781.jpg',
  zarda: '/src/assets/images/dish_zarda_1795608114373.jpg',
  mutanjanZarda: '/src/assets/images/dish_mutanjan_zarda_1795608115444.jpg',
  aaluQeema: '/src/assets/images/dish_aalu_qeema_1795608117555.jpg',
  chickenChowmien: '/src/assets/images/dish_chicken_chowmien_1795608117481.jpg',
  roti: '/src/assets/images/dish_roti_1795608116734.jpg',
  aaluParatha: '/src/assets/images/dish_aalu_paratha_1795608118535.jpg',
  daalChawalKabab: '/src/assets/images/dish_daal_chawal_kabab_1795608119343.jpg',
};

export const CULINARY_STAGES: CulinaryStage[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'Pure Whole Spices & Fresh Oil Base',
    subtitle: 'Hand-Cleaned Zeera, Laung, Badiyan & Elaichi Tadka',
    description:
      'Every Noor Zaiqa Junction pot starts just like your mother’s home kitchen—whole roasted cumin seeds, cloves, cinnamon bark, cardamom, and crisp golden onions sizzling in clean, fresh single-use oil or desi ghee.',
    keyIngredients: ['Whole Garam Masala', 'Golden Onion', 'Fresh Ginger-Garlic', 'Pure Oil & Ghee'],
    heatTemp: '180°C',
    duration: '5 min',
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'Classic Pakistani Masala Bhunai',
    subtitle: 'Balanced Lal Mirch, Haldi, Dhania & Kalonji Gravy',
    description:
      'We cook rich normal-masala Pakistani comfort dishes—blending aromatic red chilli, turmeric, coriander powder, tangy tomatoes, yogurt, and achaari kalonji-fennel slowly until the masala turns deep, fragrant, and oil separates naturally.',
    keyIngredients: ['Lal Mirch & Haldi', 'Pisa Dhania', 'Achaari Kalonji', 'Whisked Dahi'],
    heatTemp: '160°C',
    duration: '12 min',
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'Slow Biryani Dum, Resha Kababs & Meetha',
    subtitle: 'Hand-Pounded Shami Patties, Basmati Dum & Zarda Craft',
    description:
      'Aged basmati rice steams over spiced Karachi masala for Chicken Biryani, boiled beef and chicken resha fold with chana daal into Beef & Chicken Shami Kababs, and saffron syrup glazes classic Zarda & festive Mutanjan.',
    keyIngredients: ['Aged Basmati', 'Chana Daal Resha', 'Saffron & Khoya', 'Fresh Tawa Dough'],
    heatTemp: '120°C',
    duration: '25 min',
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'Freshly Packed & Made Custom on Order',
    subtitle: 'Ghar ka Zaiqa, Har Plate Mein — Custom Dishes Anytime',
    description:
      'Every KG tray, 12-piece Kabab box, Chicken Chowmein box, Daal Chawal plate, or fresh Roti & Aalu Paratha leaves hygienically sealed—and beyond this Special Menu, whatever homemade dish you want is also cooked fresh on order.',
    keyIngredients: ['Fresh On Order', '12-Piece Kabab Packs', 'Hot Rotis & Parathas', 'Custom Requests'],
    heatTemp: '90°C',
    duration: 'Made Fresh',
  },
];

export const URDU_STAGES: Record<
  number,
  { title: string; subtitle: string; summary: string }
> = {
  1: {
    title: 'خالص ثابت مصالحے اور تازہ تڑکا',
    subtitle: 'زیرہ، لونگ، دارچینی، الائچی اور سنہری پیاز کی خوشبو',
    summary:
      'نور ذائقہ جنکشن کے ہر سالن اور بریانی کی شروعات گھر کے خالص ثابت مصالحوں اور صاف ستھرے تازہ کوکنگ آئل سے ہوتی ہے۔',
  },
  2: {
    title: 'روایتی پاکستانی مصالحہ بھنائی',
    subtitle: 'لال مرچ، ہلدی، دھنیا، کلونجی اور دہی کا متوازن ذائقہ',
    summary:
      'چکن اچاری، قورمہ اور آلو قیمہ کو گھر کے اصلی مصالحوں، ٹماٹر اور دہی کے ساتھ دھیمی آنچ پر اچھی طرح بھونا جاتا ہے۔',
  },
  3: {
    title: 'ریشہ شامی کباب، بریانی دم اور میٹھا',
    subtitle: 'بیف و چکن شامی کباب، بریانی، زردہ اور متنجن کی تیاری',
    summary:
      'چنے کی دال اور گوشت کے ریشے دار شامی کباب، خوشبودار چکن بریانی کا دم اور کھوئے میوے والا شاہی زردہ و متنجن۔',
  },
  4: {
    title: 'گھر کا ذائقہ، ہر پلیٹ میں — آرڈر پر ہر ڈش تیار',
    subtitle: 'صاف ستھری پیکنگ اور آپ کی فرمائش کے مطابق خاص کھانے',
    summary:
      'ان ڈشز کے علاوہ بھی جو آپ کو بنوانا ہو، وہ آرڈر پر گھر جیسی صفائی اور خالص ذائقے کے ساتھ تیار کیا جاتا ہے۔',
  },
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'nzj-beef-shami',
    name: 'Beef Shami Kabab (12 Pieces)',
    urduTag: '1000 / 12 Piece · Homestyle Resha',
    category: 'Shami Kababs',
    pricePkr: 1000,
    spice: 'Classic Masala',
    prepTime: '12 Pieces Pack',
    description:
      'Twelve handmade resha beef & chana daal shami kababs slow-simmered with whole garam masala, black pepper, ginger-garlic, and fresh herbs—ready fresh or frozen.',
    image: IMAGE_ASSETS.beefShami,
    featured: true,
  },
  {
    id: 'nzj-chicken-shami',
    name: 'Chicken Shami Kabab (12 Pieces)',
    urduTag: '900 / 12 Piece · Tender Chicken & Daal',
    category: 'Shami Kababs',
    pricePkr: 900,
    spice: 'Classic Masala',
    prepTime: '12 Pieces Pack',
    description:
      'Twelve juicy shredded boneless chicken & chana daal patties seasoned with traditional aromatic spices, coriander, and green chilli—available freshly fried or frozen.',
    image: IMAGE_ASSETS.chickenShami,
    featured: true,
  },
  {
    id: 'nzj-chicken-achaari',
    name: 'Chicken Achaari (1 KG)',
    urduTag: '1200 / 1 KG · Tangy Masala Curry',
    category: 'Homemade Curries & Biryani',
    pricePkr: 1200,
    spice: 'Spicy Homestyle',
    prepTime: '1 KG Fresh Pot',
    description:
      'Tender chicken slow-cooked in tangy homestyle tomato-yogurt gravy infused with pickled kalonji, saunf, mustard seeds, whole red & green spices.',
    image: IMAGE_ASSETS.chickenAchaari,
    featured: true,
  },
  {
    id: 'nzj-chicken-biryani',
    name: 'Chicken Biryani (1 KG)',
    urduTag: '1250 / 1 KG · Karachi Masala Dum',
    category: 'Homemade Curries & Biryani',
    pricePkr: 1250,
    spice: 'Classic Masala',
    prepTime: '1 KG Dum Tray',
    description:
      'Fluffy aged basmati rice layered with rich homemade Karachi chicken masala, potatoes, fried onions, fresh mint, aloo bukhara, and warm biryani spice aroma.',
    image: IMAGE_ASSETS.chickenBiryani,
    featured: true,
  },
  {
    id: 'nzj-chicken-qorma',
    name: 'Chicken Qorma (1 KG)',
    urduTag: '1000 / 1 KG · Traditional Danedar Qorma',
    category: 'Homemade Curries & Biryani',
    pricePkr: 1000,
    spice: 'Mild & Sweet',
    prepTime: '1 KG Fresh Pot',
    description:
      'Classic family-dawat danedar Chicken Qorma simmered in whisked yogurt, crispy browned onions, cardamom, nutmeg-mace, almonds & rich ghar ka masala.',
    image: IMAGE_ASSETS.chickenQorma,
    featured: true,
  },
  {
    id: 'nzj-aalu-qeema',
    name: 'Aalu Qeema (1 KG)',
    urduTag: '1600 / 1 KG · Homestyle Mince & Potatoes',
    category: 'Homemade Curries & Biryani',
    pricePkr: 1600,
    spice: 'Spicy Homestyle',
    prepTime: '1 KG Fresh Pot',
    description:
      'Hand-minced beef qeema bhuna with sweet golden potato cubes, caramelized tomatoes, ginger juliennes, garam masala, and fresh coriander.',
    image: IMAGE_ASSETS.aaluQeema,
  },
  {
    id: 'nzj-zarda',
    name: 'Zarda (1 KG)',
    urduTag: '800 / 1 KG · Classic Saffron Sweet Rice',
    category: 'Desserts (Meetha)',
    pricePkr: 800,
    spice: 'Mild & Sweet',
    prepTime: '1 KG Dessert Tray',
    description:
      'Traditional golden saffron-infused sweet basmati rice cooked in pure ghee with green cardamom, topped with crumbled khoya, almonds, pistachios & raisins.',
    image: IMAGE_ASSETS.zarda,
    featured: true,
  },
  {
    id: 'nzj-mutanjan-zarda',
    name: 'Mutanjan Zarda (1 KG)',
    urduTag: '1100 / 1 KG · Shahi Colorful Dessert',
    category: 'Desserts (Meetha)',
    pricePkr: 1100,
    spice: 'Mild & Sweet',
    prepTime: '1 KG Shahi Tray',
    description:
      'Festive jewel-toned Mutanjan Zarda prepared with aromatic sugar syrup, kewra water, miniature gulab jamun, cham cham, khoya chunks & roasted nuts.',
    image: IMAGE_ASSETS.mutanjanZarda,
  },
  {
    id: 'nzj-chicken-chowmien',
    name: 'Chicken Chowmien (1 Box)',
    urduTag: '300 / 1 Box · Desi Wok Noodles',
    category: 'Combos, Noodles & Breads',
    pricePkr: 300,
    spice: 'Classic Masala',
    prepTime: '1 Full Box',
    description:
      'Hot desi-style wok-tossed noodles with spiced chicken strips, crunchy carrots, capsicum, cabbage, and black-pepper garlic soy glaze.',
    image: IMAGE_ASSETS.chickenChowmien,
  },
  {
    id: 'nzj-daal-chawal-kabab',
    name: 'Daal Chawal + Kabab (1 Plate)',
    urduTag: '300 / 1 Plate · Comfort Meal Combo',
    category: 'Combos, Noodles & Breads',
    pricePkr: 300,
    spice: 'Classic Masala',
    prepTime: '1 Full Plate',
    description:
      'Steaming white basmati chawal topped with fragrant garlic-cumin tadka daal, paired with golden fried Shami Kababs & fresh kachumber salad.',
    image: IMAGE_ASSETS.daalChawalKabab,
    featured: true,
  },
  {
    id: 'nzj-aalu-paratha',
    name: 'Aalu Ka Paratha (1 Piece)',
    urduTag: '120 / Piece · Stuffed Potato Paratha',
    category: 'Combos, Noodles & Breads',
    pricePkr: 120,
    spice: 'Classic Masala',
    prepTime: 'Made Hot on Order',
    description:
      'Crispy golden whole-wheat tawa paratha generously stuffed with spiced mashed potatoes, roasted cumin, coriander, green chilli & red chilli flakes.',
    image: IMAGE_ASSETS.aaluParatha,
  },
  {
    id: 'nzj-roti',
    name: 'Roti (1 Piece)',
    urduTag: '20 / Piece · Soft Ghar Ki Roti',
    category: 'Combos, Noodles & Breads',
    pricePkr: 20,
    spice: 'Mild & Sweet',
    prepTime: 'Fresh Off Tawa',
    description:
      'Soft, warm homemade chakki-atta flatbread cooked fresh to order—perfect accompaniment for Chicken Achaari, Chicken Qorma, and Aalu Qeema.',
    image: IMAGE_ASSETS.roti,
  },
];

export const URDU_NAV: Record<PageId, string> = {
  home: 'ہوم',
  menu: 'مینیو',
  health: 'صفائی و معیار',
  orders: 'آرڈر',
  story: 'ہماری کہانی',
  branches: 'سروس ایریاز',
  reserve: 'دعوت آرڈر',
  contact: 'رابطہ',
  privacy: 'رازداری پالیسی',
};

export const URDU_CATEGORIES: Record<'All' | Category, string> = {
  All: 'تمام ڈشز',
  'Homemade Curries & Biryani': 'سالن و بریانی',
  'Shami Kababs': 'شامی کباب',
  'Desserts (Meetha)': 'میٹھا و زردہ',
  'Combos, Noodles & Breads': 'چاؤمین، دال چاول و روٹی',
};

export const URDU_SPICE: Record<'All Flavors' | SpiceLevel, string> = {
  'All Flavors': 'تمام ذائقے',
  'Mild & Sweet': 'ہلکا مصالحہ و میٹھا',
  'Classic Masala': 'متوازن گھر کا مصالحہ',
  'Spicy Homestyle': 'چٹپٹا مصالحہ دار',
};

export const URDU_BENEFIT_GOALS: Record<string, string> = {
  'All Standards': 'تمام معیار',
  'Pure Ingredients': 'خالص مصالحے',
  'Hygienic Kitchen': 'صفائی و صحت',
  'Fresh Cooking Oil': 'صاف تیل و گھی',
  'Custom Meal Prep': 'آرڈر پر تیاری',
};

export const URDU_DISHES: Record<string, { name: string; tagline: string }> = {
  'nzj-beef-shami': {
    name: 'بیف شامی کباب (۱۲ عدد)',
    tagline: '۱۰۰۰ روپے / ۱۲ عدد — خالص بیف اور چنے کی دال کے ریشے دار کباب',
  },
  'nzj-chicken-shami': {
    name: 'چکن شامی کباب (۱۲ عدد)',
    tagline: '۹۰۰ روپے / ۱۲ عدد — نرم چکن اور چنے کی دال کے گھر کے بنے کباب',
  },
  'nzj-chicken-achaari': {
    name: 'چکن اچاری (۱ کلو)',
    tagline: '۱۲۰۰ روپے / ۱ کلو — کلونجی، سونف اور خالص اچاری مصالحے میں تیار',
  },
  'nzj-chicken-biryani': {
    name: 'چکن بریانی (۱ کلو)',
    tagline: '۱۲۵۰ روپے / ۱ کلو — خوشبودار باسمتی چاول اور تہہ دار دیسی مصالحہ بریانی',
  },
  'nzj-chicken-qorma': {
    name: 'چکن قورمہ (۱ کلو)',
    tagline: '۱۰۰۰ روپے / ۱ کلو — دانے دار تلی پیاز، دہی اور شاہی قورمہ مصالحہ',
  },
  'nzj-aalu-qeema': {
    name: 'آلو قیمہ (۱ کلو)',
    tagline: '۱۶۰۰ روپے / ۱ کلو — بیف قیمے اور آلو کی گھر جیسی لذیذ بھنائی',
  },
  'nzj-zarda': {
    name: 'زردہ (۱ کلو)',
    tagline: '۸۰۰ روپے / ۱ کلو — زعفرانی خوشبو، کھویا، بادام، پستہ اور کشمش کے ساتھ',
  },
  'nzj-mutanjan-zarda': {
    name: 'متنجن زردہ (۱ کلو)',
    tagline: '۱۱۰۰ روپے / ۱ کلو — رنگین شادیوں والا شاہی متنجن، گلاب جامن اور میوے',
  },
  'nzj-chicken-chowmien': {
    name: 'چکن چاؤمین (۱ باکس)',
    tagline: '۳۰۰ روپے / ۱ باکس — تازہ سبزیوں اور چکن اسٹرپس کے ساتھ دیسی چاؤمین',
  },
  'nzj-daal-chawal-kabab': {
    name: 'دال چاول + کباب (۱ پلیٹ)',
    tagline: '۳۰۰ روپے / ۱ پلیٹ — تڑکے والی دال، ابلے چاول اور شامی کباب کی پلیٹ',
  },
  'nzj-aalu-paratha': {
    name: 'آلو کا پراٹھا (۱ عدد)',
    tagline: '۱۲۰ روپے — چٹپٹے آلو بھرے خستہ توے کے پراٹھے',
  },
  'nzj-roti': {
    name: 'گھر کی روٹی (۱ عدد)',
    tagline: '۲۰ روپے — چکی کے آٹے کی نرم اور گرم روٹی',
  },
};

export const HEALTH_FOCUS_MAP: Record<string, string> = {
  'nzj-beef-shami': 'High-Protein Beef & Chana Daal · Zero Artificial Binders',
  'nzj-chicken-shami': 'Lean Chicken Breast & Lentils · Hygienic Fresh/Frozen Prep',
  'nzj-chicken-achaari': 'Kalonji & Fennel Digestive Spices · Clean Single-Use Oil',
  'nzj-chicken-biryani': 'Aged Long-Grain Basmati · Real Spices, Zero Chemical Essence',
  'nzj-chicken-qorma': 'Probiotic Yogurt Base & Whole Garam Masala · Zero Artificial Thickeners',
  'nzj-aalu-qeema': 'Fresh Butcher-Cut Beef Mince · Iron & Homestyle Nutrition',
  'nzj-zarda': 'Real Cardamom, Khoya & Dry Fruits · Pure Sweet Syrup',
  'nzj-mutanjan-zarda': 'Rich Milk Khoya, Almonds & Pistachios · Hygienic Sweet Prep',
  'nzj-chicken-chowmien': 'Fresh Stir-Fried Vegetables & Chicken · Zero MSG Shortcuts',
  'nzj-daal-chawal-kabab': 'Complete Daal Protein + Basmati Rice + Shami Kabab Meal',
  'nzj-aalu-paratha': '100% Whole Wheat Dough & Fresh Spiced Potatoes · Cooked Clean',
  'nzj-roti': 'Pure Stone-Milled Whole Wheat Chakki Atta · Light & Digestible',
};

export function getHealthFocus(item: MenuItem): string {
  return HEALTH_FOCUS_MAP[item.id] ?? '100% Hygienic Homemade Cooking · Pure Spices & Clean Oil';
}

export const HEALTH_BENEFITS: HealthBenefit[] = [
  {
    id: 'pure-home-masala',
    num: '01',
    goal: 'Pure Ingredients',
    title: 'Hand-Cleaned Whole & Ground Ghar Ka Masala',
    metric: '100%',
    unit: 'pure home-selected spices',
    summary:
      'Every Biryani, Qorma, Aalu Qeema, and Shami Kabab is cooked with real kitchen spices—red chilli, turmeric, coriander, cumin, kalonji, and garam masala—free from cheap commercial fillers.',
    scienceNote:
      'Freshly balanced turmeric, cumin, cloves, and kalonji naturally support digestion and wholesome flavor.',
  },
  {
    id: 'single-use-oil',
    num: '02',
    goal: 'Fresh Cooking Oil',
    title: 'Fresh Single-Use Cooking Oil — Zero Reheated Fryers',
    metric: '0%',
    unit: 'reused dark commercial oil',
    summary:
      'Street stalls repeatedly fry kababs and curries in oxidized dark oil. Noor Zaiqa Junction uses clean, fresh oil and pure ghee for every batch so your family never feels heavy acidity.',
    scienceNote:
      'Non-oxidized fresh oil protects heart wellness and keeps fried Shami Kababs & Aalu Parathas crisp and light.',
  },
  {
    id: 'hygienic-meat-prep',
    num: '03',
    goal: 'Hygienic Kitchen',
    title: 'Fresh Halal Chicken & Beef Washed & Prepped Hygienically',
    metric: '100%',
    unit: 'fresh daily meat & daal',
    summary:
      'Whether you order 1 KG Chicken Achaari, Chicken Qorma, Aalu Qeema, or a 12-piece Shami Kabab tray, our ingredients are sourced fresh daily and cooked in sanitized home cookware.',
    scienceNote:
      'Zero meat tenderizer chemicals or synthetic red gravy coloring agents.',
  },
  {
    id: 'balanced-home-meals',
    num: '04',
    goal: 'Pure Ingredients',
    title: 'Complete Family Nutrition from Daal Chawal to Kababs',
    metric: '12',
    unit: 'balanced homestyle classics',
    summary:
      'From high-protein Beef & Chicken Shami Kababs and comforting Daal Chawal + Kabab plates to whole-wheat Chakki Roti, every plate delivers nourishing daily home nutrition.',
    scienceNote:
      'Balanced carbs, lentil protein, and real spices keep energy steady without fast-food fatigue.',
  },
  {
    id: 'fresh-and-frozen',
    num: '05',
    goal: 'Hygienic Kitchen',
    title: 'Zero Preservatives in Fresh & Frozen Shami Packs',
    metric: '0%',
    unit: 'chemical preservatives',
    summary:
      'Our 12-piece Beef Shami Kabab (Rs. 1,000) and Chicken Shami Kabab (Rs. 900) packs are cleanly sealed for freezer convenience without artificial sodium benzoate or fillers.',
    scienceNote:
      'Just whisk an egg or pan-sear straight from your freezer in minutes.',
  },
  {
    id: 'custom-on-order',
    num: '06',
    goal: 'Custom Meal Prep',
    title: 'Custom Dishes & Mild/Low-Oil Cooking Made to Order',
    metric: 'On Order',
    unit: 'custom family & diet prep',
    summary:
      'In dishes ke ilawa bhi jo aapko banwana ho, wo order par ban jata hai—adjust oil levels, request mild spice for elders or kids, or book full 1 KG home pots via WhatsApp.',
    scienceNote:
      'Cooked fresh strictly after your confirmation—never reheated leftover buffet trays.',
  },
];

export const URDU_HEALTH: Record<string, { title: string; summary: string; unit: string }> = {
  'pure-home-masala': {
    title: 'خالص گھر کے مصالحے — ملاوٹ اور بازاری کیمیکلز سے پاک',
    summary:
      'ہمارے ہر سالن، بریانی اور کباب میں گھر کے صاف ستھرے ثابت و پسے مصالحے (لال مرچ، ہلدی، دھنیا، زیرہ اور کلونجی) استعمال ہوتے ہیں۔',
    unit: 'خالص گھر کا مصالحہ',
  },
  'single-use-oil': {
    title: 'صاف ستھرا تازہ کوکنگ آئل — جلا ہوا بازاری تیل نہیں',
    summary:
      'بازاری ڈھابوں کے برعکس ہم ہر ڈش اور شامی کباب صاف اور تازہ آئل میں تیار کرتے ہیں تاکہ معدے پر بوجھ نہ پڑے۔',
    unit: 'تازہ کوکنگ آئل',
  },
  'hygienic-meat-prep': {
    title: 'تازہ حلال گوشت، دالیں اور مکمل ہائجینک صفائی',
    summary:
      'چکن اچاری، قورمہ، آلو قیمہ اور شامی کباب روزانہ کی بنیاد پر تازہ گوشت اور صاف برتنوں میں تیار کیے جاتے ہیں۔',
    unit: 'مکمل صفائی و تازگی',
  },
  'balanced-home-meals': {
    title: 'دال چاول سے کباب تک — متوازن اور صحت بخش گھریلو کھانا',
    summary:
      'پروٹین سے بھرپور بیف اور چکن شامی کباب، دال چاول پلیٹ اور خالص چکی کے آٹے کی روٹی روزمرہ غذائیت کا بہترین ذریعہ ہیں۔',
    unit: 'متوازن گھریلو غذا',
  },
  'fresh-and-frozen': {
    title: 'فریش اور فروزن کباب — کسی کیمیکل یا پریزرویٹو کے بغیر',
    summary:
      '۱۲ عدد بیف اور چکن شامی کباب بغیر کسی مصنوعی کیمیکل کے صاف طریقے سے پیک کیے جاتے ہیں۔',
    unit: 'پریزرویٹو سے پاک',
  },
  'custom-on-order': {
    title: 'ان ڈشز کے علاوہ بھی جو بنوانا ہو، آرڈر پر تیار',
    summary:
      'کم مرچ، کم تیل یا کسی بھی خاص گھریلو ڈش کی فرمائش براہِ راست واٹس ایپ پر کر کے تازہ پکوائیں۔',
    unit: 'فرمائشی تیاری',
  },
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    pillar: 'Spice & Masala Quality',
    zaiqaStandard: 'Balanced homestyle spices (red chilli, turmeric, coriander, garam masala, kalonji)',
    ordinaryRestaurant: 'Harsh commercial flavor enhancers, MSG & adulterated bulk masala mixes',
  },
  {
    pillar: 'Cooking Oil & Hygiene',
    zaiqaStandard: 'Clean fresh single-use cooking oil & ghee in sanitized home cookware',
    ordinaryRestaurant: 'Repeatedly darkened deep-fryer oil and recycled restaurant gravies',
  },
  {
    pillar: 'Meat & Ingredient Ratio',
    zaiqaStandard: 'Real resha Beef/Chicken in Shami Kababs & hearty 1 KG family pots',
    ordinaryRestaurant: 'Heavy potato/starch fillers inside kababs and watered-down curry gravies',
  },
  {
    pillar: 'Freshness Guarantee',
    zaiqaStandard: 'Made strictly fresh on order — plus any custom dish you request',
    ordinaryRestaurant: 'Reheated morning trays sitting in steel warmers all day',
  },
  {
    pillar: 'Value & Home Comfort',
    zaiqaStandard: 'Transparent per-KG, per-12-piece & per-plate family pricing in Karachi',
    ordinaryRestaurant: 'High restaurant markups with small portions and extra service taxes',
  },
];

export const BRANCHES: BranchInfo[] = [
  {
    index: '01',
    city: 'Karachi Central Kitchen',
    area: 'Homemade Fresh & Frozen Dispatch · Karachi',
    hours: '9:00 AM – 11:30 PM Daily (On Order)',
    seats: 'Fresh Hot Delivery & Custom Dawat Pots',
    signature: 'Beef & Chicken Shami Kabab (12 pcs), Chicken Achaari, Chicken Biryani & Qorma',
    story:
      'Our primary Karachi home kitchen prepares every 1 KG pot, 12-piece Shami Kabab pack, Zarda/Mutanjan tray, and daily tiffin fresh to order with strict household cleanliness.',
    image: IMAGE_ASSETS.chickenBiryani,
    align: 'left',
  },
  {
    index: '02',
    city: 'Daily Tiffin & Lunch Zone',
    area: 'Karachi Offices, Hostels & Families',
    hours: 'Lunch & Dinner Slots Daily',
    seats: 'Boxes, Plates & Hot Rotis Ready on Schedule',
    signature: 'Daal Chawal + Kabab (Rs. 300), Chicken Chowmien Box (Rs. 300), Aalu Paratha & Roti',
    story:
      'Designed for working professionals, students, and busy homes across Karachi craving honest Ghar ka Zaiqa—from crisp Aalu Ka Paratha breakfasts to Daal Chawal + Kabab lunches.',
    image: IMAGE_ASSETS.daalChawalKabab,
    align: 'right',
  },
  {
    index: '03',
    city: 'Custom Orders & Dawats',
    area: 'Karachi-Wide Advance & Same-Day Prep',
    hours: 'Order via Call / WhatsApp 0371-2442688',
    seats: '1 KG+ Family Pots & Shahi Meetha Trays',
    signature: 'Mutanjan Zarda, Zarda, Aalu Qeema (1 KG) & Custom Dishes Made to Order',
    story:
      'In dishes ke ilawa bhi jo aapko banwana ho, wo order par ban jata hai—family dawats, Eid platters, or custom homestyle curries cooked fresh just the way your home loves it.',
    image: IMAGE_ASSETS.mutanjanZarda,
    align: 'left',
  },
];

export const STORY_TIMELINE = [
  {
    num: '01',
    time: 'Step 01 · Morning Market Prep',
    title: 'Fresh Meat, Daal & Pantry Selection',
    body: 'Each morning in Karachi starts with sourcing fresh halal chicken, boneless beef mince, long-grain aged basmati rice, chana daal, and farm vegetables.',
    align: 'left' as const,
  },
  {
    num: '02',
    time: 'Step 02 · Ghar Ka Masala Blend',
    title: 'Authentic Traditional Spices — Never Shortcuts',
    body: 'Whether preparing tangy Chicken Achaari, danedar Chicken Qorma, or spicy Aalu Qeema, we build deep flavor from golden onions, red chilli, turmeric, coriander, ginger-garlic & whole garam masala.',
    align: 'right' as const,
  },
  {
    num: '03',
    time: 'Step 03 · Slow Simmer & Sweet Craft',
    title: 'Resha Kababs, Dum Rice & Shahi Zarda',
    body: 'Shami patties are hand-shaped for genuine meat resha, Biryani finishes over steam dum, and classic Zarda & colorful Mutanjan sparkle with khoya, gulab jamun, and nuts.',
    align: 'left' as const,
  },
  {
    num: '04',
    time: 'Step 04 · Custom Cooking on Order',
    title: 'Anything Else You Want — Made Just for You',
    body: 'In dishes ke ilawa bhi jo aapko banwana ho, wo order par ban jata hai. Message 0371-2442688 on WhatsApp for custom family trays, spice adjustments, or bulk packs.',
    align: 'right' as const,
  },
];

export const PANTRY_INGREDIENTS = [
  {
    index: '01',
    name: 'Whole & Ground Garam Masala',
    origin: 'Home-Roasted Spices',
    role: 'Biryani, Qorma & Kababs',
    detail:
      'Cumin, black cardamom, cloves, cinnamon, red chilli, turmeric & coriander balanced cleanly for rich Pakistani aroma.',
  },
  {
    index: '02',
    name: 'Achaari Kalonji & Saunf',
    origin: 'Pickle Spice Blend',
    role: 'Signature Tangy Gravy',
    detail:
      'Nigella seeds, roasted fennel, fenugreek, and mustard seeds give our 1 KG Chicken Achaari its unmistakable homestyle zing.',
  },
  {
    index: '03',
    name: 'Aged Long-Grain Basmati',
    origin: 'Extra-Long Fluffy Grain',
    role: 'Biryani, Daal Chawal & Zarda',
    detail:
      'Carefully soaked before steaming so every grain of Chicken Biryani, Mutanjan, and Zarda stays separate and fragrant.',
  },
  {
    index: '04',
    name: 'Chana Daal & Lean Beef/Chicken',
    origin: 'Daily Fresh Prep',
    role: '12-Piece Shami Kababs',
    detail:
      'Slow-boiled together and hand-shredded for fibrous resha texture that fries crisp outside and tender inside.',
  },
  {
    index: '05',
    name: 'Pure Khoya, Saffron & Nuts',
    origin: 'Traditional Halwai Craft',
    role: 'Zarda & Mutanjan',
    detail:
      'Fresh milk khoya, roasted almonds, pistachios, raisins, and mini mithai turn every 1 KG dessert tray into a feast.',
  },
  {
    index: '06',
    name: 'Chakki Whole-Wheat Atta',
    origin: 'Fresh Tawa Dough',
    role: 'Roti & Aalu Ka Paratha',
    detail:
      'Kneaded daily for soft Rotis (Rs. 20) and flaky spiced Aalu Parathas (Rs. 120) rolled fresh right before dispatch.',
  },
];

export const RESERVE_ZONES = [
  {
    index: '01',
    name: 'Daily Lunch & Dinner Combos',
    capacity: 'Starting Rs. 300',
    note: 'Hot Daal Chawal + Kabab plates, Chicken Chowmien boxes, Aalu Parathas & Rotis delivered fresh.',
    perks: 'Made hot when you order · Clean disposable packing · Prompt Karachi dispatch',
  },
  {
    index: '02',
    name: '1 KG Family Curry & Biryani Pots',
    capacity: 'Rs. 800 – Rs. 1,600 / KG',
    note: 'Order full 1 KG Chicken Achaari, Chicken Biryani, Chicken Qorma, Aalu Qeema, Zarda, or Mutanjan.',
    perks: 'Generous 4–5 person family servings · Customizable spice levels · Zero stale leftovers',
  },
  {
    index: '03',
    name: 'Custom Dishes & Frozen Packs',
    capacity: '12-Piece Trays & Custom',
    note: 'Stock Beef or Chicken Shami Kababs plus any homemade dish you request cooked on order.',
    perks: 'In dishes ke ilawa bhi har item order par tayyar · Free delivery over Rs. 2,500',
  },
];

export const RESERVE_RITUALS = [
  {
    time: 'Step 01 · Choose Your Menu',
    title: 'Select Per-KG, 12-Piece Packs, or Meal Plates',
    detail:
      'Pick exact quantities from our Special Menu or note any extra custom dish you want cooked fresh.',
  },
  {
    time: 'Step 02 · Fresh Kitchen Preparation',
    title: 'Cooked Hygienically with Clean Spices & Fresh Oil',
    detail:
      'Your Chicken Achaari, Biryani, Qorma, Shami Kabab, or Zarda is prepared fresh in small homestyle batches.',
  },
  {
    time: 'Step 03 · Karachi Delivery / Pickup',
    title: 'Hot Sealed Arrival via WhatsApp Coordination',
    detail:
      'Confirm directly on 0371-2442688 for home delivery across Karachi or quick self-pickup.',
  },
];

export const CONTACT_DESKS = [
  {
    city: 'Karachi Order Desk',
    address: 'Homemade Fresh & Frozen Kitchen · Karachi Dispatch',
    hours: '9:00 AM – 11:30 PM Daily',
    phone: WHATSAPP_DISPLAY,
  },
  {
    city: 'Custom & Dawat Orders',
    address: 'Advance 1 KG Pots, Mutanjan Trays & Custom Dishes',
    hours: 'Same-Day & Next-Day Slots',
    phone: WHATSAPP_DISPLAY,
  },
  {
    city: 'Frozen & Tiffin Desk',
    address: '12-Piece Shami Kabab Trays & Daily Meal Boxes',
    hours: 'Call / WhatsApp Anytime',
    phone: WHATSAPP_DISPLAY,
  },
];

export const PRIVACY_SECTIONS = [
  {
    num: '01',
    title: 'Information You Provide Voluntarily',
    body: 'When you place an order, request a custom meal, or book a dawat tray through Noor Zaiqa Junction™, we collect only the details you type into our forms: your name, mobile/WhatsApp number, Karachi delivery area/address, and optional spice or custom-dish notes. We do not collect financial card numbers on this site—deliveries operate on Cash on Delivery (COD) or pay-on-pickup.',
  },
  {
    num: '02',
    title: 'Automatic Order Bag & WhatsApp Handoff',
    body: `Your selected dishes and dish photo references remain strictly inside your active browser session until you choose to send your order. When you click Send on WhatsApp, your itemized order text and dish details are transferred securely via HTTPS directly to WhatsApp (${WHATSAPP_DISPLAY}) under your explicit action.`,
  },
  {
    num: '03',
    title: 'Google Fonts, Hosting & Third-Party Transparency',
    body: 'Consistent with Google Web & Ad Policy transparency standards, this application uses Google Fonts for typography rendering and links externally to WhatsApp when you initiate an order or inquiry. We do not sell, rent, trade, or broker your personal phone number, home address, or dining preferences to data brokers or advertising networks.',
  },
  {
    num: '04',
    title: 'Cookies, Browser Preferences & Analytics',
    body: 'Noor Zaiqa Junction™ operates without intrusive cross-site behavioral tracking cookies. Browser preferences such as reduced-motion accessibility settings (`prefers-reduced-motion`) are respected automatically in real time without storing persistent tracking identifiers.',
  },
  {
    num: '05',
    title: 'Data Retention & Security Safeguards',
    body: 'Order inquiries transmitted via WhatsApp are retained only as long as required to fulfill your fresh food delivery, resolve kitchen feedback, or honor catering/custom meal agreements. All web traffic runs exclusively over encrypted HTTPS/TLS connections.',
  },
  {
    num: '06',
    title: 'Your Privacy Rights & Contact Officer',
    body: `You may request access to, correction of, or deletion of any WhatsApp order record or inquiry history at any time by messaging our Guest Care desk at ${WHATSAPP_DISPLAY} or emailing orders@noorzaiqajunction.pk.`,
  },
];

export const MENU_CATEGORIES: Array<'All' | Category> = [
  'All',
  'Homemade Curries & Biryani',
  'Shami Kababs',
  'Desserts (Meetha)',
  'Combos, Noodles & Breads',
];

export const SPICE_LEVELS: Array<'All Flavors' | SpiceLevel> = [
  'All Flavors',
  'Mild & Sweet',
  'Classic Masala',
  'Spicy Homestyle',
];

export const BENEFIT_GOALS = [
  'All Standards',
  'Pure Ingredients',
  'Fresh Cooking Oil',
  'Hygienic Kitchen',
  'Custom Meal Prep',
];

export const CATEGORY_SHOWCASE: Array<{
  category: Category;
  subtitle: string;
  image: string;
}> = [
  {
    category: 'Homemade Curries & Biryani',
    subtitle: 'Achaari, Biryani, Qorma & Aalu Qeema',
    image: IMAGE_ASSETS.chickenBiryani,
  },
  {
    category: 'Shami Kababs',
    subtitle: 'Beef & Chicken 12-Piece Packs',
    image: IMAGE_ASSETS.beefShami,
  },
  {
    category: 'Desserts (Meetha)',
    subtitle: 'Zarda & Shahi Mutanjan',
    image: IMAGE_ASSETS.mutanjanZarda,
  },
  {
    category: 'Combos, Noodles & Breads',
    subtitle: 'Chowmien, Daal Chawal, Paratha & Roti',
    image: IMAGE_ASSETS.daalChawalKabab,
  },
];

export const QUICK_ATTACH_IDS = [
  'nzj-beef-shami',
  'nzj-chicken-shami',
  'nzj-chicken-achaari',
  'nzj-chicken-biryani',
  'nzj-chicken-qorma',
  'nzj-aalu-qeema',
  'nzj-mutanjan-zarda',
  'nzj-daal-chawal-kabab',
];

export const HEALTH_SPOTLIGHT_IDS = [
  'nzj-beef-shami',
  'nzj-chicken-achaari',
  'nzj-chicken-biryani',
  'nzj-chicken-qorma',
  'nzj-daal-chawal-kabab',
  'nzj-mutanjan-zarda',
];

export const PRIMARY_NAV_ITEMS: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'health', label: 'Hygiene & Purity' },
  { id: 'orders', label: 'Orders' },
  { id: 'contact', label: 'Contact Us' },
];

export const ALL_NAV_ITEMS: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'health', label: 'Hygiene & Purity' },
  { id: 'orders', label: 'Orders' },
  { id: 'story', label: 'Our Story' },
  { id: 'branches', label: 'Service Areas' },
  { id: 'reserve', label: 'Custom Orders' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'privacy', label: 'Privacy Policy' },
];

export const PAGE_STAGE_CONFIG: Record<
  PageId,
  { id: PageId; label: string; stageNames: [string, string, string, string] }
> = {
  home: { id: 'home', label: 'Home', stageNames: ['01 · Spices', '02 · Bhunai', '03 · Dum', '04 · Plate'] },
  menu: { id: 'menu', label: 'Menu', stageNames: ['01 · Special Menu', '02 · Orbital Spin', '03 · Rates', '04 · Full Grid'] },
  health: { id: 'health', label: 'Hygiene & Purity', stageNames: ['01 · Pure Spices', '02 · Clean Oil', '03 · Hygiene', '04 · Custom Prep'] },
  orders: { id: 'orders', label: 'Orders', stageNames: ['01 · Attached Tray', '02 · Dish Photos', '03 · Details', '04 · WhatsApp'] },
  story: { id: 'story', label: 'Our Story', stageNames: ['01 · Ghar Ka Zaiqa', '02 · Masala Craft', '03 · Dum & Sweets', '04 · On Order'] },
  branches: { id: 'branches', label: 'Service Areas', stageNames: ['01 · Karachi Hub', '02 · Daily Boxes', '03 · Dawats', '04 · Custom Booking'] },
  reserve: { id: 'reserve', label: 'Custom Orders', stageNames: ['01 · Combos', '02 · 1 KG Pots', '03 · Shami Packs', '04 · Custom Book'] },
  contact: { id: 'contact', label: 'Contact Us', stageNames: ['01 · Order Desk', '02 · WhatsApp', '03 · Karachi', '04 · Inquiry'] },
  privacy: { id: 'privacy', label: 'Privacy Policy', stageNames: ['01 · Vault', '02 · Data Charter', '03 · WhatsApp', '04 · Rights'] },
};

export function getSpiceCount(spice: SpiceLevel): number {
  if (spice === 'Spicy Homestyle') return 3;
  if (spice === 'Classic Masala') return 2;
  return 1;
}

export function buildSingleDishWhatsAppUrl(item: MenuItem): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const text = [
    '*NOOR ZAIQA JUNCTION™ — DIRECT DISH ORDER*',
    `• Dish: *${item.name}* (${item.urduTag})`,
    `• Price: Rs. ${item.pricePkr.toLocaleString()}`,
    `• Flavor Style: ${item.spice}`,
    `• Dish Photo: ${origin}${item.image}`,
    '',
    'Please confirm order preparation & delivery timing.',
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildOrderWhatsAppText(payload: WhatsAppOrderPayload): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const itemLines = payload.entries.map((entry, idx) => {
    const lineTotal = (entry.item.pricePkr * entry.quantity).toLocaleString();
    const photoUrl = origin ? `${origin}${entry.item.image}` : entry.item.image;
    return `${idx + 1}. ${entry.quantity}x ${entry.item.name} (${entry.item.spice}) — Rs. ${lineTotal}\n   Photo: ${photoUrl}`;
  });
  const totalCount = payload.entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const lines = [
    '*NOOR ZAIQA JUNCTION™ — NEW KITCHEN ORDER*',
    `Order Ref: *${payload.orderId}*`,
    `Mode: ${payload.fulfillment === 'delivery' ? 'Home Delivery (COD)' : 'Self Pickup'}`,
    `Kitchen Area: ${payload.branch}`,
    '',
    `*Attached Dishes (${totalCount} items):*`,
    ...itemLines,
    '',
    `Subtotal: Rs. ${payload.subtotal.toLocaleString()}`,
    `Delivery Fee: ${payload.deliveryFee === 0 ? 'Free' : `Rs. ${payload.deliveryFee}`}`,
    `*Total Payable: Rs. ${payload.total.toLocaleString()}*`,
    '',
    '*Customer Details:*',
    `Name: ${payload.customerName}`,
    `Phone: ${payload.phone}`,
  ];
  if (payload.fulfillment === 'delivery' && payload.address) {
    lines.push(`Address: ${payload.address}`);
  }
  if (payload.notes?.trim()) {
    lines.push(`Custom Order / Notes: ${payload.notes.trim()}`);
  }
  lines.push('', 'Ghar ka Zaiqa, Har Plate Mein · Sent via Noor Zaiqa Junction Web');
  return lines.join('\n');
}

export function buildOrderWhatsAppUrl(payload: WhatsAppOrderPayload): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderWhatsAppText(payload))}`;
}

export function buildInquiryWhatsAppUrl(payload: {
  topic: string;
  branch: string;
  name: string;
  phone: string;
  message: string;
}): string {
  const lines = [
    '*NOOR ZAIQA JUNCTION™ — CUSTOM ORDER / INQUIRY*',
    `Topic: ${payload.topic}`,
    `Area: ${payload.branch}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    '',
    'Message / Dish Request:',
    payload.message,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
