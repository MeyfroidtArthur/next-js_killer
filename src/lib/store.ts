import { Store } from '@tanstack/store'
import { Product } from '../data/products'

export interface CartItem extends Product {
  quantity: number
}

interface StoreState {
  cart: {
    items: CartItem[]
  }
}

export const store = new Store<StoreState>({
  cart: {
    items: [],
  },
})

export const addToCart = (product: Product) => {
  store.setState((state) => {
    const existingItem = state.cart.items.find((item) => item.id === product.id)
    if (existingItem) {
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        },
      }
    }
    return {
      ...state,
      cart: {
        ...state.cart,
        items: [...state.cart.items, { ...product, quantity: 1 }],
      },
    }
  })
}

export const removeFromCart = (productId: string) => {
  store.setState((state) => ({
    ...state,
    cart: {
      ...state.cart,
      items: state.cart.items.filter((item) => item.id !== productId),
    },
  }))
}

export const updateQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }
  store.setState((state) => ({
    ...state,
    cart: {
      ...state.cart,
      items: state.cart.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    },
  }))
}

export const clearCart = () => {
  store.setState((state) => ({
    ...state,
    cart: {
      ...state.cart,
      items: [],
    },
  }))
}
