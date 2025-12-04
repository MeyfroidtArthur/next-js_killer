import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { store, removeFromCart, updateQuantity, clearCart } from '../lib/store'
import { Trash2, Plus, Minus } from 'lucide-react'
import { createOrder } from '../server/orders'

export const Route = createFileRoute('/cart')({
  component: Cart,
})

function Cart() {
  const router = useRouter()
  const cartItems = useStore(store, (state) => state.cart.items)
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    try {
      await createOrder({ data: { items: cartItems, total } })
      clearCart()
      alert('Order placed successfully!')
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cartItems.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
                  <div className="mt-6">
                    <Link to="/shop" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      Continue Shopping &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  to={`/product/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.title}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">{product.category}</p>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label htmlFor={`quantity-${product.id}`} className="sr-only">
                              Quantity, {product.title}
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md w-max">
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-500"
                                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-2 text-gray-900">{product.quantity}</span>
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-500"
                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                onClick={() => removeFromCart(product.id)}
                              >
                                <span className="sr-only">Remove</span>
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
