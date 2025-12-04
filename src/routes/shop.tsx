import { createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../server/products'

export const Route = createFileRoute('/shop')({
  component: Shop,
  loader: async () => {
    const products = await getProducts()
    return { products }
  },
})

function Shop() {
  const { products } = Route.useLoaderData()

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">All Products</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Browse our complete collection of high-quality items.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
