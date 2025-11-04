import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const CategoryCard = ({ title, image, link }: {
    title: string;
    image: string;
    link: string;
}) => {
    return (
        <div className="bg-brand-light-gray rounded-lg overflow-hidden pt-20 pb-6 px-6 text-center relative group">
            <div className="mb-8 relative">
                <div className="absolute inset-x-0 bottom-0 h-4 bg-black/5 blur-xl rounded-full transform scale-75" />
                <img
                    src={image}
                    alt={title}
                    className="w-32 h-40 mx-auto object-contain relative z-10"
                />
            </div>

            <h3 className="text-black text-[18px] font-bold tracking-[1.286px] uppercase mb-4">
                {title}
            </h3>

            <Link
                href={link}
                className="inline-flex items-center gap-3 text-black/50 hover:text-brand-orange text-[13px] font-bold tracking-[1px] uppercase transition-colors group"
            >
                Shop
                <ChevronRight className="w-4 h-4 text-brand-orange" strokeWidth={3} />
            </Link>
        </div>)
}

export default CategoryCard