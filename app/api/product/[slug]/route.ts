import { NextResponse } from 'next/server';

type RouteParams = {
  params: {
    slug: string;
  };
};

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug is required' },
      { status: 400 }
    );
  }

  // clean slug
  const cleanSlug = slug.endsWith('/') ? slug.slice(0, -1) : slug;

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(
        cleanSlug
      )}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

