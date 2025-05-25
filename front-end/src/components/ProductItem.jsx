import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom';

const ProductItem = ({id, name, images, price}) => {

    const {currency, loading, setLoading} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' onClick={() => setLoading(true)} to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out rounded-2xl' src={images[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'><span className='font-light right-[-5px] bottom-[-5px]'>{currency}</span>{price}.00</p>
    </Link> 
  )
}

export default ProductItem