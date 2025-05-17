// app.ts
import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'  // importe o plugin cors
import productRoutes from './routes/products.routes'

export const app = Fastify()

// registra o cors antes das rotas
app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // permite todas as origens, ideal para testes locais
})

app.register(productRoutes)

