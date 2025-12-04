import { Link } from '@tanstack/react-router'
import { Product } from '../data/products'
import { addToCart } from '../lib/store'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-center object-cover sm:w-full sm:h-full"
        />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/product/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-sm italic text-gray-500">{product.category}</p>
          <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button
          className="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-10 relative pointer-events-auto"
          onClick={(e) => {
            e.preventDefault()
            addToCart(product)
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
