"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Product from "@/app/component/productDetails/Product";
import Reviews from "@/app/component/productDetails/Reviews";
import ProductsRow from "@/app/component/landing/Products";
import PageNavigate from "@/app/component/PageNavigate";
import { ProductType } from "@/app/utils/type/landing";

// map post data
const mapPostsToProducts = (posts: any[]): ProductType[] =>
  posts.map((p) => {
    const id = p.id;
    const slug = p.slug;
    const name = (p.title?.rendered || "").replace(/<[^>]+>/g, "").trim();
    const imgMatch = (p.content?.rendered || "").match(
      /<img[^>]+src=["']([^"']+)["']/i,
    );
    const image = imgMatch ? imgMatch[1] : "";
    const text = (p.excerpt?.rendered || p.content?.rendered || "").replace(
      /<[^>]+>/g,
      " ",
    );
    const parts = text.trim().split(/\s+/);
    const rating = parts[0] ? parseFloat(parts[0]) : 0;
    const price = parts[1] ? Number(parts[1]) : 0;
    const originalPrice = parts[2] ? Number(parts[2]) : price;
    const discount = parts[3] ? `${parts[3]}%` : undefined;
    const color = parts[4] || "";
    return {
      id,
      slug,
      name,
      image,
      rating,
      price,
      originalPrice,
      discount,
      color,
    };
  });

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [rel, setRel] = useState<ProductType[]>([]);

  useEffect(() => {
    // fetch related data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/releted");
        const result = await response.json();
        const products = Array.isArray(result)
          ? mapPostsToProducts(result)
          : [];
        setRel(products);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-26 py-8 flex flex-col gap-16">
      {/* navigation */}
      <PageNavigate />
      <Product id={id} />
      <Reviews />
      <ProductsRow name="you might also like" products={rel} />
    </div>
  );
};

export default ProductPage;
