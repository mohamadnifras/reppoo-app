import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='border-b border-gray-100 bg-[#F9F9F9]'>
      <div className='px-6 h-16 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <p className='font-medium text-lg'>Reppoo</p>
        </div>
        <div>
          <Link 
            href="/login" 
            className="px-6 py-2 bg-white text-black border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
           Admin login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar