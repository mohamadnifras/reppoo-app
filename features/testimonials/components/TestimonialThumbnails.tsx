"use client"

import React from 'react'

interface TestimonialData {
    _id: string;
    name: string;
    role: string;
    message: string;
}

interface TestimonialThumbnailsProps {
    testimonials: TestimonialData[];
    currentIndex: number;
    onSelect: (index: number) => void;
}

const TestimonialThumbnails = ({ testimonials, currentIndex, onSelect }: TestimonialThumbnailsProps) => {
    return (
        <div className='flex flex-wrap justify-center gap-3 px-2'>
            {testimonials.map((t, idx) => (
                <button
                    key={t._id}
                    onClick={() => onSelect(idx)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${idx === currentIndex
                        ? 'bg-white shadow-md border border-gray-100 opacity-100 scale-105'
                        : 'bg-transparent opacity-30 hover:opacity-50 grayscale'
                        }`}
                >
                    <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500 shrink-0'>
                        {t.name.charAt(0)}
                    </div>
                    <div className='text-left max-w-[100px] overflow-hidden'>
                        <p className='text-xs font-bold text-gray-800 truncate mb-0.5'>{t.name}</p>
                        <p className='text-[9px] text-gray-400 font-bold uppercase truncate'>
                            {idx === currentIndex ? "Active" : t.role}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default TestimonialThumbnails
