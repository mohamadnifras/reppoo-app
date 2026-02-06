"use client";

import React, { useState, useEffect } from 'react'
import { BsStopwatch } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import Image from 'next/image';

function TimeTracker() {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);

    const formatTime = () => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const displayH = (10 + h).toString().padStart(2, '0');
        const displayM = (34 + m).toString().padStart(2, '0');
        const displayS = s.toString().padStart(2, '0');

        return { displayH, displayM, displayS };
    };

    const { displayH, displayM, displayS } = formatTime();

    return (
        <div className='bg-[#F4F5F6] p-4 sm:p-10 rounded-2xl w-full max-w-lg mx-auto'>
            <div className='p-4 sm:p-5 bg-white rounded-2xl space-y-6'>
                {/* Time Tracker Header */}
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2 font-bold text-gray-800 text-sm sm:text-base'>
                        <BsStopwatch className="text-lg" />
                        Time Tracker
                    </div>
                    <div className='flex items-center gap-1.5 px-3 py-1.5 bg-[#EDEDED] text-black rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-sm border border-gray-200 cursor-pointer text-xs sm:text-sm font-semibold'>
                        <IoTimeOutline className="text-base" />
                        History
                    </div>
                </div>

                {/* Time Tracker Card */}
                <div className='w-full min-h-[110px] bg-[#F1F3F5] rounded-2xl flex items-center justify-between p-4 sm:p-6 gap-3'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest'>Design System</p>
                        <div className='flex items-baseline font-black tracking-tighter'>
                            <span className='text-3xl sm:text-4xl text-gray-900'>{displayH}:{displayM}:</span>
                            <span className='text-3xl sm:text-4xl text-[#2563EB]'>{displayS}</span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${isActive
                                ? 'bg-red-500 shadow-red-500/20 hover:bg-red-600'
                                : 'bg-[#2563EB] shadow-blue-500/30 hover:bg-blue-600 hover:scale-110 active:scale-95'
                                } text-white`}
                        >
                            {isActive ? <FaPause size={18} className="sm:size-5" /> : <FaPlay size={18} className="sm:size-5 ml-1" />}
                        </button>
                    </div>
                </div>

                {/* Previous Tasks List */}
                <div className="space-y-5 pt-2">
                    <p className="text-sm font-bold text-gray-800 ml-1">Previous Tasks</p>

                    {[1, 2].map((item) => (
                        <div key={item} className='flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-xl transition-colors'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-indigo-50 text-indigo-500 w-10 h-10 rounded-xl flex items-center justify-center border border-indigo-100/50 shadow-sm'>
                                    <Image src="/logo.png" alt="Task" width={22} height={22} className="opacity-80" />
                                </div>
                                <div className='space-y-0.5'>
                                    <p className='text-sm font-bold text-gray-800 leading-none'>Loom UI Design system</p>
                                    <p className='text-[11px] font-semibold text-gray-400'>10:34:00</p>
                                </div>
                            </div>
                            <div className="text-gray-300 group-hover:text-gray-900 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="5" r="2" />
                                    <circle cx="12" cy="12" r="2" />
                                    <circle cx="12" cy="19" r="2" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TimeTracker;
