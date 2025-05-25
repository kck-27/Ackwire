import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import CartCost from '../components/CartCost'

const Cart = () => {

  const {products, services, currency, cartItems, getTotalQuantity, getQuantityByItem, updateQuantity, navigate} = useContext(ShopContext);
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    if (products.length > 0 && services.length > 0) {
      let tempCartDetails = [];
      for (const item in cartItems) {
        for (const attribute in cartItems[item]) {
          if (cartItems[item][attribute] > 0) {
            tempCartDetails.push({
              _id: item,
              _attribute: attribute,
              quantity: cartItems[item][attribute]
            });
          }
        }
      }
      setCartDetails(tempCartDetails);
    }
  }, [cartItems, updateQuantity, products, services])

  return cartDetails.length > 0 ? (
    <div className='border-t border-gray-300 pt-14'>
      <div className='text-3xl sm:text-4xl mb-3'>
        <Title text1={'IN YOUR'} text2={'CART'}/>
      </div>

      <div className='mt-10'>
        {
        
          cartDetails.map((cartItem, index) => {
            const combinedArray = [...products, ...services];

            const item = combinedArray.find((_item) => _item._id === cartItem._id);

            return (
              <div key={index} className='flex items-center justify-between border-b border-gray-300 py-8 w-9/10 sm:w-19/20 mx-auto'>
                <div className='flex items-center gap-3'>
                  <img src={item.image[0]} alt={item.name} className='w-20 sm:w-30'/>
                  <div>
                    <h1 className='text-xl'>{item.name}</h1>
                    <p className='text-gray-500'>{cartItem._attribute}</p>
                    <p className='text-gray-500'>{currency}{item.price}.00</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button onClick={() => updateQuantity(item._id, cartItem._attribute, -1)} className='border border-gray-300 px-2 py-1 rounded-full cursor-pointer'>-</button>
                  <p>{cartItem.quantity}</p>
                  <button onClick={() => updateQuantity(item._id, cartItem._attribute, 1)} className='border border-gray-300 px-2 py-1 rounded-full cursor-pointer'>+</button>
                  <img onClick={() => updateQuantity(item._id, cartItem._attribute, 0)} src={assets.bin_icon} className='w-4 sm:w-5 sm:ml-2 mb-[1.5px] cursor-pointer' alt="" />
                </div>
                
                  
                
              </div>
              )
          })
        }
      </div>

        <div className='flex justify-center sm:justify-end my-25'>
          <div className='w-9/10 sm:w-[600px]'>
          <CartCost/>
          <div className='w-full text-end'>
            <button onClick={() => navigate('/checkout')} className='text-sm bg-black text-white mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer'>CHECKOUT</button>
          </div>
          </div>
        
        </div>
      

    </div>
  ) : <div className='border-t min-h-[500px] sm:min-h-[700px] border-gray-300 pt-14 text-center'>
    <div className='text-3xl mb-3'>
        <Title text1={'YOUR CART IS'} text2={'EMPTY'}/>
      </div>
  </div>
}

export default Cart