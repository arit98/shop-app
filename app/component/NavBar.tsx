"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CircleUserRound, ShoppingCart, Menu, X, ChevronDown, Search } from 'lucide-react';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="sticky top-0 left-0 w-full bg-white text-slate-900 py-5 px-4 md:px-32 flex items-center justify-between gap-4 md:gap-10 z-101">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <button className="md:hidden p-1" onClick={() => setIsMenuOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
                <Link href="/" className="text-2xl md:text-3xl text-slate-900 font-extrabold tracking-tighter uppercase">
                    SHOP.CO
                </Link>
            </div>

            {/* Nav Links */}
            <ul className="hidden md:flex items-center gap-6 text-base whitespace-nowrap">
                <li>
                    <Link href="/home/category" className="flex items-center gap-1 hover:opacity-70 transition-opacity">
                        Shop
                        <ChevronDown className="w-4 h-4" />
                    </Link>
                </li>
                <li><Link href="/on-sale" className="hover:opacity-70 transition-opacity">On Sale</Link></li>
                <li><Link href="/new-arrivals" className="hover:opacity-70 transition-opacity">New Arrivals</Link></li>
                <li><Link href="/brands" className="hover:opacity-70 transition-opacity">Brands</Link></li>
            </ul>

            {/* Search Input */}
            <div className="hidden md:flex flex-1 max-w-[600px] relative items-center">
                <div className="absolute left-4 text-gray-500">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full bg-[#F0F0F0] rounded-full py-3 pl-12 pr-4 outline-none text-sm placeholder:text-gray-500"
                />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
                <button className="md:hidden p-1">
                    <Search className="w-6 h-6" />
                </button>
                <Link href="/home/cart" className="p-1 hover:opacity-70 transition-opacity">
                    <ShoppingCart />
                </Link>
                <Link href="/profile" className="p-1 hover:opacity-70 transition-opacity">
                    <CircleUserRound />
                </Link>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsMenuOpen(false)}>
                    <div className="fixed top-0 left-0 w-[80%] max-w-[300px] h-full bg-white p-6 shadow-xl transition-transform" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/" className="text-2xl font-extrabold tracking-tighter uppercase" onClick={() => setIsMenuOpen(false)}>
                                SHOP.CO
                            </Link>
                            <button onClick={() => setIsMenuOpen(false)} className="p-1">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            <Link href="/home/category" className="bg-transparent text-lg font-medium hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                                Shop
                            </Link>
                            <Link href="/on-sale" className="text-lg font-medium hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                                On Sale
                            </Link>
                            <Link href="/new-arrivals" className="text-lg font-medium hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                                New Arrivals
                            </Link>
                            <Link href="/brands" className="text-lg font-medium hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                                Brands
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;