import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category, companyScale}) => {

    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
         let relatedProducts = products.slice();
         relatedProducts = relatedProducts.filter(product => category.includes(product.category) && companyScale.includes(product.companyScale));
         setRelated(relatedProducts.slice(0, 5));
        }
    }, [products]);

  return (
    <div className='my-24'>
        <div className='text-3xl py-2 text-center'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gapy-6 mt-10'>
            {
                related.map((productItem, productIndex) => (
                    <ProductItem key={productIndex} id={productItem._id} name={productItem.name} images={productItem.image} price={productItem.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProducts