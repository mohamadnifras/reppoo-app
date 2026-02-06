"use client"
import React, { useEffect, useState } from 'react'
import Logos from './components/Logos'
import TimeTracker from './components/TimeTracker'

function About() {
    const [data, setData] = useState<{ heading: string; text: string } | null>(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await fetch("/api/admin/about");
                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                }
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };
        fetchAbout();
    }, []);

    return (
        <section className="w-full bg-[#FCFCFD]">
            <Logos />
            <div className="container mx-auto px-20 py-32">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                    {/* Left Side: Content */}
                    <div className="w-full lg:w-1/2">
                        {data ? (
                            <div className="space-y-8">
                                <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-900 tracking-tighter leading-[1.05]">
                                    {data.heading}
                                </h2>
                                <p className="text-sm md:text-lg text-gray-500 leading-relaxed font-medium max-w-xl">
                                    {data.text}
                                </p>

                                <div className="pt-4">
                                    <button className="px-8 py-3.5 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-xl shadow-black/10 border border-gray-200">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-pulse space-y-6">
                                <div className="h-20 bg-gray-200 rounded-2xl w-full"></div>
                                <div className="h-32 bg-gray-200 rounded-2xl w-3/4"></div>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Visual (Time Tracker) */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="">
                            <TimeTracker />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default About