import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
  const route = useRouter();
  return (
    <>
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col z-10 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter uppercase mb-4 text-black">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          <p className="text-sm md:text-base text-black/60 mb-8 max-w-[545px]">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>

          <button onClick={()=>route.push("/home/category")} className="bg-black text-white px-14 py-4 rounded-full w-full md:w-fit font-medium text-base hover:bg-black/90 transition-all mb-12 cursor-pointer">
            Shop Now
          </button>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-8 md:gap-10 lg:gap-14">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-black">200+</span>
              <span className="text-xs md:text-sm text-black/60">International Brands</span>
            </div>
            <div className="w-[1px] h-12 bg-black/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-black">2,000+</span>
              <span className="text-xs md:text-sm text-black/60">High-Quality Products</span>
            </div>
            <div className="w-[1px] h-12 bg-black/10 hidden lg:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-black">30,000+</span>
              <span className="text-xs md:text-sm text-black/60">Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-end justify-center">
          {/* Decorative Stars */}
          <div className="absolute top-10 right-0 md:-right-4 animate-pulse">
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M52 0.5C52 28.9427 75.0573 52 103.5 52C75.0573 52 52 75.0573 52 103.5C52 75.0573 28.9427 52 0.500001 52C28.9427 52 52 28.9427 52 0.5Z" fill="black" />
            </svg>
          </div>
          <div className="absolute top-1/2 left-4 md:left-10 scale-50 md:scale-75 opacity-80">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 0.5C28 15.6878 40.3122 28 55.5 28C40.3122 28 28 40.3122 28 55.5C28 40.3122 15.6878 28 0.500001 28C15.6878 28 28 15.6878 28 0.5Z" fill="black" />
            </svg>
          </div>

          <Image
            src="/assets/hero.png"
            alt="Hero Fashion"
            fill
            className="object-contain object-bottom select-none"
            priority
          />
        </div>
    </>
  )
}

export default HeroSection