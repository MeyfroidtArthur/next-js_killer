import { createServerFn } from '@tanstack/react-start'
import { db } from '../lib/db'
import { z } from 'zod'

const cartItemSchema = z.object({
  id: z.string(),
  price: z.number(),
  quantity: z.number(),
})

const createOrderSchema = z.object({
  items: z.array(cartItemSchema),
  total: z.number(),
})

type CreateOrderData = z.infer<typeof createOrderSchema>

export const createOrder = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createOrderSchema.parse(data))
  .handler(async ({ data }) => {
    const { items, total } = data
    const orderId = crypto.randomUUID()

    try {
      // Start transaction
      
      // Insert order
      await db.execute({
        sql: 'INSERT INTO orders (id, total) VALUES (?, ?)',
        args: [orderId, total],
      })

      // Insert order items
      for (const item of items) {
        await db.execute({
          sql: 'INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
          args: [crypto.randomUUID(), orderId, item.id, item.quantity, item.price],
        })
      }

      return { success: true, orderId }
    } catch (error) {
      console.error('Failed to create order:', error)
      throw new Error('Failed to create order')
    }
  })