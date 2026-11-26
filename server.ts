import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.resolve(__dirname, '.data');
const CATALOG_FILE = path.resolve(DATA_DIR, 'catalog.json');
const AUTH_FILE = path.resolve(DATA_DIR, 'admin-auth.json');
const SEEDS_FILE = path.resolve(__dirname, 'src', 'data', 'catalogSeeds.json');

const SESSION_SECRET =
  process.env.SESSION_SECRET?.trim() || crypto.randomBytes(32).toString('hex');
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12;

const ALLOWED_DISH_CATEGORIES = new Set([
  'Homemade Curries & Biryani',
  'Shami Kababs',
  'Desserts (Meetha)',
  'Combos, Noodles & Breads',
  'Packed Pantry',
]);

const ALLOWED_SPICE_LEVELS = new Set([
  'Mild & Sweet',
  'Classic Masala',
  'Spicy Homestyle',
]);

const ALLOWED_PACKED_CATEGORIES = new Set([
  'Pastes & Purees',
  'Fried & Frozen',
  'Pickles & Chutneys',
  'Spices & Masalas',
]);

interface DishRecord {
  id: string;
  name: string;
  urduTag: string;
  category: string;
  pricePkr: number;
  spice: string;
  prepTime: string;
  description: string;
  image: string;
  featured?: boolean;
}

interface ProductRecord {
  id: string;
  name: string;
  urduName: string;
  urduTag: string;
  packSize: string;
  shelfLife: string;
  category: string;
  pricePkr: number;
  description: string;
  urduSummary: string;
  purityNote: string;
  image: string;
  featured?: boolean;
}

interface CatalogData {
  dishes: DishRecord[];
  products: ProductRecord[];
}

interface AuthRecord {
  salt: string;
  hash: string;
  createdAt: string;
}

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readSeeds(): CatalogData {
  const raw = fs.readFileSync(SEEDS_FILE, 'utf-8');
  const parsed = JSON.parse(raw) as CatalogData;
  return {
    dishes: Array.isArray(parsed.dishes) ? parsed.dishes : [],
    products: Array.isArray(parsed.products) ? parsed.products : [],
  };
}

function readCatalog(): CatalogData {
  ensureDataDir();
  if (!fs.existsSync(CATALOG_FILE)) {
    const seeds = readSeeds();
    fs.writeFileSync(CATALOG_FILE, JSON.stringify(seeds, null, 2), 'utf-8');
    return seeds;
  }
  const raw = fs.readFileSync(CATALOG_FILE, 'utf-8');
  const parsed = JSON.parse(raw) as CatalogData;
  return {
    dishes: Array.isArray(parsed.dishes) ? parsed.dishes : [],
    products: Array.isArray(parsed.products) ? parsed.products : [],
  };
}

function writeCatalog(catalog: CatalogData): void {
  ensureDataDir();
  const tmpFile = path.resolve(DATA_DIR, `catalog.${Date.now()}.tmp.json`);
  if (!tmpFile.startsWith(DATA_DIR + path.sep)) {
    throw new Error('Invalid storage path');
  }
  fs.writeFileSync(tmpFile, JSON.stringify(catalog, null, 2), 'utf-8');
  fs.renameSync(tmpFile, CATALOG_FILE);
}

function getEnvPasscode(): string {
  return process.env.ADMIN_PASSCODE?.trim() || '';
}

function readStoredAuth(): AuthRecord | null {
  if (!fs.existsSync(AUTH_FILE)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8')) as AuthRecord;
    if (typeof parsed.salt === 'string' && typeof parsed.hash === 'string') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function timingSafeCompareText(a: string, b: string): boolean {
  const digestA = crypto.createHmac('sha256', SESSION_SECRET).update(a).digest();
  const digestB = crypto.createHmac('sha256', SESSION_SECRET).update(b).digest();
  return crypto.timingSafeEqual(digestA, digestB);
}

function signAdminToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = Buffer.from(
    JSON.stringify({ role: 'admin', exp: expiresAt })
  ).toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return { token: `${payload}.${sig}`, expiresAt };
}

function verifyAdminToken(authHeader?: string): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7).trim();
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  if (!payload || !sig) return false;

  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf-8')
    ) as { role?: string; exp?: number };
    if (decoded.role !== 'admin') return false;
    if (typeof decoded.exp !== 'number' || decoded.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!verifyAdminToken(req.headers.authorization)) {
    res.status(401).json({ error: 'Developer authentication required.' });
    return;
  }
  next();
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 12) return false;
  entry.count += 1;
  return true;
}

