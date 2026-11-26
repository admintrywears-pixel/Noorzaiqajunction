import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { MENU_ITEMS, PACKED_PRODUCTS } from '../data/menuData';
import type { MenuItem, PackedProduct } from '../types';

export interface CatalogSnapshot {
  dishes: MenuItem[];
  products: PackedProduct[];
}

interface CatalogContextValue {
  dishes: MenuItem[];
  products: PackedProduct[];
  adminToken: string | null;
  setAdminToken: (token: string | null) => void;
  applyCatalog: (data: CatalogSnapshot) => void;
  refreshCatalog: () => Promise<void>;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [dishes, setDishes] = useState<MenuItem[]>(MENU_ITEMS);
  const [products, setProducts] = useState<PackedProduct[]>(PACKED_PRODUCTS);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  const applyCatalog = useCallback((data: CatalogSnapshot) => {
    if (Array.isArray(data.dishes)) {
      setDishes(data.dishes);
    }
    if (Array.isArray(data.products)) {
      setProducts(data.products);
    }
  }, []);

  const refreshCatalog = useCallback(async () => {
    try {
      const res = await fetch('/api/catalog', { cache: 'no-store' });
      if (!res.ok) return;
      const data = (await res.json()) as Partial<CatalogSnapshot>;
      if (Array.isArray(data.dishes) && Array.isArray(data.products)) {
        setDishes(data.dishes);
        setProducts(data.products);
      }
    } catch {
      // Fall back silently to bundled seed catalog if offline
    }
  }, []);

  useEffect(() => {
    void refreshCatalog();
  }, [refreshCatalog]);

  return (
    <CatalogContext.Provider
      value={{
        dishes,
        products,
        adminToken,
        setAdminToken,
        applyCatalog,
        refreshCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    return {
      dishes: MENU_ITEMS,
      products: PACKED_PRODUCTS,
      adminToken: null,
      setAdminToken: () => undefined,
      applyCatalog: () => undefined,
      refreshCatalog: async () => undefined,
    };
  }
  return ctx;
}
