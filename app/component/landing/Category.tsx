import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        title: "Casual",
        image: "/assets/category/casual.png",
        className: "md:col-span-4",
        imgClass: "object-right-top scale-[1.8] md:scale-[1.65] md:translate-x-1 rotate-y-180 -translate-y-4 group-hover:translate-y-4",
        href: "/home/category"
    },
    {
        title: "Formal",
        image: "/assets/category/formal.png",
        className: "md:col-span-8",
        imgClass: "object-right-top scale-[1.3] md:scale-[2.3] translate-x-10 md:-translate-x-12 translate-y-19",
        href: "/home/category"
    },
    {
        title: "Party",
        image: "/assets/category/party.png",
        className: "md:col-span-8",
        imgClass: "object-right-top scale-[1.3] md:scale-[1.5] translate-x-10 md:-translate-x-32",
        href: "/home/category"
    },
    {
        title: "Gym",
        image: "/assets/category/gym.png",
        className: "md:col-span-4",
        imgClass: "object-right-top scale-[1.8] md:scale-[1.65] translate-x-10 md:-translate-x-16 -translate-y-0",
        href: "/home/category"
    },
];

const Category = () => {
    return (
        <section className="px-4 md:px-20 py-10 bg-white">
            <div className="bg-[#F0F0F0] rounded-[24px] md:rounded-[40px] p-6 md:p-16">
                <h2 className="text-3xl md:text-[48px] font-black text-center mb-8 md:mb-16 uppercase tracking-tight text-black">
                    BROWSE BY DRESS STYLE
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            href={cat.href}
                            className={`${cat.className} relative bg-white rounded-[20px] overflow-hidden group h-[190px] md:h-[289px] cursor-pointer block`}
                        >
                            <div className="absolute top-6 left-6 md:top-8 md:left-9 z-10">
                                <h3 className="text-2xl md:text-[32px] font-bold text-black">
                                    {cat.title}
                                </h3>
                            </div>
                            <Image
                                src={cat.image}
                                alt={`${cat.title} Style`}
                                fill
                                className={`object-contain transition-transform duration-500 group-hover:scale-105 ${cat.imgClass}`}
                                priority={index < 2}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
