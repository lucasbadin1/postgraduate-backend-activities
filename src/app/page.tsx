"use client"
import { useEffect, useState } from "react";
import { Product } from "@/interface/product";

async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/base/products.json'); // caminho relativo ao /public
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Erro ao ler os produtos:', error);
    return [];
  }
}

const getAllowedCategory = async (category: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/allowedCategoryProxy?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error(`Erro ao verificar categoria via proxy: ${category}`);
    }
    const data = await response.json();
    console.log('Resposta do proxy para categoria:', category, data);

    if (typeof data.allowed !== 'boolean') {
      console.warn(`Campo 'allowed' inválido para a categoria: ${category}`);
      return false;
    }

    return data.allowed;
  } catch (error) {
    console.error(`Erro ao verificar categoria ${category}:`, error);
    return false;
  }
};



const discardNotAllowedProducts = async (products: Product[]): Promise<Product[]> => {
  const checkPromises = products.map(async (product) => {
    const isAllowed = await getAllowedCategory(product.category);
    return isAllowed ? product : null;
  });

  const results = await Promise.all(checkPromises);

  const allowedProducts = results.filter((product): product is Product => product !== null);

  return allowedProducts;
};



export default function Home() {
  const [allowedProducts, setAllowedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(); 
        const filteredProducts = await discardNotAllowedProducts(products); 
        setAllowedProducts(filteredProducts); 
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold m-8 text-center">Produtos Permitidos:</h1>
      <ul className="flex flex-wrap justify-center gap-4 w-full">
        {allowedProducts.length > 0 ? (
          allowedProducts.map((product) => (
            <li key={product.id} className="flex flex-col gap-3 justify-center border p-4 rounded-md shadow-lg w-70 h-60">
              <h2 className="text-xl font-extrabold text-amber-300">{product.name}</h2>
              <p>{product.description}</p>
              <p className="font-bold">{`R$ ${product.price.toFixed(2)}`}</p>
            </li>
          ))
        ) : (
          <li>Carregando produtos...</li>
        )}
      </ul>
    </div>
  );
}
