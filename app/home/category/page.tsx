"use client";
import React, { useEffect, useState, useMemo } from "react";
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

const mapPostsToProducts = (posts: unknown[]): ProductType[] =>
  (posts as any[]).map((p) => {

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
    return { id, slug, name, image, rating, price, originalPrice, discount, color };
  });

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const [all, setAll] = useState<ProductType[]>([]);
  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("trending");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const itemsPerPage = 12;

  const sortedProducts = useMemo(() => {
    const sorted = [...filtered];
    if (sortBy === "low-price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-price") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "review") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "trending") {
      sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  }, [filtered, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedProducts.length);
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);


  const [availableColors, setAvailableColors] = useState<{ name: string; value: string }[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all');
      const result = await response.json();
      const products = Array.isArray(result) ? mapPostsToProducts(result) : [];
      setAll(products);
      setFiltered(products); // Initially show all

      if (products.length > 0) {
        const prices = products.map(p => p.price);
        setMinPrice(Math.floor(Math.min(...prices)));
        setMaxPrice(Math.ceil(Math.max(...prices)));

        // Extract unique colors
        const colorMap = new Map<string, string>();
        products.forEach(p => {
          if (p.color) {
            p.color.split(',').forEach(c => {
              const name = c.trim();
              if (name && !colorMap.has(name.toLowerCase())) {
                // simple mapping for common colors, otherwise use name as class if it's a valid hex or just default to gray
                colorMap.set(name.toLowerCase(), name);
              }
            });
          }
        });

        const colorList = Array.from(colorMap.values()).map(name => {
          const lower = name.toLowerCase();

          // Design palette hex codes
          const hexPalette: Record<string, string> = {
            'green': '#00C12B',
            'red': '#F50606',
            'yellow': '#F5DD06',
            'orange': '#F57906',
            'cyan': '#06CAF5',
            'blue': '#063AF5',
            'purple': '#7D06F5',
            'pink': '#F506A4',
            'white': '#FFFFFF',
            'black': '#000000',
          };

          return {
            name,
            value: hexPalette[lower] || name // Use mapped hex, or the name/hex itself
          };
        });
        setAvailableColors(colorList);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplyFilters = (filters: {
    priceRange: { min: number, max: number },
    colors: string[],
    size: string
  }) => {
    const { priceRange, colors } = filters;

    const newFiltered = all.filter(p => {
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      const productColors = p.color ? p.color.split(',').map(c => c.trim().toLowerCase()) : [];
      const matchesColor = !colors || colors.length === 0 || colors.some((c: string) => productColors.includes(c.toLowerCase()));
      return matchesPrice && matchesColor;
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
              Showing {sortedProducts.length > 0 ? startIndex + 1 : 0}-{endIndex} of {sortedProducts.length} Products

            </span>
            <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4 text-sm md:text-base">
              <button
                onClick={() => dispatch(openModal("filter"))}
                className="md:hidden p-2 bg-[#F0F0F0] rounded-full"
              >
                <SlidersHorizontal className="w-5 h-5 text-black" />
              </button>
            </div>
            <div className="relative md:flex hidden">
              <div
                className="flex items-center gap-1 cursor-pointer group"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span className="text-black/60">Sort by:</span>
                <span className="text-black font-bold">
                  {sortBy === "low-price" && "Low Price"}
                  {sortBy === "high-price" && "High Price"}
                  {sortBy === "review" && "Review"}
                  {sortBy === "trending" && "Trending"}
                </span>
                <ChevronDown className={`w-4 h-4 text-black transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </div>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
                  {[
                    { id: 'trending', label: 'Trending' },
                    { id: 'low-price', label: 'Low Price' },
                    { id: 'high-price', label: 'High Price' },
                    { id: 'review', label: 'Review' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === option.id ? 'text-black font-bold' : 'text-gray-600'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
          {/* Mobile */}
          <div className="md:hidden flex flex-col w-full px-4 pt-4 gap-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-black normal-case">
                Casual
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(openModal("filter"))}
                  className="p-2.5 bg-[#F0F0F0] rounded-full hover:bg-black/5 transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5 text-black" />
                </button>
                <div className="relative">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    <ChevronDown className={`w-5 h-5 text-black transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
                      {[
                        { id: 'trending', label: 'Trending' },
                        { id: 'low-price', label: 'Low Price' },
                        { id: 'high-price', label: 'High Price' },
                        { id: 'review', label: 'Review' },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === option.id ? 'text-black font-bold' : 'text-gray-600'
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className="text-black/60 text-xs">
              Showing {sortedProducts.length > 0 ? startIndex + 1 : 0}-{endIndex} of {sortedProducts.length} Products
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[82rem] mx-auto md:px-6 flex gap-8">
        <main className="flex-1">
          <div className="flex gap-8 md:mt-26 mt-8">
            <div className="md:flex hidden">
              <SideBar onApply={handleApplyFilters} minBoundary={minPrice} maxBoundary={maxPrice} availableColors={availableColors} />
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
      <MobileBar onApply={handleApplyFilters} minBoundary={minPrice} maxBoundary={maxPrice} availableColors={availableColors} />
    </div>
  );
};

export default CategoryPage;
