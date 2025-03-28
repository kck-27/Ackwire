import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartCost = () => {

    const {getFullCost, currency, delivery_fee} = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-3xl'>
            <Title text1='TOTAL' text2='Cost'/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text- sm:text-lg'>
        <div className='flex justify-between items-center mb-3 border-t border-gray-300 pt-3'>
            <p>Subtotal</p>
            <p>{currency}{getFullCost()}.00</p>
        </div>
        <div className='flex justify-between items-center mb-3 border-b border-gray-300 pb-3'>
            <p>Delivery Fee</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <div className='flex justify-between items-center mb-3'>
            <b>Total</b>
            <b>{currency}{getFullCost() + delivery_fee}.00</b>
        </div>
        </div>
        
        
    </div>
  )
}

export default CartCost