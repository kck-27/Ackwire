import React, { useContext } from 'react'
import Title from '../components/Title'
import CartCost from '../components/CartCost'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Checkout = () => {

    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const {navigate} = useContext(ShopContext);
    
  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-between pt-5 sm:pt-15 min-h-[80vh] border-t border-gray-300'>
        <div className='flex flex-col gap-4 w-full sm:w-2/5'>
            <div className='text-2xl sm:text-3xl my-3'>
                <Title text1='CHECKOUT' text2='DETAILS'/>
            </div>
            <div className='flex gap-3'>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='First name'/>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='Last name'/>
            </div>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="email" placeholder='Email'/>
            <div className='flex gap-3'>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='Address line 1'/>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='Address line 2'/>
            </div>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='Street name'/>
            <div className='flex gap-3'>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='City'/>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="number" placeholder='Zip code'/>
            </div>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='State/Provice'/>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="text" placeholder='Country'/>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' type="number" placeholder='Contact number'/>
        </div>

        <div className='mt-8'>
            <div className='mt-8 min-w-120'>
                <CartCost/>
            </div>

            <div className='mt-12 text-xl sm:text-2xl'>
                <Title text1='CHOOSE' text2='PAYMENT METHOD'/>
                <div className='gap-3 flex flex-col lg:flex-row'>
                    <div onClick={() => setPaymentMethod('stripe')} className={`flex items-center gap-2 p-2 px-3 border border-gray-300 cursor-pointer ${paymentMethod === 'stripe' ? 'border-gray-600' : ''}`}>
                        <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'stripe' ? 'bg-gray-800' : ''}`}></p>
                        <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                    </div>
                    <div onClick={() => setPaymentMethod('razor_pay')} className={`flex items-center gap-2 p-2 px-3 border border-gray-300 cursor-pointer ${paymentMethod === 'razor_pay' ? 'border-gray-600' : ''}`}>
                        <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'razor_pay' ? 'bg-gray-800' : ''}`}></p>
                        <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                    </div>
                    <div onClick={() => setPaymentMethod('cash_on_delivery')} className={`flex items-center gap-2 p-2 px-3 border border-gray-300 cursor-pointer ${paymentMethod === 'cash_on_delivery' ? 'border-gray-600' : ''}`}>
                        <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'cash_on_delivery' ? 'bg-gray-800' : ''}`}></p>
                        <p className='text-gray-600 text-lg font-medium mx-4'>CASH ON DELIVERY</p>
                    </div>
                </div>

                <div className='w-full text-end mt-8'>
                    <button onClick={() => navigate('/purchases')} className='text-sm bg-black text-white mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer'>PURCHASE</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout