// "use client"
import { assert, log } from 'console'
import data from '@/public/assets/db.json'
import Title from '@/app/components/Title'
import Image from 'next/image'
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const product = data.data.find(item => item.slug === slug)

    return (

        <div>
            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 md:py-20 ">
                <div className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left: Product Image */}
                        <div className="relative bg-[#F1F1F1] rounded-lg overflow-hidden aspect-square lg:aspect-auto lg:h-[560px] flex items-center justify-center">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={product?.image.desktop}
                                    alt={product?.name}
                                    className="w-[60%] max-w-[296px] h-auto object-contain relative z-10"
                                />
                                <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[50%] max-w-[262px] h-14 bg-black opacity-[0.15] rounded-full blur-[22px]" />
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col justify-center space-y-6 lg:space-y-8 max-w-md mx-auto lg:mx-0">
                            <div className="space-y-6 lg:space-y-8">
                                {product?.new && (
                                    <p className="text-[#D87D4A] text-sm font-normal tracking-[10px] uppercase">
                                        New Product
                                    </p>
                                )}

                                <h1 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold leading-[1.1] tracking-[1.43px] uppercase text-black">
                                    {product?.name}<br />
                                </h1>

                                <p className="text-[15px] leading-[25px] text-black opacity-50 font-normal">
                                    {product?.description}
                                </p>
                            </div>
                            <p className="text-[18px] text-black font-bold">${product?.price.toLocaleString()}</p>
                            <div className='flex'>
                                <div className=''>
                                    {/* <label htmlFor="quantity" className="sr-only text-black">Quantity</label> */}
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        defaultValue={1}
                                        min={1}
                                        className="w-30 h-12 bg-[#F1F1F1] border text-[13px] border-gray-300 rounded-md px-8 py-4 mr-4"
                                    />
                                </div>
                                <button className="bg-[#D87D4A] text-white font-bold text-[13px]  uppercase px-8 py-4 hover:bg-[#FBAF85] transition-colors duration-200 w-[160px] h-12 flex items-center justify-center">
                                    Add to Cart
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <section className="grid gap-12 md:grid-cols-2 md:gap-16 my-20 px-40">
                {/* Features */}
                <div>
                    <h2 className="text-2xl font-bold tracking-wider uppercase mb-6">
                        Features
                    </h2>
                    <p className="whitespace-pre-line text-muted-foreground leading-relaxed mb-4">
                        {product?.features}
                    </p>
                </div>

                {/* In the Box */}
                <div>
                    <h2 className="text-2xl font-bold tracking-wider uppercase mb-6">
                        In the Box
                    </h2>
                    <ul className="space-y-3">
                        {product?.includes.map((item: { quantity: number; item: string }, index: number) => (
                            <li key={index} className="flex gap-4">
                                <span className="text-orange-500 font-bold">{item.quantity}x</span>
                                <span>{item.item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="grid grid-cols-3 grid-rows-2 gap-4 px-40">
                {/* Left top image */}
                <Image
                    src={product?.gallery.first.desktop || ''}
                    alt={product?.name || ''}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover col-span-1 row-span-1"
                />

                {/* Tall right image (spans 2 rows) */}
                <Image
                    src={product?.gallery.third.desktop || ''}
                    alt={product?.name || ''}
                    width={50}
                    height={100}
                    className="w-full h-full object-cover col-span-2 row-span-2"
                />

                {/* Left bottom image */}
                <Image
                    src={product?.gallery.second.desktop || ''}
                    alt={product?.name || ''}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover col-span-1 row-span-1"
                />

            </section>
            <section className='px-40 my-20 '>
                <p className='text-center font-bold'>YOU MAY ALSO LIKE</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                    {product?.others.map((item: { slug: string; name: string; image: { desktop: string } }, index: number) => (
                        <div key={index} className='text-center'>
                            <Image
                                src={item.image.desktop}
                                alt={item.name}
                                width={300}
                                height={300}
                                className='w-full h-auto object-cover mb-6'
                            />
                            <h3 className='font-bold text-lg mb-4'>{item.name}</h3>
                            <button className='bg-[#D87D4A] text-white px-6 py-3 hover:bg-gray-800 transition-colors duration-200'>
                                <a href={`/headphones/${item.slug}`}>SEE PRODUCT</a>
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page