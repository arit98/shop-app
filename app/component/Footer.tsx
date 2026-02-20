import { Facebook, Github, Instagram, Twitter } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import NewsLetter from './landing/NewsLetter'
import { RiVisaLine } from 'react-icons/ri'
import { SiMastercard } from 'react-icons/si'
import { FaApplePay, FaGooglePay } from 'react-icons/fa'

const footerLinks = [
    {
        title: "COMPANY",
        links: ["About", "Features", "Works", "Career"]
    },
    {
        title: "HELP",
        links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"]
    },
    {
        title: "FAQ",
        links: ["Account", "Manage Deliveries", "Orders", "Payments"]
    },
    {
        title: "RESOURCES",
        links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"]
    }
]

const Footer = () => {
    return (
        <footer className="relative mt-40">
            {/* Newsletter section positioned to overlap */}
            <div className="absolute top-0 left-0 w-full -translate-y-[80%]">
                <NewsLetter />
            </div>

            <div className="bg-[#F0F0F0] pt-40 pb-10 px-4 md:px-20">
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-black/10">
                        {/* Brand Section */}
                        <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
                            <h2 className="text-3xl md:text-[32px] font-black tracking-tighter">SHOP.CO</h2>
                            <p className="text-black/60 text-sm md:text-[16px] leading-relaxed max-w-[250px]">
                                We have clothes that suits your style and which you're proud to wear. From women to men.
                            </p>
                            <div className="flex gap-3">
                                {[Twitter, Facebook, Instagram, Github].map((Icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all group"
                                    >
                                        <Icon size={16} className="text-black group-hover:text-white" fill={index === 1 ? "currentColor" : "none"} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links Sections */}
                        {footerLinks.map((section, index) => (
                            <div key={index} className="col-span-1">
                                <h3 className="text-[16px] font-medium tracking-[3px] mb-6">{section.title}</h3>
                                <ul className="flex flex-col gap-4">
                                    {section.links.map((link, lIndex) => (
                                        <li key={lIndex}>
                                            <a href="#" className="text-black/60 hover:text-black transition-colors text-sm md:text-[16px]">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-black/60 text-sm">
                            Shop.co © 2000-2023, All Rights Reserved
                        </p>
                        <div className="flex gap-3">
                            {/* Placeholder Payment Icons */}
                            <div className="bg-white px-3 py-1 h-fit rounded-md border border-neutral-200">
                                <RiVisaLine className='text-blue-700 scale-150' />
                            </div>
                            <div className="bg-white px-2 py-1 h-6 rounded-md border border-neutral-200 flex items-center">
                                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                                <div className='w-3 h-3 rounded-full bg-yellow-500 -ml-[2px]'></div>
                            </div>
                            <div className="bg-white px-3 py-1 h-6 rounded-md border border-neutral-200 flex items-center">
                                <span className="text-blue-500 font-bold italic text-[6px] flex items-center scale-140"><p className='text-blue-700'>Pay</p>Pal</span>
                            </div>
                            <div className="bg-white px-3 py-1 h-fit rounded-md border border-neutral-200">
                                <FaApplePay className='scale-150' />
                            </div>
                            <div className="bg-white px-3 py-1 rounded-md border border-neutral-200">
                                <FaGooglePay className='scale-160' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
