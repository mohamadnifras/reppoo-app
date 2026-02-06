"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function FooterBrand() {
    return (
        <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="Reppoo Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Reppoo</span>
            </Link>
            <p className="text-[#1F221E] max-w-sm leading-relaxed font-medium">
                innovative health assistant app that leverages artificial intelligence to provide personalized wellness recommendations.
            </p>
            <a
                href="#"
                className="text-[#1F221E] hover:text-black transition-colors font-medium block"
            >
                hello@reppoo.com
            </a>
        </div>
    )
}
