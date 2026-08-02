import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let products = MOCK_PRODUCTS;

    if (category && category !== 'all') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
