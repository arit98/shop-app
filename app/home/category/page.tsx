"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import SideBar from "@/app/component/category/SideBar";
import ProductsRow from "@/app/component/landing/Products";
import Pagination from "@/app/component/category/Pagination";
import PageNavigate from "@/app/component/PageNavigate";
import MobileBar from "@/app/component/category/MobileBar";
import { useAppDispatch } from "@/app/store/hooks";
import { openModal } from "@/app/store/modalSlice";
import { ProductType } from "@/app/utils/type/landing";

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
    const numbers = text.match(/[\d.]+/g) || [];
    const rating = numbers[0] ? parseFloat(numbers[0]) : 0;
    const price = numbers[1] ? Number(numbers[1]) : 0;
    const originalPrice = numbers[2] ? Number(numbers[2]) : price;
    const discount = numbers[3] ? `${numbers[3]}%` : undefined;
    return { id, slug, name, image, rating, price, originalPrice, discount };
  });

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const [all, setAll] = useState<ProductType[]>([]);
  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filtered.length);
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all');
      const result = await response.json();
      const products = Array.isArray(result) ? mapPostsToProducts(result) : [];
      setAll(products);
      setFiltered(products); // Initially show all
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplyFilters = (filters: any) => {
    const { priceRange, category, style } = filters;
    const newFiltered = all.filter(p => {
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      // Add more filter logic here when data is available
      return matchesPrice;
    });
    setFiltered(newFiltered);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs */}
      <div className="flex items-center w-full justify-between">
        <div className="flex md:flex-row flex-col items-center justify-between w-full md:px-32">
          <PageNavigate />
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between md:w-[700px] w-full px-4 pt-4">
            <span className="text-black/60 text-xs md:text-sm">
              Showing {filtered.length > 0 ? startIndex + 1 : 0}-{endIndex} of {filtered.length} Products
            </span>
            <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4 text-sm md:text-base">
              <button
                onClick={() => dispatch(openModal("filter"))}
                className="md:hidden p-2 bg-[#F0F0F0] rounded-full"
              >
                <SlidersHorizontal className="w-5 h-5 text-black" />
              </button>
            </div>
            <div className="md:flex hidden items-center gap-1 cursor-pointer group">
              <span className="text-black/60">Sort by:</span>
              <span className="text-black font-bold">Most Popular</span>
              <ChevronDown className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
          {/* Mobilee */}
          <div className="md:hidden flex items-center justify-between w-full pl-6 pr-4 pt-2">
            <h1 className="text-lg md:text-3xl font-bold text-black normal-case">
              Casual
            </h1>
            <span className="text-black/60 text-xs md:text-sm">
              Showing {filtered.length > 0 ? startIndex + 1 : 0}-{endIndex} of {filtered.length} Products
            </span>
            <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4 text-sm md:text-base">
              <button
                onClick={() => dispatch(openModal("filter"))}
                className="md:hidden p-2 bg-[#F0F0F0] rounded-full"
              >
                <SlidersHorizontal className="w-5 h-5 text-black" />
              </button>
            </div>
            <div className="md:flex hidden items-center gap-1 cursor-pointer group">
              <span className="text-black/60">Sort by:</span>
              <span className="text-black font-bold">Most Popular</span>
              <ChevronDown className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[82rem] mx-auto md:px-6 flex gap-8">
        <main className="flex-1">
          <div className="flex gap-8 md:mt-26 mt-8">
            <div className="md:flex hidden">
              <SideBar />
            </div>
            <div className="flex flex-wrap md:ml-0 overflow-hidden md:-mt-24">
              <div className="flex flex-col gap-4 items-start md:ml-0 md:mr-0 mr-4 ml-5 md:mt-8 w-full">
                <h1 className="hidden md:flex text-lg md:text-3xl font-bold text-black normal-case">
                  Casual
                </h1>
                <ProductsRow name="" products={paginatedProducts} />
              </div>
              <div className="w-full flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileBar />
    </div>
  );
};

export default CategoryPage;
