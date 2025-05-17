import { FastifyInstance } from 'fastify'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductImage,
} from '../controllers/products.controller'

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.get('/products', getAllProducts)
  fastify.get('/products/:id', getProductById)
  fastify.post('/products', createProduct)
  fastify.put('/products/:id', updateProduct)
  fastify.put('/products/:id/image', updateProductImage)
  fastify.delete('/products/:id', deleteProduct)
}
