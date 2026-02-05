"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


function HeroSection() {
    const [heroData, setHeroData] = useState<{ title: string; subtitle: string; image: string } | null>(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await fetch("/api/admin/hero");
                if (res.ok) {
                    const data = await res.json();
                    setHeroData(data);
                }
            } catch (error) {
                console.error("Error fetching hero:", error);
            }
        };
        fetchHero();
    }, []);

    return (
        <section className="relative min-h-screen bg-[#F9F9F9] overflow-hidden flex flex-col items-center">

            {/* Background Rings */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-start justify-center pointer-events-none">
                <div className="relative">
                    <div className="w-[1246px] h-[523px] border border-[#EDEDED] rounded-b-full absolute top-0 -translate-x-1/2"></div>
                    <div className="w-[932px] h-[466px] border border-[#EDEDED] rounded-b-full absolute top-0 -translate-x-1/2"></div>
                    <div className="w-[586px] h-[293px] border border-[#EDEDED] rounded-b-full absolute top-0 -translate-x-1/2"></div>
                </div>
            </div>


            <div className="relative z-10 flex flex-col items-center justify-center pt-20 sm:pt-24 pb-12 w-full">
                <div className='flex items-center justify-center w-full max-w-7xl mx-auto px-4 gap-4 lg:gap-0 overflow-visible'>
                    {/* Left Frame - Keep Hidden on Mobile */}
                    <div className='hidden lg:block transform -translate-x-12 translate-y-12 rotate-[-4deg] animate-float-slow'>
                        <Image src="/hero_frame2.png" alt="hero-frame-2" width={320} height={220} className="drop-shadow-2xl" />
                    </div>

                    {/* Center Phone Mockup */}
                    <div className='relative z-30 scale-90 sm:scale-110 lg:scale-125 transition-transform duration-700'>
                        {/* Phone Frame */}
                        <div className="relative w-[280px] h-[580px] sm:w-[320px] sm:h-[650px] mx-auto">
                            <Image
                                src="/mobile.png"
                                alt="mobile-frame"
                                fill
                                className="object-contain z-20 pointer-events-none"
                            />


                            {/* Mask Image - Inside the Phone */}
                            <div className="absolute top-39 left-[4%] right-[4%] bottom-[22.2%] z-20 overflow-hidden rounded-t-[38px]">
                                {heroData?.image && (
                                    <Image
                                        src={heroData.image}
                                        alt="mobile-screen"
                                        fill
                                        className="object-cover"
                                    />
                                )}

                            </div>

                            {/* Camera/Notch area */}
                            <div className="absolute top-[22.7%] left-1/2 -translate-x-1/2 w-[39%] h-[4%] z-30">
                                <Image
                                    src="/camera.png"
                                    alt="camera"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        {/* Gradient Fade for Bottom of Phone on Mobile/Small screens */}
                        <div className='absolute bottom-[10%] sm:bottom-30 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-[#F9F9F9] z-30 pointer-events-none' />
                    </div>

                    {/* Right Frame - Keep Hidden on Mobile */}
                    <div className='hidden lg:block transform translate-x-12 translate-y-12 rotate-[4deg] animate-float'>
                        <Image src="/hero_frame1.png" alt="hero-frame-1" width={320} height={220} className="drop-shadow-2xl" />
                    </div>
                </div>

                {/* Happy Users Section */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 -mt-10 sm:-mt-15 mb-4 z-40">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden shadow-sm bg-gray-100">
                                <Image
                                    src={`https://i.pravatar.cc/100?u=${i + 15}`}
                                    alt="User Avatar"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg sm:text-xl font-bold text-[#111]">59,182</span>
                        <span className="text-black font-medium text-sm sm:text-base">Happy Users</span>
                    </div>
                </div>

                {/* Title & Subtitle */}
                <div className="text-center px-6 max-w-4xl mx-auto z-40">
                    {heroData ? (
                        <>
                            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-normal tracking-tighter text-gray-900 mb-4 sm:mb-2 leading-[1.1] sm:leading-[0.9]">
                                {heroData.title}
                            </h1>
                            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                                {heroData.subtitle}
                            </p>
                        </>
                    ) : (
                        <div className="animate-pulse space-y-4">
                            <div className="h-12 sm:h-16 bg-gray-200 rounded-xl w-3/4 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto"></div>
                        </div>
                    )}
                </div>

                {/* Download Buttons */}
                <div className='flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-6 z-40 w-full px-8'>
                    <div className="w-full sm:w-auto px-6 py-2.5 bg-white text-black border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95">
                        <Image src="/apple.png" alt="apple" width={20} height={20} />
                        Download
                    </div>
                    <div className="w-full sm:w-auto px-6 py-2.5 bg-white text-black border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95">
                        <Image src="/play.png" alt="google" width={20} height={20} />
                        Download
                    </div>
                </div>

                <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(12px) translateX(12px) rotate(4deg); }
          50% { transform: translateY(-12px) translateX(12px) rotate(6deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(12px) translateX(-12px) rotate(-4deg); }
          50% { transform: translateY(-8px) translateX(-12px) rotate(-6deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>                </div>
        </section>
    )
}

export default HeroSection;
