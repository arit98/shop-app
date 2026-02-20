"use client"
import AdBar from '@/app/component/AdBar';
import Category from '@/app/component/landing/Category';
import HeroSection from '@/app/component/landing/Hero';
import ProductsRow from '@/app/component/landing/Products';
import Review from '@/app/component/landing/Review';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ProductType } from '@/app/utils/type/landing';

const mapPostsToProducts = (posts: any[]): ProductType[] =>
  posts.map((p) => {
    const id = p.id;
    const slug = p.slug;
    const name = (p.title?.rendered || "")
      .replace(/<[^>]+>/g, "")
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();
    const imgMatch = (p.content?.rendered || "").match(
      /<img[^>]+src=["']([^"']+)["']/i,
    );
    const image = imgMatch ? imgMatch[1] : "";
    const text = (p.excerpt?.rendered || p.content?.rendered || "").replace(
      /<[^>]+>/g,
      " ",
    );
    const numbers = text.match(/[\d.]+/g) || [];
    const rating = numbers[0] ? parseFloat(numbers[0]) : 0;
    const price = numbers[1] ? Number(numbers[1]) : 0;
    const originalPrice = numbers[2] ? Number(numbers[2]) : price;
    const discount = numbers[3] ? `${numbers[3]}%` : undefined;
    return { id, slug, name, image, rating, price, originalPrice, discount };
  });

const LandingPage = () => {
  const [arrival, setArrival] = useState<ProductType[]>([]);
  const [topSelling, setTopSelling] = useState<ProductType[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/arrival');
      const result = await response.json();
      const products = Array.isArray(result) ? mapPostsToProducts(result) : [];
      setArrival(products);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }

    try {
      const response = await fetch('/api/top-selling');
      const result = await response.json();
      const products = Array.isArray(result) ? mapPostsToProducts(result) : [];
      setTopSelling(products);
    } catch (error) {
      console.error('Error fetching top selling posts:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-[#F2F0F1] w-full min-h-[600px] relative overflow-hidden">
      <section className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-26 pt-10 md:pt-20 flex flex-col md:flex-row items-center justify-between">
        <HeroSection />
      </section>

      <AdBar />

      <section className="bg-white px-6 md:px-32">
        <ProductsRow name="New Arrival" products={arrival} />
      </section>

      <section className="bg-white px-6 md:px-32">
        <ProductsRow name="Top Selling" products={topSelling} />
      </section>

      <section>
        <Category />
      </section>

      <section>
        <Review />
      </section>
    </main>
  )
}

export default LandingPage