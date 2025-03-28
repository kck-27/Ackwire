import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-25 text-xs sm:text-sm md:text-base text-gray-700'>
        <div className='flex-1'>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Customer Service</p>
            <p className='text-gray-400 w-2/3 mx-auto text-center pt-1'>We are available 24/7 to assist you regarding any issues you face with our products and services</p>
        </div>

        <div className='flex-1'>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7 day return and exchange policy for products</p>
            <p className='text-gray-400 w-2/3 mx-auto text-center pt-1'>If you're dissatisfied with a product you've purchased you can either return it and receive a refund of exchange it for something of equal value within 7 days of the purchase</p>
        </div>

        <div className='flex-1'>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Refunds for unsatisfactory services</p>
            <p className='text-gray-400 w-2/3 mx-auto text-center pt-1'>If you have any, you can raise concerns regarding any services you've paid for. We will review and get back to you with a resolution within 24 hours</p>
        </div>
    </div>
  )
}

export default OurPolicy