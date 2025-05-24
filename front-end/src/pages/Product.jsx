import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import Spinner from '../components/Spinner';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart, loading, setLoading} = useContext(ShopContext);
  const [productObject, setProductObject] = useState(false);
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');

  const loadProductObject = async () => {
    products.map((product) => {
      if(product._id === productId){
        setProductObject(product);
        setImage(product.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    setLoading(true);
  loadProductObject();
  setLoading(false);
  }, [productId, products]);

    if (loading) {
  return (
        <Spinner />  
  );
}

  return productObject ? (
    <div className='border-t border-gray-300 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
      {/* Images Short Description */}
      <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>
        {/* Rendering Images */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-5'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[10%]'>
            {
              productObject.image.map((imageItem, index) => (
                <img onClick={() => setImage(imageItem)} key={index} src={imageItem} alt={productObject.title} className={`w-[24%] sm:mb-3 sm:w-full flex-shrink-0 cursor-pointer border rounded-2xl ${imageItem === image ? 'border-gray-500 border-4' : 'border-transparent'}`}/>
              ))
            }
          </div>
          <div className='w-full sm:w-[88%] sm:mb-3'>
            <img src={image} alt={productObject.title} className='w-full h-auto object-contain rounded-2xl'/>
          </div>
        </div>

        {/* <div className='flex flex-col'>
          <div className='h-1/20'></div>
          <div className='h-18/20 flex flex-row'>
          <div className='w-1/2 sm:border sm:border-r sm:border-gray-300'></div>
          <div className='w-1/2'></div>
          </div>
          <div className='h-1/20'></div>
        </div> */}


        {/* Rendering Product Details */}
        <div className='flex-1'>
          <h1 className='text-4xl font-medium'>{productObject.name}</h1>
          <div className='flex items-center mt-4 gap-1'>
            <img src={assets.star_icon} alt="" className="w-4" />            
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className='pl-3'>({productObject.rating})</p>
          </div>
          <p className='mt-15 text-lg font-small md:w-9/10 text-gray-700'>
            {productObject.description}
          </p>
          <ul className='mt-10 ml-6 text-md font-medium text-gray-500'>
            {
              productObject.features.map((feature, index) =>(
                <li key={index} className='flex items-center'><p className='min-w-2 h-2 rounded-full bg-gray-900'></p> <span className='ml-4'>{feature}</span></li>
              ))
            }
          </ul>
          <p className='font-small text-xl mt-10'>
            Unit price: {currency}{productObject.price}.00
          </p>
          
          <div className='flex flex-col my-8 gap-4'>
            <p className='text-[16px]'>SELECT COLOR</p>
            <div className='gap-2 flex'>
              {
                productObject.color.map((color1, index) => (
                  <button key={index} className={`py-2 px-4 border bg-gray-200 cursor-pointer ${color1 === color ? 'border-gray-400' : 'border-transparent'}`} onClick={() => setColor(color1)}>{color1}</button>
                ))
              }
            </div>
          </div>
          <hr className='mt-8 sm:w-9/10 border-gray-300'/>
          <div className='flex flex-col mt-5 gap-2 text-sm text-gray-500'>
            {
              productObject.terms.map((term, index) => (
                <p key={index}>{term}</p>
              ))
            }
          </div>
          <div className='flex sm:w-9/10 justify-end sm:mt-8'>
          <button onClick={() => addToCart(productObject._id, color)} className='text-sm bg-black text-white mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer'>ADD TO CART</button>
          </div>
        </div>
      </div>

      {/* Additional Information/Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border border-gray-500 px-5 py-3 text-lg font-bold rounded-tl-2xl'>Additional Information</p>
          <p className='border border-gray-300 px-5 py-3 text-lg  rounded-tr-2xl'>Customer Reviews</p>
        </div>
        <div className='flex flex-col gap-4 p-6 justify-start items-start text-sm border border-gray-400 rounded-2xl rounded-tl-none text-gray-500'>
        {
            productObject.more_info.map((info_item, index) => (
              <i className='text-lg font-medium my-6 mx-15' key={index}>{info_item}</i>
            ))
          }
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productObject.category} companyScale={productObject.companyScale}/>

    </div>
  ) : <div className='flex h-screen text-4xl text-gray-500 w-full justify-center items-center'>
    <p>ITEM NOT FOUND</p>
    </div>
}

export default Product