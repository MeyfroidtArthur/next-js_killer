import { createFileRoute, Link } from '@tanstack/react-router'
import { getProduct } from '../server/products'
import { addToCart } from '../lib/store'

export const Route = createFileRoute('/product/$productId')({
  component: ProductDetails,
  loader: async ({ params }) => {
    const product = await getProduct({ data: params.productId })
    if (!product) {
      throw new Error('Product not found')
    }
    return { product }
  },
})

function ProductDetails() {
  const { product } = Route.useLoaderData()

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex-col-reverse flex">
            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>
            
            <div className="mt-4">
               <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {product.category}
               </span>
            </div>

            <div className="mt-10 flex sm:flex-col1">
              <button
                type="button"
                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
            
            <div className="mt-6 text-center">
               <Link to="/shop" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  &larr; Back to Shop
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
