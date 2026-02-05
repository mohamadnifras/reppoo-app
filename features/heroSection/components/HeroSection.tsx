import Image from 'next/image'
import React from 'react'

function HeroSection() {
  return (
    <div className='bg-[#F9F9F9]'>
     <div>
        <Image src="/ellipse10.png" alt="" width={30} height={30} />
     </div>
    </div>
  )
}

export default HeroSection