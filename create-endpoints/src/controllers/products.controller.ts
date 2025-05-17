import { FastifyRequest, FastifyReply } from 'fastify'
import { readProducts, writeProducts } from '../utils/file'

interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  pictureUrl?: string
}

export async function getAllProducts(req: FastifyRequest, reply: FastifyReply) {
  const products = await readProducts()
  return reply.send(products)
}

export async function getProductById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const products = await readProducts()
  const product = products.find((p: any) => String(p.id) === req.params.id)
  if (!product) return reply.status(404).send({ error: 'Produto não encontrado' })
  return reply.send(product)
}

export async function createProduct(
  req: FastifyRequest<{ Body: { name: string; price: number, description: string, category: string, pictureUrl: string } }>,
  reply: FastifyReply
) {
  const products: Product[] = await readProducts()
  const maxId = products.reduce((max, p: Product) => Math.max(max, Number(p.id)), 0)
  const newProduct: Product = {
    id: (maxId + 1).toString(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    pictureUrl: req.body.pictureUrl,
  }
  products.push(newProduct)
  await writeProducts(products)
  return reply.status(201).send(newProduct)
}


export async function updateProduct(req: FastifyRequest<{ Params: { id: string }; Body: { name?: string; price?: number; description?: string; category?: string; pictureUrl?: string } }>, reply: FastifyReply) {
  const products = await readProducts()
  const index = products.findIndex((p: any) => String(p.id) === req.params.id)
  if (index === -1) return reply.status(404).send({ error: 'Produto não encontrado' })
  
  products[index] = { ...products[index], ...req.body }
  await writeProducts(products)
  return reply.send(products[index])
}

export async function updateProductImage(
  req: FastifyRequest<{ Params: { id: string }; Body: { pictureUrl: string } }>,
  reply: FastifyReply
) {
  const products = await readProducts()
  const index = products.findIndex((p: any) => String(p.id) === req.params.id)
  if (index === -1) return reply.status(404).send({ error: 'Produto não encontrado' })

  products[index].image = req.body.pictureUrl
  await writeProducts(products)
  return reply.send(products[index])
}

export async function deleteProduct(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const products = await readProducts()
  const index = products.findIndex((p: any) => p.id.toString() === req.params.id)
  if (index === -1) return reply.status(404).send({ error: 'Produto não encontrado' })

  const removed = products.splice(index, 1)[0]
  await writeProducts(products)
  return reply.send(removed)
}

