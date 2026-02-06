"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TestimonialCard from './components/TestimonialCard'
import CarouselControls from './components/CarouselControls'
import TestimonialThumbnails from './components/TestimonialThumbnails'

interface TestimonialData {
    _id: string;
    name: string;
    role: string;
    message: string;
}

function Testimonials() {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch("/api/admin/testimonials");
                if (res.ok) {
                    const data = await res.json();
                    setTestimonials(data);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };
        fetchTestimonials();
    }, []);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleSelect = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    if (testimonials.length === 0) return null;

    return (
        <section className='bg-[#F4F5F6] py-16 sm:py-24 px-4 sm:px-10 overflow-hidden'>
            <div className='max-w-6xl mx-auto'>
                {/* Heading Area */}
                <div className='text-center space-y-3 mb-12 sm:mb-16'>
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black leading-tight sm:leading-none'
                    >
                        Our Users Feel the <br className="hidden sm:block" /> Transformation
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className='text-sm sm:text-base md:text-lg font-mono text-gray-400 max-w-xl mx-auto'
                    >
                        Real Stories from People Empowered by Personalized Wellness
                    </motion.p>
                </div>

                {/* Carousel Container */}
                <div className='relative flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[400px] mb-8'>
                    <CarouselControls
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />

                    <TestimonialCard
                        activeTestimonial={testimonials[currentIndex]}
                        currentIndex={currentIndex}
                        direction={direction}
                    />
                </div>

                {/* Navigation Row */}
                <TestimonialThumbnails
                    testimonials={testimonials}
                    currentIndex={currentIndex}
                    onSelect={handleSelect}
                />
            </div>
        </section>
    )
}

export default Testimonials