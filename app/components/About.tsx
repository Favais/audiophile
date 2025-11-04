import React from 'react'

const About = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 mb-12 px-40">
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
        </section >
    )
}

export default About