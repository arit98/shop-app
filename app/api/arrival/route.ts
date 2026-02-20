import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://wordpress-1591595-6226930.cloudwaysapps.com/wp-json/wp/v2/posts?categories=3',
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
