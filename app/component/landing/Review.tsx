"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";

interface ReviewItem {
    id: number;
    name: string;
    review: string;
    rating: number;
    verified: boolean;
}

const reviews: ReviewItem[] = [
    {
        id: 1,
        name: "Sarah M.",
        review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
        rating: 5,
        verified: true,
    },
    {
        id: 2,
        name: "Alex K.",
        review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
        rating: 5,
        verified: true,
    },
    {
        id: 3,
        name: "James L.",
        review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
        rating: 5,
        verified: true,
    },
    {
        id: 4,
        name: "Mooen K.",
        review: "The quality of the fabric and the fit of the clothes are just perfect. I've recommended Shop.co to all my friends, and they've all had similar positive experiences. Truly a gem!",
        rating: 5,
        verified: true,
    },
    {
        id: 5,
        name: "Sam L.",
        review: "I was hesitant to buy clothes online, but Shop.co has changed my mind. The sizing guide is accurate, and the delivery was fast. I'm very happy with my purchase.",
        rating: 5,
        verified: true,
    },
];

const Review = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth > 768 ? 420 : 350;

            let targetScroll = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            // Endless logic: If we hit the end, loop back to start/end
            if (direction === "right" && scrollLeft + clientWidth >= scrollWidth - 10) {
                targetScroll = 0;
            } else if (direction === "left" && scrollLeft <= 10) {
                targetScroll = scrollWidth;
            }

            scrollRef.current.scrollTo({
                left: targetScroll,
                behavior: "smooth",
            });
        }
    };

    // Duplicate reviews multiple times to ensure we always have content to scroll to for the 'endless' feel
    const displayReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

    return (
        <section className="px-4 md:px-20 py-10 md:py-20 bg-white overflow-hidden md:mb-0 mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
                <h2 className="text-3xl md:text-[48px] font-black uppercase tracking-tight text-black flex-1">
                    OUR HAPPY CUSTOMERS
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => scroll("left")}
                        className="p-3 border border-black/10 hover:bg-black hover:text-white rounded-full transition-all group cursor-pointer active:scale-95"
                        aria-label="Previous reviews"
                    >
                        <ArrowLeft className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-3 border border-black/10 hover:bg-black hover:text-white rounded-full transition-all group cursor-pointer active:scale-95"
                        aria-label="Next reviews"
                    >
                        <ArrowRight className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden -mx-4 md:-mx-20 px-4 md:px-20">
                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-6 snap-x scroll-smooth"
                >
                    {displayReviews.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="min-w-[280px] md:min-w-[400px] bg-white border border-black/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-3 md:gap-4 transition-all hover:border-black/20 snap-start"
                        >
                            <div className="flex gap-1.5">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[#FFC633] text-[#FFC633]" />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg md:text-xl font-bold text-black">{item.name}</span>
                                {item.verified && (
                                    <div className="bg-[#01AB31] rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                    </div>
                                )}
                            </div>
                            <p className="text-[15px] md:text-base text-black/60 leading-relaxed font-medium">
                                &quot;{item.review}&quot;
                            </p>
                        </div>
                    ))}
                </div>

                {/* Visual Gradient Fades */}
                <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none z-10 hidden md:block" />
                <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-white via-white/80 to-transparent pointer-events-none z-10 hidden md:block" />
            </div>
        </section>
    );
};

export default Review;
