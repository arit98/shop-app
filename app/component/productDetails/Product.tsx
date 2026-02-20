"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, StarHalf, Plus, Minus, ChevronRight } from 'lucide-react';

import { allProducts } from '@/app/utils/data';

const Product = ({ id }: { id: string }) => {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('Large');
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const colors = product?.colors || [];

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            colorCode: colors.find((c: any) => c.name === selectedColor)?.value || 'black'
        };

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = existingCart.findIndex((item: any) =>
            item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
        );

        if (existingItemIndex > -1) {
            existingCart[existingItemIndex].quantity += quantity;
        } else {
            existingCart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));

        // update cart count
        window.dispatchEvent(new Event('cartUpdated'));

        alert("Added to cart!");
    };

    React.useEffect(() => {
        const fetchProduct = async () => {
            const numericId = parseInt(id, 10);
            const localProduct = !isNaN(numericId) ? allProducts.find(p => p.id === numericId) : allProducts.find(p => p.slug === id);

            if (localProduct) {
                const mappedLocal = {
                    ...localProduct,
                    images: localProduct.images || [localProduct.image],
                    colors: (localProduct as any).colors || []
                };
                setProduct(mappedLocal);
                if (mappedLocal.colors.length > 0) {
                    setSelectedColor(mappedLocal.colors[0].name);
                }
                setLoading(false);
            } else {
                try {
                    // api call
                    const response = await fetch(`/api/product/${id}`);
                    const data = await response.json();
                    if (data && !data.error) {
                        const content = data.content?.rendered || "";
                        const images = (Array.from(content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) as any[]).map(match => match[1]);

                        const excerpt = (data.excerpt?.rendered || "").replace(/<[^>]+>/g, "").trim();
                        const parts = excerpt.split(/\s+/);
                        const rating = parseFloat(parts[0]);
                        const price = parseFloat(parts[1]);
                        const originalPrice = parseFloat(parts[2]);
                        const discount = parseFloat(parts[3]);
                        const colorsStr = parts[4] || "";

                        const mapped: any = {
                            id: data.id,
                            name: (data.title?.rendered || "")
                                .replace(/<[^>]+>/g, "")
                                .replace(/&#8217;/g, "'")
                                .replace(/&amp;/g, "&")
                                .trim(),
                            image: images[0] || "",
                            images: images.length > 0 ? images : [""],
                            rating: rating || 4.5,
                            price: price || 210,
                            originalPrice: originalPrice || price || 210,
                            discount: discount ? `-${discount}%` : "0%",
                            colors: colorsStr ? colorsStr.split(',').map((c: string) => {
                                const clean = c.trim();
                                return {
                                    name: clean,
                                    value: clean
                                };
                            }) : []
                        };
                        setProduct(mapped);
                        if (mapped.colors.length > 0) {
                            setSelectedColor(mapped.colors[0].name);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product Not Found</div>;

    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

    // rating stars
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<Star key={i} className="w-4 h-4 fill-[#FFC633] text-[#FFC633]" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(<StarHalf key={i} className="w-4 h-4 fill-[#FFC633] text-[#FFC633]" />);
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-[#FFC633]" />);
            }
        }
        return stars;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* product images */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* thumbnails */}
                <div className="flex flex-row md:flex-col gap-8">
                    {(product.images || [product.image]).map((img: string, idx: number) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-[100px] h-[100px] md:w-[152px] md:h-[167px] bg-[#F0EEED] rounded-[20px] p-2 cursor-pointer flex items-center justify-center border overflow-hidden ${idx === currentImageIndex ? 'border-black' : 'border-transparent'}`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
                {/* main image */}
                <div className="flex-1 bg-[#F0EEED] rounded-[20px] p-4 flex items-center justify-center">
                    <Image
                        src={product.images ? product.images[currentImageIndex] : product.image}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="object-contain w-full h-full"
                    />
                </div>
            </div>

            {/* product details */}
            <div className="flex flex-col">
                <h1 className="text-4xl font-black uppercase mb-4 tracking-tight">{product.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm font-medium">{product.rating}/<span className="text-black/60">5</span></span>
                </div>

                <div className="flex items-center gap-4 mb-5">
                    <span className="text-3xl font-bold">${product.price}</span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                        <>
                            <span className="text-3xl font-bold text-black/30 line-through">${product.originalPrice}</span>
                            <div className="bg-[#FF3333]/10 text-[#FF3333] px-3 py-1 rounded-full text-sm font-medium">
                                {product.discount}
                            </div>
                        </>
                    )}
                </div>

                <p className="text-black/60 mb-6 leading-relaxed">
                    This {product.name.toLowerCase()} is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. (Product ID: {id})
                </p>

                <div className="border-t border-black/10 py-6">
                    <p className="text-black/60 mb-4">Select Colors</p>
                    <div className="flex gap-4">
                        {colors.map((color: any) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                style={{ backgroundColor: color.value || color.name }}
                                className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${selectedColor === color.name ? 'ring-1 ring-offset-2 ring-black' : ''}`}
                            >
                                {selectedColor === color.name && (
                                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6667 1L5.5 10.1667L1.33334 6" stroke={color.name.toLowerCase() === '#ffffff' || color.name.toLowerCase() === 'white' ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-black/10 py-6">
                    <p className="text-black/60 mb-4">Choose Size</p>
                    <div className="flex flex-wrap gap-3">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-6 py-3 rounded-full text-base transition-all ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-black/60 hover:bg-black/10'}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-black/10 py-6 flex items-center gap-5">
                    <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-5 py-3 w-[170px]">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="cursor-pointer">
                            <Minus className="w-5 h-5" />
                        </button>
                        <span className="font-semibold">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="cursor-pointer">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white rounded-full py-4 font-medium hover:bg-black/90 transition-all cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product