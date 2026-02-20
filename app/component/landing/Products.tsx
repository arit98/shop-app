"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ProductType } from '@/app/utils/type/landing';

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => {
                const full = i + 1 <= Math.floor(rating);
                const half = !full && i < rating;
                return (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${full || half ? 'text-yellow-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            })}
            <span className="md:text-sm text-xs text-black/60 ml-1">{rating}/5</span>
        </div>
    );
};

const ProductsRow = ({ name, products }: { name: string; products: ProductType[] }) => {
    const pathname = usePathname();
    const isCategoryPage = pathname.includes("/category");
    const [visibleCount, setVisibleCount] = useState(isCategoryPage ? 100 : 4);

    useEffect(() => {
        // Reset visible count if products change (e.g. searching/filtering)
        if (!isCategoryPage) {
            setVisibleCount(4);
        } else {
            setVisibleCount(products.length || 100);
        }
    }, [products, isCategoryPage])

    const handleViewAll = () => {
        setVisibleCount(products.length);
    };

    const displayProducts = products?.slice(0, visibleCount);

    return (
        <section className={`${pathname.includes("/home") ? "" : "pt-20"}`}>
            <div className="max-w-[1440px] mx-auto">
                {pathname.includes("/home") ? "" : <h2 className="text-4xl md:text-5xl font-black text-center mb-14 uppercase tracking-tighter">{name}</h2>}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 mb-14">
                    {displayProducts?.map((product) => (
                        <Link href={`/home/shop/men/t-shirts/${product.slug || product.id}`} key={product.id} className="flex flex-col group cursor-pointer">
                            <div className="relative aspect-[1/1.1] bg-[#F0EEED] md:rounded-[20px] rounded-md overflow-hidden mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-contain p-4 group-hover:scale-180 transition-transform duration-300 scale-150"
                                    loading="lazy"
                                />
                            </div>

                            <h3 className="text-xs md:text-xl text-center font-bold text-black mb-1 line-clamp-1">
                                {product.name}
                            </h3>

                            <div className="mb-2">
                                <StarRating rating={product.rating} />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm md:text-2xl font-bold text-black">
                                    ${product.price}
                                </span>
                                {product.originalPrice && (
                                    <span className={`${product.originalPrice == product.price ? 'hidden' : 'flex'} text-sm md:text-2xl font-bold text-black/40 line-through`}>
                                        ${product.originalPrice}
                                    </span>
                                )}
                                {product.discount && (
                                    <span className={`${product.originalPrice == product.price ? 'hidden' : 'flex'} px-3 py-1 md:scale-100 scale-70 md:translate-0 -translate-x-2 bg-red-100 text-[#FF3333] text-xs font-medium rounded-full`}>
                                        {product.discount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {products.length > visibleCount && (
                    <div className="flex justify-center mb-16">
                        <button
                            onClick={handleViewAll}
                            className="px-14 py-4 border border-black/10 rounded-full text-black font-medium hover:bg-black hover:text-white transition-all w-full md:w-fit cursor-pointer"
                        >
                            View All
                        </button>
                    </div>
                )}

                <div className="w-full h-px bg-black/10"></div>
            </div>
        </section >
    );
};

export default ProductsRow;
