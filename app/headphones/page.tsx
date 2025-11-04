import Link from 'next/link'
import React from 'react'
import Title from '../components/Title'
import data from '@/public/assets/db.json'
import Image from 'next/image'

const page = () => {
    const headphones = data.data.filter(
        (product) => product.category === 'headphones'
    );

    return (
        <div>
            <Title title="Headphones" />
            {headphones.map((product, index) => {
                console.log(index & 1);

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
                                        {product.name} <br /> Headphones
                                    </h1>

                                    {/* Product Description */}
                                    <p className="text-[15px] leading-[25px] text-black/50 max-w-[445px] mx-auto lg:mx-0">
                                        {product.description}
                                    </p>

                                    {/* CTA Button */}
                                    <div>
                                        <Link href={`/headphones/${product.slug}`} className="bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 hover:bg-[#FBAF85] transition-colors duration-200">
                                            See Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {/* <section className="py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[125px] items-center">
                    <div className="bg-[#F1F1F1] rounded-lg aspect-square flex items-center justify-center relative overflow-hidden">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/de4fcf761a20fd2628fa107222c46befa346b876?width=698"
                            alt="XX99 Mark II Headphones"
                            className="w-[70%] h-auto object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                        <p className="text-brand text-sm font-normal tracking-[10px] uppercase">
                            New Product
                        </p>
                        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold leading-[1.1] tracking-[1.43px] uppercase">
                            XX99 Mark II<br />Headphones
                        </h2>
                        <p className="text-[15px] leading-[25px] text-black/50 max-w-[445px]">
                            The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.
                        </p>
                        <div>
                            <Link href="/headphones/xx99-mark-ii" className="bg-brand hover:bg-[#FBAF85] transition-colors text-white font-bold text-[13px] tracking-[1px] uppercase px-8 py-[15px]">
                                See Product
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Category Cards */}
            <section className="py-12 md:py-16 lg:py-20 px-6 lg:px-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[30px]">
                    {/* Headphones */}
                    <div className="relative bg-[#F1F1F1] rounded-lg pt-[88px] pb-[22px] px-6 text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[35%] w-[123px] h-[160px] flex items-center justify-center">
                            <img
                                src="https://api.builder.io/api/v1/image/assets/TEMP/b33ecd18a0a96dab2f11ab7d1ee6bf2fcb9e5498?width=246"
                                alt="Headphones"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h3 className="text-[18px] font-bold tracking-[1.29px] uppercase mb-4">
                            Headphones
                        </h3>
                        <Link href="/category/headphones" className="inline-flex items-center gap-3 text-[13px] font-bold tracking-[1px] uppercase text-black/50 hover:text-brand transition-colors group">
                            <span>Shop</span>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.707108 0.707153L5.70711 5.70715L0.707108 10.7072" stroke="currentColor" strokeWidth="2" className="stroke-brand" />
                            </svg>
                        </Link>
                    </div>

                    {/* Speakers */}
                    <div className="relative bg-[#F1F1F1] rounded-lg pt-[88px] pb-[22px] px-6 text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[121px] h-[146px] flex items-center justify-center">
                            <img
                                src="https://api.builder.io/api/v1/image/assets/TEMP/2812c7e7d3a21b48fce4e9f74a3751ec2ba640c6?width=243"
                                alt="Speakers"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h3 className="text-[18px] font-bold tracking-[1.29px] uppercase mb-4">
                            Speakers
                        </h3>
                        <Link href="/category/speakers" className="inline-flex items-center gap-3 text-[13px] font-bold tracking-[1px] uppercase text-black/50 hover:text-brand transition-colors group">
                            <span>Shop</span>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.707092 0.707153L5.70709 5.70715L0.707092 10.7072" stroke="currentColor" strokeWidth="2" className="stroke-brand" />
                            </svg>
                        </Link>
                    </div>

                    {/* Earphones */}
                    <div className="relative bg-[#F1F1F1] rounded-lg pt-[88px] pb-[22px] px-6 text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[25%] w-[125px] h-[126px] flex items-center justify-center">
                            <img
                                src="https://api.builder.io/api/v1/image/assets/TEMP/d620599a697ca9d9223d19f656ac4a66034c030c?width=356"
                                alt="Earphones"
                                className="w-[140%] h-auto object-contain"
                            />
                        </div>
                        <h3 className="text-[18px] font-bold tracking-[1.29px] uppercase mb-4">
                            Earphones
                        </h3>
                        <Link href="/category/earphones" className="inline-flex items-center gap-3 text-[13px] font-bold tracking-[1px] uppercase text-black/50 hover:text-brand transition-colors group">
                            <span>Shop</span>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.707092 0.707153L5.70709 5.70715L0.707092 10.7072" stroke="currentColor" strokeWidth="2" className="stroke-brand" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 md:py-16 lg:py-20 mb-12 px-6 lg:px-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[125px] items-center">
                    <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
                        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold leading-[1.1] tracking-[1.43px] uppercase">
                            Bringing you the <span className="text-brand">best</span> audio gear
                        </h2>
                        <p className="text-[15px] leading-[25px] text-black/50 max-w-[445px]">
                            Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden aspect-[540/588] order-1 lg:order-2">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/2356b5bf3e3c27a2543c681601fdc2a24e4a359f?width=3288"
                            alt="Audiophile Store"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </div >
    )
}

export default page