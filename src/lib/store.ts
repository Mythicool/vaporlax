import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product, CartItem, CartStore, UIStore } from '@/types'

// Safe localStorage check
const isLocalStorageAvailable = (() => {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
})()

// Cart Store with localStorage persistence
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
        itemCount: 0,
      },

      addToCart: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.cart.items.find(item => item.id === product.id)
          
          let newItems: CartItem[]
          
          if (existingItem) {
            // Update quantity of existing item
            newItems = state.cart.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          } else {
            // Add new item
            const newItem: CartItem = {
              id: product.id,
              product,
              quantity,
            }
            newItems = [...state.cart.items, newItem]
          }

          const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

          return {
            cart: {
              items: newItems,
              total,
              itemCount,
            }
          }
        })
      },

      removeFromCart: (productId: string) => {
        set((state) => {
          const newItems = state.cart.items.filter(item => item.id !== productId)
          const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

          return {
            cart: {
              items: newItems,
              total,
              itemCount,
            }
          }
        })
      },

      updateCartQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            const newItems = state.cart.items.filter(item => item.id !== productId)
            const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

            return {
              cart: {
                items: newItems,
                total,
                itemCount,
              }
            }
          }

          const newItems = state.cart.items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )

          const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

          return {
            cart: {
              items: newItems,
              total,
              itemCount,
            }
          }
        })
      },

      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
            itemCount: 0,
          }
        })
      },

      getCartTotal: () => {
        const state = get()
        return state.cart.total
      },

      getCartItemCount: () => {
        const state = get()
        return state.cart.itemCount
      },
    }),
    {
      name: 'vaporlax-cart',
      storage: createJSONStorage(() =>
        isLocalStorageAvailable
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({ cart: state.cart }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Ensure cart totals are recalculated after rehydration
          const total = state.cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
          const itemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
          state.cart.total = total
          state.cart.itemCount = itemCount
        }
      },
    }
  )
)

// UI Store for managing UI state
export const useUIStore = create<UIStore>((set) => ({
  isCartDrawerOpen: false,
  isMobileMenuOpen: false,
  isLoading: false,

  setCartDrawerOpen: (isOpen: boolean) => {
    set({ isCartDrawerOpen: isOpen })
  },

  setMobileMenuOpen: (isOpen: boolean) => {
    set({ isMobileMenuOpen: isOpen })
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
}))

// Product Store (for managing product data and filters)
interface ProductStore {
  products: Product[]
  filteredProducts: Product[]
  filters: {
    category?: string
    priceRange?: { min: number; max: number }
    inStock?: boolean
    featured?: boolean
    search?: string
  }
  setProducts: (products: Product[]) => void
  setFilters: (filters: Partial<ProductStore['filters']>) => void
  clearFilters: () => void
  getProductById: (id: string) => Product | undefined
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  filters: {},

  setProducts: (products: Product[]) => {
    set({ products, filteredProducts: products })
  },

  setFilters: (newFilters: Partial<ProductStore['filters']>) => {
    set((state) => {
      const filters = { ...state.filters, ...newFilters }
      let filteredProducts = [...state.products]

      // Apply category filter
      if (filters.category) {
        filteredProducts = filteredProducts.filter(
          product => product.category.toLowerCase() === filters.category!.toLowerCase()
        )
      }

      // Apply price range filter
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(
          product => product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max
        )
      }

      // Apply stock filter
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(
          product => product.inStock === filters.inStock
        )
      }

      // Apply featured filter
      if (filters.featured !== undefined) {
        filteredProducts = filteredProducts.filter(
          product => product.featured === filters.featured
        )
      }

      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        )
      }

      return { filters, filteredProducts }
    })
  },

  clearFilters: () => {
    set((state) => ({
      filters: {},
      filteredProducts: state.products
    }))
  },

  getProductById: (id: string) => {
    const state = get()
    return state.products.find(product => product.id === id)
  },
}))
