"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

interface FaqAccordionProps {
    title: string;
    children: React.ReactNode;
}

function FaqAccordion({ title, children }: FaqAccordionProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="py-6 sm:py-8 overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between text-left group transition-all"
            >
                <span className={`text-xl sm:text-xl font-medium tracking-tight transition-colors duration-300 ${open ? "text-[#2563EB]" : "text-gray-900 group-hover:text-blue-600"
                    }`}>
                    {title}
                </span>

                <div className={`shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${open ? "bg-[#2563EB] text-white rotate-45" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                    }`}>
                    <Plus size={24} strokeWidth={2.5} />
                </div>
            </button>

            {/* Content Area with Framer Motion for perfect smoothness */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pt-6 pb-2 text-gray-500 text-base sm:text-lg leading-relaxe font-medium max-w-3xl">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FaqAccordion