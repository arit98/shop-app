"use client";

import { X } from 'lucide-react';
import React, { useState } from 'react';

const OfferBar = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="related top-0 left-0 w-full bg-black text-white py-3 px-4 flex items-center justify-center transition-all duration-300 z-102">
            <div className="text-center text-[10px] sm:text-sm font-extralight tracking-wide">
                Sign up and get 20% off to your first order.{" "}
                <a
                    href="/signup"
                    className="font-semibold underline hover:text-white/80 transition-colors cursor-pointer"
                >
                    Sign Up Now
                </a>
            </div>
            <div className='md:flex hidden items-center'>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 text-white hover:text-white/80 transition-all p-1"
                aria-label="Close offer bar"
            >
                <X />
            </button>
            </div>
        </div>
    );
};

export default OfferBar;