"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Hero Section", href: "/admin/hero" },
    { name: "About Section", href: "/admin/about" },
    { name: "Testimonials", href: "/admin/testimonials" },
    { name: "FAQ", href: "/admin/faq" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 uppercase font-medium">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-[#111] text-white rounded-md lg:hidden shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#111] text-white p-6 transform transition-transform duration-300 ease-in-out shrink-0
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <h2 className="text-xl font-bold mb-10 tracking-wider">Admin</h2>

        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block py-2 text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-8 left-6">
          <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
            ← Logout
          </Link>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 w-full flex flex-col min-h-screen pt-16 lg:pt-0">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
