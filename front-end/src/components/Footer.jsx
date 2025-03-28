import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <hr className='border-gray-300'/>
        <div className='flex flex-col sm:grid grid-cols-[1fr_1fr_2fr] gap-14 my-15 text-sm'>
            <div>
            <p className='text-xl font-medium mb-5'>USEFUL LINKS</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
                
            </div>
            <div>
            <p className='text-xl font-medium mb-5'>CONTACT US</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Address: 20 Ingram Street, Forest Hills, Queens, New York, USA</li>
                        <li>Phone: +94674356592</li>
                        <li>Fax: +94894356732</li>
                        <li>Email: 
                            <a href="mailto:abc@gmail.com" className='text-blue-500'> ackwire@gmail.com</a>
                        </li>
                    </ul>
                    
            </div>
            <div className='flex flex-col'>
            <img src={assets.ackwire_logo} alt="" className='mb-2.5 w-18'/>
                <p className='w-full md:w-9/10 text-gray-600'>Ackwire is your all-in-one marketplace, bringing together a wide range of products and services in one seamless platform. Whether you're shopping for high-quality goods or seeking expert services, Ackwire has you covered. Explore diverse categories, discover unique offerings, and enjoy a simple, secure shopping experience tailored to your needs.</p>
                
            </div>
        </div>

        <div>
            <hr className='border-gray-300'/>
            <p className='text-center text-sm text-gray-600 py-5'>© 2025 Ackwire. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer