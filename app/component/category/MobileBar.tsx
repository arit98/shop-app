"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronUp, Check, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { closeModal } from '@/app/store/modalSlice';

const MobileBar = () => {
    const [selectedColor, setSelectedColor] = useState('bg-[#063AF5]');
    const [selectedSize, setSelectedSize] = useState('Large');
    const [priceRange, setPriceRange] = useState({ min: 50, max: 200 });
    const dispatch = useAppDispatch();

    const { isOpen, modalType } = useAppSelector((state) => state.modal);

    if (!isOpen || modalType !== 'filter') return null;


    const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];

    // Curated color palette from the design
    const colors = [
        'bg-[#00C12B]', 'bg-[#F50606]', 'bg-[#F5DD06]', 'bg-[#F57906]',
        'bg-[#06CAF5]', 'bg-[#063AF5]', 'bg-[#7D06F5]', 'bg-[#F506A4]',
        'bg-white border border-black/10', 'bg-black'
    ];

    const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
    const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

    return (
        <div className="fixed inset-0 z-[100] md:hidden translate-y-18">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => dispatch(closeModal())}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 h-[90vh] bg-white rounded-t-[20px] p-5 overflow-y-auto transition-transform">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-black/10">
                    <h3 className="text-xl font-bold text-black">Filters</h3>
                    <X onClick={() => dispatch(closeModal())} className="w-6 h-6 text-black/40 cursor-pointer" />
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-black/10 text-black/60">
                    {categories.map((cat) => (
                        <div key={cat} className="flex items-center justify-between cursor-pointer hover:text-black transition-colors group">
                            <span className="text-base">{cat}</span>
                            <ChevronRight className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
                        </div>
                    ))}
                </div>

                {/* Price Filter */}
                <div className="mb-6 pb-6 border-b border-black/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-black">Price</h3>
                        <ChevronUp className="w-5 h-5 text-black" />
                    </div>
                    <div className="px-2">
                        <div className="relative w-full h-1.5 bg-[#F0F0F0] rounded-full mt-6 mb-4">
                            <div
                                className="absolute h-full bg-black rounded-full"
                                style={{ left: '20%', right: '30%' }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full border-[3px] border-white shadow-sm cursor-pointer"
                                style={{ left: '20%' }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full border-[3px] border-white shadow-sm cursor-pointer"
                                style={{ right: '30%' }}
                            />
                        </div>
                        <div className="flex justify-between text-sm font-medium text-black">
                            <span>${priceRange.min}</span>
                            <span>${priceRange.max}</span>
                        </div>
                    </div>
                </div>

                {/* Colors */}
                <div className="mb-6 pb-6 border-b border-black/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-black">Colors</h3>
                        <ChevronUp className="w-5 h-5 text-black" />
                    </div>
                    <div className="grid grid-cols-5 gap-y-3 gap-x-2">
                        {colors.map((color, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedColor(color)}
                                className={`relative w-9 h-9 rounded-full ${color} cursor-pointer hover:scale-110 transition-all flex items-center justify-center`}
                            >
                                {selectedColor === color && (
                                    <Check className={`w-4 h-4 ${color === 'bg-white border border-black/10' ? 'text-black' : 'text-white'}`} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sizes */}
                <div className="mb-6 pb-6 border-b border-black/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-black">Size</h3>
                        <ChevronUp className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-5 py-2.5 rounded-full text-sm transition-all cursor-pointer ${selectedSize === size
                                    ? 'bg-black text-white'
                                    : 'bg-[#F0F0F0] text-black/60 hover:bg-black/5'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dress Style */}
                <div className="mb-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-black">Dress Style</h3>
                        <ChevronUp className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex flex-col gap-4 text-black/60">
                        {dressStyles.map((style) => (
                            <div key={style} className="flex items-center justify-between cursor-pointer hover:text-black transition-colors group">
                                <span className="text-base">{style}</span>
                                <ChevronRight className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Apply Button */}
                <button
                    onClick={() => dispatch(closeModal())}
                    className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all cursor-pointer active:scale-[0.98] mb-4"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default MobileBar;
