"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { FileText, MessageSquare, MessagesSquare, ThumbsUp } from 'lucide-react'

function SpecialOffer() {
    return (
        <section className="relative bg-[#FCFCFD] py-20 sm:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[650px] md:min-h-[850px]">
            {/* Background Rings - Scaling container for responsiveness */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[0.45] sm:scale-[0.7] lg:scale-100 transition-transform duration-500">
                <div className="relative w-[1200px] h-[1200px]">
                    {/* Ring 1 (Largest) */}
                    <div className="w-[1200px] h-[1200px] border border-[#EDEDED] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                    {/* Ring 2 */}
                    <div className="w-[900px] h-[900px] border border-[#EDEDED] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                    {/* Ring 3 (Smallest) */}
                    <div className="w-[500px] h-[500px] border border-[#EDEDED] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                    {/* Floating Icons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="absolute top-[380px] left-[40px] -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-[32px] border border-[#F0F0F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-20"
                    >
                        <FileText className="w-10 h-10 text-[#111]" strokeWidth={1.5} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="absolute top-[380px] right-[40px] translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-[32px] border border-[#F0F0F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-20"
                    >
                        <MessageSquare className="w-10 h-10 text-[#111]" strokeWidth={1.5} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="absolute bottom-[440px] left-[180px] -translate-x-1/2 translate-y-1/2 bg-white p-7 rounded-[32px] border border-[#F0F0F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-20"
                    >
                        <MessagesSquare className="w-10 h-10 text-[#111]" strokeWidth={1.5} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute bottom-[430px] right-[180px] translate-x-1/2 translate-y-1/2 bg-white p-7 rounded-[32px] border border-[#F0F0F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-20"
                    >
                        <ThumbsUp className="w-10 h-10 text-[#111]" strokeWidth={1.5} />
                    </motion.div>
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <p className="text-[#6B7280] text-[10px] sm:text-[12px] font-bold tracking-widest uppercase mb-6">
                        Special Launch Offer
                    </p>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-semibold tracking-[-0.03em] text-[#111] mb-6 leading-[1.1] sm:leading-[1.05] max-w-[850px]">
                        Your journey to better health starts now
                    </h2>

                    <p className="text-sm sm:text-lg text-[#6B7280]/80 max-w-xl mx-auto mb-10 font-medium leading-relaxed">
                        Get 50% off your first 3 months when you start your trial today!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4 sm:px-0">
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black border border-[#EDEDED] rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2.5 active:scale-95 group text-sm">
                            <Image src="/apple.png" alt="apple" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                            Download
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black border border-[#EDEDED] rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2.5 active:scale-95 group text-sm">
                            <Image src="/play.png" alt="google" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                            Download
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SpecialOffer