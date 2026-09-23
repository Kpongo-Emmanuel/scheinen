import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string; 
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
  selectedSize?: string;
  maxStock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((i) => 
              i.id === item.id 
                ? { ...i, quantity: Math.min(i.quantity + 1, i.maxStock) } 
                : i
            )
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((i) => 
            i.id === id ? { ...i, quantity: Math.min(i.maxStock, Math.max(1, quantity)) } : i
          )
        });
      },
      clearCart: () => set({ items: [] }),
      cartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'scheinen-cart', 
    }
  )
)
