import React from 'react';

const brands = [
    { name: 'VERSACE', className: 'font-serif tracking-tighter' },
    { name: 'ZARA', className: 'font-serif font-black tracking-tighter' },
    { name: 'GUCCI', className: 'font-serif tracking-widest' },
    { name: 'PRADA', className: 'font-serif font-bold tracking-normal' },
    { name: 'Calvin Klein', className: 'font-sans font-medium tracking-tight' },
];

const AdBar = () => {
    return (
        <div className="bg-black py-8 md:py-12 overflow-hidden w-full select-none">
            <div className="flex animate-marquee whitespace-nowrap">
                {/* brands row 1 */}
                <div className="flex shrink-0 items-center justify-around gap-16 md:gap-32 px-8 min-w-full">
                    {brands.map((brand, index) => (
                        <span
                            key={`brand-1-${index}`}
                            className={`text-white text-2xl md:text-5xl uppercase ${brand.className}`}
                        >
                            {brand.name}
                        </span>
                    ))}
                </div>

                {/* brands row 2 */}
                <div className="flex shrink-0 items-center justify-around gap-16 md:gap-32 px-8 min-w-full">
                    {brands.map((brand, index) => (
                        <span
                            key={`brand-2-${index}`}
                            className={`text-white text-2xl md:text-5xl uppercase ${brand.className}`}
                        >
                            {brand.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdBar;
