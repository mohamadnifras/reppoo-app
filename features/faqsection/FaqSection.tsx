"use client"

import React, { useEffect, useState } from 'react'
import FaqAccordion from './components/FaqAccordion'
import { motion } from 'framer-motion'

interface FaqData {
    _id: string;
    question: string;
    answer: string;
}

function FaqSection() {
    const [faqs, setFaqs] = useState<FaqData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch("/api/admin/faq");
                if (res.ok) {
                    const data = await res.json();
                    setFaqs(data);
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    return (
        <section className='bg-white py-24 px-4 sm:px-10'>
            <div className='max-w-4xl mx-auto'>
                {/* Heading Area */}
                <div className='text-center space-y-4 mb-20'>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-black leading-none'
                    >
                        Frequently Asked <br className="hidden sm:block" /> Questions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className='text-sm sm:text-base md:text-lg font-mono text-gray-500 max-w-xl mx-auto'
                    >
                        Get answers to common questions about our AI health assistant app
                    </motion.p>
                </div>

                {/* FAQ List Area */}
                <div className='space-y-4'>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-2xl w-full" />
                            ))}
                        </div>
                    ) : faqs.length > 0 ? (
                        <div className="max-h-[320px] overflow-y-auto no-scrollbar divide-y divide-gray-100 pr-2 ">
                            {faqs.map((faq) => (
                                <FaqAccordion key={faq._id} title={faq.question}>
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </FaqAccordion>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-400 font-medium">No questions published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default FaqSection