function cleanText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function validateSafeImage(value: unknown, fallback: string): string | null {
  const raw = cleanText(value, 500);
  if (!raw) return fallback;
  if (raw.startsWith('/src/assets/') || raw.startsWith('/assets/')) {
    if (raw.includes('..')) return null;
    return raw;
  }
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

function validateDishPayload(
  body: Record<string, unknown>,
  existingId?: string
): { error?: string; dish?: DishRecord } {
  const name = cleanText(body.name, 120);
  if (!name) return { error: 'Dish name is required.' };

  const pricePkr = Number(body.pricePkr);
  if (!Number.isFinite(pricePkr) || pricePkr < 1 || pricePkr > 500_000) {
    return { error: 'Price must be between Rs. 1 and Rs. 500,000.' };
  }

  const category = cleanText(body.category, 60);
  if (!ALLOWED_DISH_CATEGORIES.has(category)) {
    return { error: 'Invalid dish category.' };
  }

  const spice = cleanText(body.spice, 40) || 'Classic Masala';
  if (!ALLOWED_SPICE_LEVELS.has(spice)) {
    return { error: 'Invalid spice level.' };
  }

  const image = validateSafeImage(
    body.image,
    '/src/assets/images/dish_chicken_biryani_1795608114048.jpg'
  );
  if (!image) {
    return {
      error: 'Image must be a local /src/assets/ path or an https:// image URL.',
    };
  }

  const id =
    existingId ||
    `zj-dish-${Date.now().toString(36)}-${crypto.randomBytes(2).toString('hex')}`;
  const prepTime = cleanText(body.prepTime, 60) || '1 KG Fresh Pot';
  const roundedPrice = Math.round(pricePkr);
  const urduTag =
    cleanText(body.urduTag, 140) || `${roundedPrice} / ${prepTime} · Fresh Homemade`;
  const description =
    cleanText(body.description, 600) ||
    `${name} prepared fresh on order with pure homestyle spices and clean cooking oil.`;

  return {
    dish: {
      id,
      name,
      urduTag,
      category,
      pricePkr: roundedPrice,
      spice,
      prepTime,
      description,
      image,
      featured: Boolean(body.featured),
    },
  };
}

function validateProductPayload(
  body: Record<string, unknown>,
  existingId?: string
): { error?: string; product?: ProductRecord } {
  const name = cleanText(body.name, 120);
  if (!name) return { error: 'Product name is required.' };

  const pricePkr = Number(body.pricePkr);
  if (!Number.isFinite(pricePkr) || pricePkr < 1 || pricePkr > 500_000) {
    return { error: 'Price must be between Rs. 1 and Rs. 500,000.' };
  }

  const category = cleanText(body.category, 60);
  if (!ALLOWED_PACKED_CATEGORIES.has(category)) {
    return { error: 'Invalid packed product category.' };
  }

  const image = validateSafeImage(
    body.image,
    '/src/assets/images/pack_fried_onion_1795707703089.jpg'
  );
  if (!image) {
    return {
      error: 'Image must be a local /src/assets/ path or an https:// image URL.',
    };
  }

  const id =
    existingId ||
    `pack-${Date.now().toString(36)}-${crypto.randomBytes(2).toString('hex')}`;
  const roundedPrice = Math.round(pricePkr);
  const packSize = cleanText(body.packSize, 60) || '250g Sealed Pack';
  const shelfLife = cleanText(body.shelfLife, 60) || '30 Days Hygienic Store';
  const urduName = cleanText(body.urduName, 140) || name;
  const urduTag =
    cleanText(body.urduTag, 140) || `${roundedPrice} / ${packSize} · Pure Pack`;
  const description =
    cleanText(body.description, 600) ||
    `${name} hygienically packed in food-grade sealed packaging without preservatives.`;
  const urduSummary = cleanText(body.urduSummary, 400) || description;
  const purityNote =
    cleanText(body.purityNote, 140) || '100% Pure Homemade · Zero Preservatives';

  return {
    product: {
      id,
      name,
      urduName,
      urduTag,
      packSize,
      shelfLife,
      category,
      pricePkr: roundedPrice,
      description,
      urduSummary,
      purityNote,
      image,
      featured: Boolean(body.featured),
    },
  };
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/catalog', (_req, res) => {
    res.json(readCatalog());
  });

  app.get('/api/admin/status', (req, res) => {
    const usingEnvPasscode = getEnvPasscode().length > 0;
    const hasClaimed = readStoredAuth() !== null;
    res.json({
      configured: usingEnvPasscode || hasClaimed,
      usingEnvPasscode,
      authenticated: verifyAdminToken(req.headers.authorization),
    });
  });

  app.post('/api/admin/claim', (req, res) => {
    if (getEnvPasscode().length > 0 || readStoredAuth() !== null) {
      res.status(409).json({
        error: 'Developer passcode is already configured. Please sign in.',
      });
      return;
    }

    const passcode = cleanText((req.body as Record<string, unknown>)?.passcode, 128);
    if (passcode.length < 6) {
      res.status(400).json({
        error: 'Passcode must be at least 6 characters long.',
      });
      return;
    }

    ensureDataDir();
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(passcode, salt, 64).toString('hex');
    const record: AuthRecord = {
      salt,
      hash,
      createdAt: new Date().toISOString(),
    };

    try {
      fs.writeFileSync(AUTH_FILE, JSON.stringify(record, null, 2), {
        encoding: 'utf-8',
        flag: 'wx',
      });
    } catch {
      res.status(409).json({ error: 'Developer passcode already exists.' });
      return;
    }

    const session = signAdminToken();
    res.status(201).json(session);
  });

  app.post('/api/admin/login', (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      res.status(429).json({
        error: 'Too many login attempts. Please wait 1 minute and try again.',
      });
      return;
    }

    const passcode = cleanText((req.body as Record<string, unknown>)?.passcode, 128);
    if (!passcode) {
      res.status(400).json({ error: 'Please enter the developer passcode.' });
      return;
    }

    const envPasscode = getEnvPasscode();
    if (envPasscode.length > 0) {
      if (!timingSafeCompareText(passcode, envPasscode)) {
        res.status(401).json({ error: 'Invalid developer passcode.' });
        return;
      }
      res.json(signAdminToken());
      return;
    }

    const stored = readStoredAuth();
    if (!stored) {
      res.status(409).json({
        error: 'Developer passcode is not set yet. Claim your passcode first.',
      });
      return;
    }

    const derivedHex = crypto
      .scryptSync(passcode, stored.salt, 64)
      .toString('hex');
    const storedBuf = Buffer.from(stored.hash, 'hex');
    const derivedBuf = Buffer.from(derivedHex, 'hex');
    if (
      storedBuf.length !== derivedBuf.length ||
      !crypto.timingSafeEqual(storedBuf, derivedBuf)
    ) {
      res.status(401).json({ error: 'Invalid developer passcode.' });
      return;
    }

    res.json(signAdminToken());
  });

  app.post('/api/admin/dishes', requireAdmin, (req, res) => {
    const { error, dish } = validateDishPayload(
      (req.body ?? {}) as Record<string, unknown>
    );
    if (error || !dish) {
      res.status(400).json({ error: error || 'Invalid dish payload.' });
      return;
    }
    const catalog = readCatalog();
    catalog.dishes.push(dish);
    writeCatalog(catalog);
    res.status(201).json(catalog);
  });

  app.put('/api/admin/dishes/:id', requireAdmin, (req, res) => {
    const id = cleanText(req.params.id, 100);
    const catalog = readCatalog();
    const index = catalog.dishes.findIndex((d) => d.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Dish not found.' });
      return;
    }
    const { error, dish } = validateDishPayload(
      (req.body ?? {}) as Record<string, unknown>,
      id
    );
    if (error || !dish) {
      res.status(400).json({ error: error || 'Invalid dish payload.' });
      return;
    }
    catalog.dishes[index] = dish;
    writeCatalog(catalog);
    res.json(catalog);
  });

  app.delete('/api/admin/dishes/:id', requireAdmin, (req, res) => {
    const id = cleanText(req.params.id, 100);
    const catalog = readCatalog();
    const next = catalog.dishes.filter((d) => d.id !== id);
    if (next.length === catalog.dishes.length) {
      res.status(404).json({ error: 'Dish not found.' });
      return;
    }
    catalog.dishes = next;
    writeCatalog(catalog);
    res.json(catalog);
  });

  app.post('/api/admin/products', requireAdmin, (req, res) => {
    const { error, product } = validateProductPayload(
      (req.body ?? {}) as Record<string, unknown>
    );
    if (error || !product) {
      res.status(400).json({ error: error || 'Invalid product payload.' });
      return;
    }
    const catalog = readCatalog();
    catalog.products.push(product);
    writeCatalog(catalog);
    res.status(201).json(catalog);
  });

  app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
    const id = cleanText(req.params.id, 100);
    const catalog = readCatalog();
    const index = catalog.products.findIndex((p) => p.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Packed product not found.' });
      return;
    }
    const { error, product } = validateProductPayload(
      (req.body ?? {}) as Record<string, unknown>,
      id
    );
    if (error || !product) {
      res.status(400).json({ error: error || 'Invalid product payload.' });
      return;
    }
    catalog.products[index] = product;
    writeCatalog(catalog);
    res.json(catalog);
  });

  app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
    const id = cleanText(req.params.id, 100);
    const catalog = readCatalog();
    const next = catalog.products.filter((p) => p.id !== id);
    if (next.length === catalog.products.length) {
      res.status(404).json({ error: 'Packed product not found.' });
      return;
    }
    catalog.products = next;
    writeCatalog(catalog);
    res.json(catalog);
  });

  app.post('/api/admin/reset', requireAdmin, (_req, res) => {
    const seeds = readSeeds();
    writeCatalog(seeds);
    res.json(seeds);
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zaiqa Junction server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
