// app/api/allowedCategoryProxy/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category) {
    return new Response(JSON.stringify({ error: 'Categoria não especificada' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const externalResponse = await fetch(`https://posdesweb.igormaldonado.com.br/api/allowedCategory?category=${encodeURIComponent(category)}`);

    if (!externalResponse.ok) {
      return new Response(JSON.stringify({ error: 'Erro ao buscar dados externos' }), {
        status: externalResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await externalResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
