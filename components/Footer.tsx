"use client"
import React from 'react'
import { FooterBrand } from './footer/FooterBrand'
import { FooterColumn } from './footer/FooterColumn'
import { FooterBottom } from './footer/FooterBottom'

function Footer() {
    const footerLinks = {
        company: [
            { name: 'Home', href: '#' },
            { name: 'Early Access', href: '#' },
            { name: '404', href: '#' }
        ],
        app: [
            { name: 'Download For IOS', href: '#' },
            { name: 'Download For Android', href: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms & Conditions', href: '#' }
        ]
    }

    return (
        <footer className="bg-white pt-20 pb-10 px-6 sm:px-10 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 ">
                    <FooterBrand />

                    <div className="lg:col-span-2">
                        <FooterColumn title="Company" links={footerLinks.company} />
                    </div>

                    <div className="lg:col-span-2">
                        <FooterColumn title="App" links={footerLinks.app} />
                    </div>

                    <div className="lg:col-span-2">
                        <FooterColumn title="Legal Pages" links={footerLinks.legal} />
                    </div>
                </div>

                <FooterBottom />
            </div>
        </footer>
    )
}

export default Footer