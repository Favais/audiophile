import Image from "next/image";
import CategoryCard from "./components/CategoryCard";
import Link from "next/link";
import hero from '@/public/assets/home/mobile/image-header.jpg'

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-lighter-gray">
      <section className="bg-brand-dark overflow-hiden">
        <div className="max-w-content mx-auto px-6 lg:px-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center py-20 lg:py-32">
            <div className="text-center lg:text-left z-10">
              <p className="text-white/50 text-[14px] tracking-[10px] uppercase mb-6">
                New Product
              </p>
              <h1 className="text-white text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight lg:leading-[58px] tracking-[2px] uppercase mb-6">
                XX99 Mark II
                <br />
                Headphones
              </h1>
              <p className="text-white/75 text-[15px] leading-[25px] mb-10 max-w-[349px] mx-auto lg:mx-0">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Link
                href="/headphones"
                className="inline-block bg-brand-orange hover:bg-brand-light-orange text-white text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 transition-colors"
              >
                See Product
              </Link>
            </div>
            <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 flex items-center justify-center">
              <Image
                src={hero}
                alt="XX99 Mark II Headphones"
                className="w-full h-auto max-w-md lg:max-w-none"
              // width={0}
              // height={100}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-40 px-6">
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

      <section className="pb-12 lg:pb-20 px-6 ">
        <div className="max-w-content mx-auto px-6 lg:px-0">
          <div className="bg-brand-orange rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <svg
                className="absolute -left-32 lg:-left-40 top-1/2 -translate-y-1/2"
                width="944"
                height="944"
                viewBox="0 0 795 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.202147">
                  <circle cx="323" cy="436" r="235.5" stroke="white" />
                  <circle cx="323" cy="436" r="270.5" stroke="white" />
                  <circle cx="323" cy="436" r="471.5" stroke="white" />
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center py-16 lg:py-24 relative z-10">
              <div className="flex justify-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2413442c75b6bcb3bc8637e2a8349b3eb9be4aeb?width=820"
                  alt="ZX9 Speaker"
                  className="w-full max-w-xs lg:max-w-md"
                />
              </div>

              <div className="text-center lg:text-left px-6 lg:px-0 lg:pr-24">
                <h2 className="text-white text-4xl lg:text-[56px] font-bold leading-tight lg:leading-[58px] tracking-[2px] uppercase mb-6">
                  ZX9
                  <br />
                  Speaker
                </h2>
                <p className="text-white/75 text-[15px] leading-[25px] mb-10 max-w-[349px] mx-auto lg:mx-0">
                  Upgrade to premium speakers that are phenomenally built to
                  deliver truly remarkable sound.
                </p>
                <Link
                  href="/speakers"
                  className="inline-block bg-black hover:bg-gray-800 text-white text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 transition-colors"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 lg:pb-20 px-40">
        <div className="max-w-content mx-auto px-6 lg:px-0">
          <div className="bg-brand-light-gray rounded-lg overflow-hidden relative h-80">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/aedcd7bc431ee51ddad107741762bb325c7e67d6?width=2494"
              alt="ZX7 Speaker"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex flex-col justify-center h-full px-8 lg:px-24">
              <h2 className="text-black text-[28px] font-bold tracking-[2px] uppercase mb-8">
                ZX7 Speaker
              </h2>
              <Link
                href="/speakers"
                className="inline-block border-2 border-black hover:bg-black hover:text-white text-black text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 transition-colors w-fit"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-40 px-40">
        <div className="max-w-content mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-light-gray rounded-lg overflow-hidden h-80">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/6c67f2729d25c0b936b5eb56755c1b7794a41f62?width=1463"
                alt="YX1 Earphones"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-brand-light-gray rounded-lg overflow-hidden flex flex-col justify-center px-8 lg:px-24 h-80">
              <h2 className="text-black text-[28px] font-bold tracking-[2px] uppercase mb-8">
                YX1 Earphones
              </h2>
              <Link
                href="/earphones"
                className="inline-block border-2 border-black hover:bg-black hover:text-white text-black text-[13px] font-bold tracking-[1px] uppercase px-8 py-4 transition-colors w-fit"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-40 px-40">
        <div className="max-w-content mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-black text-[28px] lg:text-[40px] font-bold leading-tight lg:leading-[44px] tracking-[1.429px] uppercase mb-8">
                Bringing you the{" "}
                <span className="text-brand-orange">best</span> audio gear
              </h2>
              <p className="text-black/50 text-[15px] leading-[25px]">
                Located at the heart of New York City, Audiophile is the premier
                store for high end headphones, earphones, speakers, and audio
                accessories. We have a large showroom and luxury demonstration
                rooms available for you to browse and experience a wide range of
                our products. Stop by our store to meet some of the fantastic
                people who make Audiophile the best place to buy your portable
                audio equipment.
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/879f83ee04f095df124271f2a5a5c15e54e61340?width=1080"
                alt="Best Audio Gear"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
