"use client";

import React, { useState } from 'react';
import { Star, Settings2, ChevronDown, MoreHorizontal, Check } from 'lucide-react';

const Reviews = () => {
    const [activeTab, setActiveTab] = useState('Rating & Reviews');

    const tabs = ['Product Details', 'Rating & Reviews', 'FAQs'];

    const reviews = [
        {
            rating: 5,
            name: "Samantha D.",
            verified: true,
            text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
            date: "August 14, 2023"
        },
        {
            rating: 5,
            name: "Alex M.",
            verified: true,
            text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
            date: "August 15, 2023"
        },
        {
            rating: 4.5,
            name: "Ethan R.",
            verified: true,
            text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
            date: "August 16, 2023"
        },
        {
            rating: 5,
            name: "Olivia P.",
            verified: true,
            text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
            date: "August 17, 2023"
        },
        {
            rating: 4,
            name: "Liam K.",
            verified: true,
            text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
            date: "August 18, 2023"
        },
        {
            rating: 5,
            name: "Ava H.",
            verified: true,
            text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
            date: "August 19, 2023"
        }
    ];

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-[#FFC633] text-[#FFC633]' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="mt-16">
            {/* Tabs */}
            <div className="flex border-b border-black/10 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 text-lg font-medium transition-all relative ${activeTab === tab ? 'text-black' : 'text-black/60 hover:text-black'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>
                        )}
                    </button>
                ))}
            </div>

            {activeTab === 'Rating & Reviews' ? (
                <>
                    {/* Header section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">All Reviews</h2>
                            <span className="text-black/60 font-medium">(451)</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-[#F0F0F0] rounded-full hover:bg-black/5 transition-all">
                                <Settings2 className="w-5 h-5" />
                            </button>
                            <button className="flex items-center gap-2 bg-[#F0F0F0] px-5 py-3 rounded-full font-medium hover:bg-black/5 transition-all">
                                Latest
                                <ChevronDown className="w-5 h-5" />
                            </button>
                            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-black/90 transition-all">
                                Write a Review
                            </button>
                        </div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {reviews.map((review, idx) => (
                            <div key={idx} className="border border-black/10 rounded-[20px] p-7 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    {renderStars(review.rating)}
                                    <button className="text-black/40 hover:text-black transition-all">
                                        <MoreHorizontal className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold">{review.name}</span>
                                    {review.verified && (
                                        <div className="bg-[#01AB31] rounded-full p-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>

                                <p className="text-black/60 leading-relaxed">
                                    "{review.text}"
                                </p>

                                <p className="mt-auto text-black/60 font-medium">
                                    Posted on {review.date}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="mt-12 flex justify-center">
                        <button className="px-10 py-4 border border-black/10 rounded-full font-medium hover:bg-black/5 transition-all text-black">
                            Load More Reviews
                        </button>
                    </div>
                </>
            ) : (
                <div className="py-20 text-center text-black/60 border border-dashed border-black/10 rounded-[20px]">
                    {activeTab} content coming soon...
                </div>
            )}
        </div>
    );
};

export default Reviews;
