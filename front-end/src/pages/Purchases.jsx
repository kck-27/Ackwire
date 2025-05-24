import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Purchases = ({token, sellertoken, userEmail}) => {

  const {products, services, currency} = useContext(ShopContext);
  const combinedArray = [...products, ...services];
  const [purchases, setPurchases] = useState([]);

  const fetchOrders = async () => {
       try {
        if (!token) {
          return null;
        }

      const res = await axios.post(`${backendURL}/api/orders/get-by-user`, {}, {headers: {token}});
      if (res.data.status === "successful") {
        console.log(res.data.orders[0])
          setPurchases(res.data.orders);
        
      } else {
        console.log(res.data.message);
                            toast.error(res.data.message);
      }
   } catch (error) {
    console.log(error);
              toast.error(error.response?.data?.message || error.message);
   }
  }


   useEffect(() => {
    fetchOrders();
   }, []);

  return (
    <div className='border-t border-gray-300 pt-14 pb-14'>
      <div className='text-3xl'>
        <Title text1={'YOUR'} text2={'PURCHASES'}/>
      </div>

      <div>
        {
          purchases.map((order, orderIndex) => (
            order.items.map((item, itemIndex) => (
              <div key={`${orderIndex}-${itemIndex}`} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-t border-gray-300 py-4'>
              <div className='flex items-start gap-6 text-md'>
                <img src={item.image[0]} alt='' className='w-20 sm:w-30'/>
                <div className='flex items-start h-full my-auto flex-col gap-2'>
                <p className='font-medium sm:text-xl'>{item.name}</p>
                <div className=' flex items-center gap-3 mt-2 text-md  text-gray-600'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>QUANTITY: {item.quantity}</p>
                  { 'color' in item ? <p>COLOR: {item.selectedColor}</p> : 'mode' in item ? <p>MODE: {item.selectedMode}</p> : ''}
                </div>
                <p className='mt-2'>DATE OF PURCHASE: <span className='text-gray-400 ml-2'>{new Date(order.date).toLocaleDateString()}</span></p>
                </div>
              </div>

              <div className='flex justify-between md:w-1/2'>
                <div className='flex items-center gap-3 ml-4 sm:ml-0'>
                  <p className='min-w-2 h-2 rounded-full bg-gray-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={fetchOrders} className='text-md bg-white text-black mr-4 sm:mr-0 mt-5 mb-5 px-8 py-3 border border-gray-300 rounded-full active:bg-gray-300 cursor-pointer'>REFRESH</button>

              </div>
            </div>
            ))
          ))
        }
      </div>

      {/* <div>
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
      </div> */}
    </div>
  )
}

export default Purchases