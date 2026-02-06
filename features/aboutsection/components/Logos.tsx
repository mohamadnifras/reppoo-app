"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

function Logos() {
    const logos = [
        { src: '/logo1.png', alt: 'Partner 1' },
        { src: '/logo2.png', alt: 'Partner 2' },
        { src: '/logo3.png', alt: 'Partner 3' },
        { src: '/logo4.png', alt: 'Partner 4' },
        { src: '/logo5.png', alt: 'Partner 5' },
    ]

    // Duplicate the logos to create a seamless infinite scroll effect
    const duplicatedLogos = [...logos, ...logos, ...logos]

    return (
        <div className="w-full bg-[#FCFCFD] py-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4">
                {/* Subtle Fade Edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FCFCFD] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FCFCFD] to-transparent z-10" />

                <motion.div
                    className="flex items-center gap-16 md:gap-24"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 25, // Adjust duration for scroll speed (lower = faster)
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ width: "fit-content" }}
                >
                    {duplicatedLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={120}
                                height={40}
                                className="h-8 md:h-10 w-auto object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Logos