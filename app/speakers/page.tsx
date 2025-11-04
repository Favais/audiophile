import React from 'react'
import About from '../components/About'
import CategoryCard from '../components/CategoryCard'
import Title from '../components/Title'
import data from '@/public/assets/db.json'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
    const speakers = data.data.filter(
        (product) => product.category === 'speakers'
    );
    return (
        <div>
            <Title title='Speakers' />
            {/* Product Section 1 - ZX9 Speaker */}

            {speakers.map((product, index) => {

                return (
                    <div key={product.id} className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-40">
                        <div className="max-w-7xl w-full">
                            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
                                {/* Product Image */}
                                <div className={`relative bg-[#F1F1F1] rounded-lg overflow-hidden flex items-center justify-center p-8 lg:p-12 min-h-[400px] lg:min-h-[560px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="relative z-10">
                                        <Image
                                            src={product.image.desktop}
                                            alt="XX99 Mark II Headphones"
                                            className="w-full max-w-[349px] h-auto object-contain"
                                            width={349}
                                            height={400}
                                        />
                                    </div>
                                    {/* Shadow effect */}
                                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[262px] h-[56px] bg-black/15 rounded-full blur-[22px]" />
                                </div>

                                {/* Product Content */}
                                <div className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left py-8 lg:py-0">
                                    {/* New Product Label */}
                                    {product.new && (
                                        <div className="text-[#D87D4A] text-sm font-normal tracking-[10px] uppercase">
                                            New Product
                                        </div>
                                    )}

                                    {/* Product Title */}
                                    <h1 className="text-4xl sm:text-5xl lg:text-[40px] font-bold leading-[1.1] tracking-[1.43px] uppercase text-black">
                                        {product.name} <br /> Speakers
                                    </h1>

                                    {/* Product Description */}
                                    <p className="text-[15px] leading-[25px] text-black/50 max-w-[445px] mx-auto lg:mx-0">
                                        {product.description}
                                    </p>

                                    {/* CTA Button */}
                                    <div>
                                        <Link href={`/${product.category}/${product.slug}`} className="bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 hover:bg-[#FBAF85] transition-colors duration-200">
                                            See Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}


            <section className="py-20 lg:py-40 lg:px-40 px-6">
                <div className="max-w-content mx-auto px-6 lg:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <CategoryCard
                            title="Headphones"
                            image="https://api.builder.io/api/v1/image/assets/TEMP/b33ecd18a0a96dab2f11ab7d1ee6bf2fcb9e5498?width=246"
                            link="/headphones"
                        />
                        <CategoryCard
                            title="Speakers"
                            image="https://api.builder.io/api/v1/image/assets/TEMP/2812c7e7d3a21b48fce4e9f74a3751ec2ba640c6?width=243"
                            link="/speakers"
                        />
                        <CategoryCard
                            title="Earphones"
                            image="https://api.builder.io/api/v1/image/assets/TEMP/d620599a697ca9d9223d19f656ac4a66034c030c?width=356"
                            link="/earphones"
                        />
                    </div>
                </div>
            </section>
            <About />
        </div>
    )
}

export default page