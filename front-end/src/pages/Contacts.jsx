import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contacts = () => {
  return (
    <div className='border-t border-gray-300 pt-14'>
      <div className='text-center text-4xl'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='flex flex-col md:flex-row justify-start my-10 gap-10 mb-30'>

      <div className='flex flex-col items-center justify-center gap-4 md:w-1/2'>
          <p className='font-semibold text-3xl text-gray-600'>Our Location:</p>
          <p className='text-gray-500 mb-8 text-xl text-center'>20, <br /> Ingram Street, <br /> Forest Hills, <br /> Queens, <br /> New York, <br /> USA</p>
          <p className='font-semibold text-3xl text-gray-600'>Phone:</p>
          <p className='text-gray-500 mb-8 text-xl text-center'>+94674356592</p>
          <p className='font-semibold text-3xl text-gray-600'>Fax:</p>
          <p className='text-gray-500 mb-8 text-xl text-center'>+94894356732</p>
          <p className='font-semibold text-3xl text-gray-600'>Email:</p>
          <p className='text-gray-500 mb-8 text-xl text-center'>ackwire@gmail.com</p>
        </div>

        <div className='flex flex-col'>
          <div className='h-1/10'></div>
          <div className='h-8/10 flex flex-row'>
          <div className='w-1/2 sm:border sm:border-r sm:border-gray-300'></div>
          <div className='w-1/2'></div>
          </div>
          <div className='h-1/10'></div>
        </div>

        <div className='w-full md:w-1/2 flex items-center justify-center'>
        <img className='max-w-[300px] md:max-w-[700px] mx-auto' src={assets.contact_img2} alt="" />
        </div>
       
        
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contacts