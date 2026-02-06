"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TestimonialData {
    _id: string;
    name: string;
    role: string;
    message: string;
}

interface TestimonialCardProps {
    activeTestimonial: TestimonialData;
    currentIndex: number;
    direction: number;
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 150 : -150,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 150 : -150,
        opacity: 0
    })
};

const TestimonialCard = ({ activeTestimonial, currentIndex, direction }: TestimonialCardProps) => {
    return (
        <div className='w-full max-w-3xl px-2'>
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "tween", duration: 0.4, ease: "easeInOut" },
                        opacity: { duration: 0.25 }
                    }}
                    className='bg-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 text-center flex flex-col items-center'
                >
                    <p className='text-base sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-8 max-w-xl italic'>
                        "{activeTestimonial.message}"
                    </p>

                    <div className='flex items-center gap-3 text-left'>
                        <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-lg shrink-0'>
                            {activeTestimonial.name.charAt(0)}
                        </div>
                        <div className='space-y-0.5'>
                            <h3 className='text-lg font-bold text-gray-900'>{activeTestimonial.name}</h3>
                            <p className='text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none'>{activeTestimonial.role}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default TestimonialCard
