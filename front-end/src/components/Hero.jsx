import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Left */}
        <img src={assets.hero_img2} className='sm:w-1/2 w-full' alt="" />

        {/* Right */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>TOP GRADE</p>
                </div>
                <h1 className='barlow-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>PRODUCTS AND SERVICES</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>IN ONE PLACE</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Hero