import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'
import { products } from '../src/data/products'

dotenv.config({ path: '.env.local' })

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  console.error('Missing environment variables')
  process.exit(1)
}

const db = createClient({
  url,
  authToken,
})

async function seed() {
  console.log('Seeding database...')

  try {
    // Create table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `)
    console.log('Created products table')

    await db.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        total REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Created orders table')

    await db.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY(order_id) REFERENCES orders(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
      )
    `)
    console.log('Created order_items table')

    // Insert data
    for (const product of products) {
      await db.execute({
        sql: `INSERT INTO products (id, title, description, price, image, category) VALUES (?, ?, ?, ?, ?, ?)
              ON CONFLICT(id) DO UPDATE SET
              title=excluded.title,
              description=excluded.description,
              price=excluded.price,
              image=excluded.image,
              category=excluded.category`,
        args: [
          product.id,
          product.title,
          product.description,
          product.price,
          product.image,
          product.category,
        ],
      })
    }
    console.log(`Seeded ${products.length} products`)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()
