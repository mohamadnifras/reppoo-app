"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export function FooterBottom() {
    const socialIcons = [
        { icon: <FaFacebookF />, href: '#' },
        { icon: <FaTwitter />, href: '#' },
        { icon: <FaInstagram />, href: '#' },
        { icon: <FaLinkedinIn />, href: '#' }
    ]

    return (
        <div className="pt-5 border-t-2 border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-8">
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-gray-500 font-medium order-2 sm:order-1"
            >
                © Copyright Reppoo
            </motion.p>

            <div className="flex items-center gap-4 order-1 sm:order-2">
                {socialIcons.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, translateY: -3 }}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        {social.icon}
                    </motion.a>
                ))}
            </div>
        </div>
    )
}
