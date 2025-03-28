import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Purchases = () => {

  const {products, services, currency} = useContext(ShopContext);
  const combinedArray = [...products, ...services];

  return (
    <div className='border-t border-gray-300 pt-14'>
      <div className='text-3xl'>
        <Title text1={'YOUR'} text2={'PURCHASES'}/>
      </div>

      <div>
        {
          products.slice(1, 3).map((item, index) => (
            <div key={index} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-t border-gray-300 py-4'>
              <div className='flex items-start gap-6 text-md'>
                <img src={item.image[0]} alt='' className='w-20 sm:w-30'/>
                <div className='flex items-start h-full my-auto flex-col gap-2'>
                <p className='font-medium sm:text-xl'>{item.name}</p>
                <div className=' flex items-center gap-3 mt-2 text-md  text-gray-600'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>QUANTITY: 2</p>
                  <p>COLOR: RED</p>
                </div>
                <p className='mt-2'>DATE OF PURCHASE: <span className='text-gray-400'>22-03-2025</span></p>
                </div>
              </div>

              <div className='flex justify-between md:w-1/2'>
                <div className='flex items-center gap-3 ml-4 sm:ml-0'>
                  <p className='min-w-2 h-2 rounded-full bg-gray-500'></p>
                  <p className='text-sm md:text-base'>SHIPPED</p>
                </div>
                <button className='text-md bg-white text-black mr-4 sm:mr-0 mt-5 mb-5 px-8 py-3 border border-gray-300 rounded-full active:bg-gray-300 cursor-pointer'>DETAILS</button>

              </div>
            </div>
          ))
        }
      </div>
      <div>
        {
          services.slice(1, 3).map((item, index) => (
            <div key={index} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-t border-gray-300 py-4'>
              <div className='flex items-start gap-6 text-md'>
                <img src={item.image[0]} alt='' className='w-20 sm:w-30'/>
                <div className='flex items-start h-full my-auto flex-col gap-2'>
                <p className='font-medium sm:text-xl'>{item.name}</p>
                <div className=' flex items-center gap-3 mt-2 text-md  text-gray-600'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>QUANTITY: 2</p>
                  <p>MODE: PHYSYICAL</p>
                </div>
                <p className='mt-2'>DATE OF PURCHASE: <span className='text-gray-400'>22-03-2025</span></p>
                </div>
              </div>

              <div className='flex justify-between md:w-1/2'>
                <div className='flex items-center gap-3 ml-4 sm:ml-0'>
                  <p className='min-w-2 h-2 rounded-full bg-gray-500'></p>
                  <p className='text-sm md:text-base'>DELIVERED</p>
                </div>
                <button className='text-md bg-white text-black mr-4 sm:mr-0 mt-5 mb-5 px-8 py-3 border border-gray-300 rounded-full active:bg-gray-300 cursor-pointer'>DETAILS</button>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Purchases