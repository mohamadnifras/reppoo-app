"use client"

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselControlsProps {
    onPrev: () => void;
    onNext: () => void;
}

const CarouselControls = ({ onPrev, onNext }: CarouselControlsProps) => {
    return (
        <>
            {/* Desktop Controls */}
            <div className='hidden sm:block absolute left-0 lg:left-4 z-20'>
                <button
                    onClick={onPrev}
                    className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-100 bg-white/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all active:scale-90 shadow-sm'
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <div className='hidden sm:block absolute right-0 lg:right-4 z-20'>
                <button
                    onClick={onNext}
                    className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-100 bg-white/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all active:scale-90 shadow-sm'
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Mobile Controls */}
            <div className='flex sm:hidden gap-4 mt-2'>
                <button
                    onClick={onPrev}
                    className='w-12 h-12 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 active:scale-90'
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={onNext}
                    className='w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center text-white active:scale-90'
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </>
    )
}

export default CarouselControls
