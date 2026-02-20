import { Mail } from 'lucide-react'
import React from 'react'

const NewsLetter = () => {
    return (
        <section className="px-4 md:px-20 -mb-20 relative z-20">
            <div className="bg-black rounded-[20px] md:rounded-[40px] px-6 py-9 md:px-16 md:py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <h2 className="text-white text-2xl md:text-3xl md:text-[44px] font-black leading-[1.1] max-w-[560px] uppercase tracking-tight">
                    STAY UPTO DATE ABOUT <br className="hidden md:block" /> OUR LATEST OFFERS
                </h2>

                <div className="flex flex-col gap-3.5 w-full md:w-[350px]">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full bg-white rounded-full py-3.5 pl-12 pr-4 text-black focus:outline-none placeholder:text-gray-400 text-[16px]"
                        />
                    </div>
                    <button className="w-full bg-white text-black font-semibold py-3.5 rounded-full hover:bg-gray-100 transition-colors text-[16px]">
                        Subscribe to Newsletter
                    </button>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter