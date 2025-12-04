import { Link } from '@tanstack/react-router'
import { ShoppingCart, Store } from 'lucide-react'
import { useStore } from '@tanstack/react-store'
import { store } from '../lib/store'

export function Navbar() {
  const cartItems = useStore(store, (state) => state.cart.items)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">LuxeStore</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeProps={{ className: 'border-indigo-500 text-gray-900' }}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeProps={{ className: 'border-indigo-500 text-gray-900' }}
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/cart"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
            >
              <span className="sr-only">View cart</span>
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-red-500 text-white text-xs font-bold text-center flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
