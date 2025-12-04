import { createFileRoute, Link } from '@tanstack/react-router'
import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../server/products'

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const products = await getProducts()
    return { products: products.slice(0, 3) }
  },
})

function Home() {
  const { products } = Route.useLoaderData()

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="Shop interior"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-50" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            New Arrivals are here
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover our latest collection of premium products designed to elevate your lifestyle.
            From electronics to fashion, we have everything you need.
          </p>
          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-block bg-indigo-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-indigo-700"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Featured section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Featured Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
