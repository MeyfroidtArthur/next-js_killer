import { createServerFn } from '@tanstack/react-start'
import { db } from '../lib/db'
import { Product } from '../data/products'
import { z } from 'zod'

export const getProducts = createServerFn({ method: 'GET' }).handler(async () => {
  const result = await db.execute('SELECT * FROM products')
  return result.rows as unknown as Product[]
})

export const getProduct = createServerFn({ method: 'GET' })
  .handler(async (id: string) => {
    const result = await db.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [id],
    })
    
    if (result.rows.length === 0) {
      return null
    }
    
    return result.rows[0] as unknown as Product
  })
