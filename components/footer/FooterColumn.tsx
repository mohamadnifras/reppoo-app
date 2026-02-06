"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface FooterColumnProps {
    title: string;
    links: { name: string; href: string }[];
}

export function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div className="space-y-6">
            <h4 className="text-gray-900 font-bold">{title}</h4>
            <ul className="space-y-4">
                {links.map((link) => (
                    <li key={link.name}>
                        <motion.div whileHover={{ x: 5 }}>
                            <Link href={link.href} className="text-gray-500 hover:text-black transition-colors font-mono">
                                {link.name}
                            </Link>
                        </motion.div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
