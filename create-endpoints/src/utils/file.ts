import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(__dirname, '../data/products.json')

export async function readProducts() {
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function writeProducts(data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}
