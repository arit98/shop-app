"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronUp, Check, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { closeModal } from '@/app/store/modalSlice';

interface MobileBarProps {
    onApply?: (filters: any) => void;
    minBoundary?: number;
    maxBoundary?: number;
}

const MobileBar = ({ onApply, minBoundary = 0, maxBoundary = 10000 }: MobileBarProps) => {
    const [selectedColor, setSelectedColor] = useState('bg-[#063AF5]');
    const [selectedSize, setSelectedSize] = useState('Large');
    const [priceRange, setPriceRange] = useState({ min: minBoundary, max: maxBoundary });
    const dispatch = useAppDispatch();

    // Sync price range if boundaries change (e.g. data loaded)
    useEffect(() => {
        setPriceRange({ min: minBoundary, max: maxBoundary });
    }, [minBoundary, maxBoundary]);

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

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = parseInt(e.target.value);
        const step = (maxBoundary - minBoundary) / 100 || 1;
        if (type === 'min') {
            setPriceRange(prev => ({ ...prev, min: Math.min(value, prev.max - step) }));
        } else {
            setPriceRange(prev => ({ ...prev, max: Math.max(value, prev.min + step) }));
        }
    };

    const handleApply = () => {
        if (onApply) {
            onApply({
                priceRange,
                color: selectedColor,
                size: selectedSize,
            });
        }
        dispatch(closeModal());
    };

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
                    <div className="px-2 pb-4">
                        <div className="relative w-full h-1.5 bg-[#F0F0F0] rounded-full mt-8 mb-6">
                            <div
                                className="absolute h-full bg-black rounded-full"
                                style={{
                                    left: `${((priceRange.min - minBoundary) / (maxBoundary - minBoundary)) * 100}%`,
                                    right: `${100 - ((priceRange.max - minBoundary) / (maxBoundary - minBoundary)) * 100}%`
                                }}
                            />
                            <input
                                type="range"
                                min={minBoundary}
                                max={maxBoundary}
                                value={priceRange.min}
                                onChange={(e) => handlePriceChange(e, 'min')}
                                className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md cursor-pointer top-0"
                                style={{ zIndex: priceRange.min > (maxBoundary + minBoundary) / 2 ? 5 : 4 }}
                            />
                            <input
                                type="range"
                                min={minBoundary}
                                max={maxBoundary}
                                value={priceRange.max}
                                onChange={(e) => handlePriceChange(e, 'max')}
                                className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md cursor-pointer top-0"
                                style={{ zIndex: priceRange.max < (maxBoundary + minBoundary) / 2 ? 5 : 4 }}
                            />
                        </div>
                        <div className="flex justify-between text-sm font-medium text-black mt-2">
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
                    onClick={handleApply}
                    className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all cursor-pointer active:scale-[0.98] mb-4"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default MobileBar;
