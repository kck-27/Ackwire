import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { assets } from '../assets/assets';
import RelatedServices from '../components/RelatedServices';
import Spinner from '../components/Spinner';

const Service = () => {

  const {serviceId} = useParams();
  const {services, currency, addToCart, loading, setLoading} = useContext(ShopContext);
  const [serviceObject, setServiceObject] = useState(false);
  const [image, setImage] = useState('');
  const [mode, setMode] = useState('');

  const loadServiceObject = async () => {
    services.map((service) => {
      if(service._id === serviceId){
        setServiceObject(service);
        setImage(service.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    setLoading(true);
  loadServiceObject();
  setLoading(false);
  }, [serviceId, services]);

    if (loading) {
  return (
        <Spinner />  
  );
}

  return serviceObject ? (
    <div className='border-t border-gray-300 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
      {/* Images Short Description */}
      <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>
        {/* Rendering Images */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-5'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[10%] h-auto sm:h-full'>
            {
              serviceObject.image.map((imageItem, index) => (
                <img onClick={() => setImage(imageItem)} key={index} src={imageItem} alt={serviceObject.title} className={`w-[24%] sm:mb-3 sm:w-full flex-shrink-0 cursor-pointer border rounded-2xl ${imageItem === image ? 'border-gray-500 border-4' : 'border-transparent'}`}/>
              ))
            }
          </div>
          <div className='w-full sm:w-[88%] sm:mb-3'>
            <img src={image} alt={serviceObject.title} className='w-full h-auto object-contain rounded-2xl'/>
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

        {/* Rendering Service Details */}
        <div className='flex-1'>
          <h1 className='text-4xl font-medium'>{serviceObject.name}</h1>
          <div className='flex items-center mt-4 gap-1'>
            <img src={assets.star_icon} alt="" className="w-4" />            
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className='pl-3'>({serviceObject.rating})</p>
          </div>
          <p className='mt-15 text-lg font-small md:w-9/10 text-gray-700'>
            {serviceObject.description}
          </p>
          <ul className='mt-10 ml-6 text-md font-medium text-gray-500'>
            {
              serviceObject.features.map((feature, index) =>(
                <li key={index} className='flex items-center'><p className='min-w-2 h-2 rounded-full bg-gray-900'></p> <span className='ml-4'>{feature}</span></li>
              ))
            }
          </ul>
          <p className='font-small text-xl mt-10'>
            Hourly rate: {currency}{serviceObject.price}.00
          </p>
          
          <div className='flex flex-col my-8 gap-4'>
            <p className='text-[16px]'>SELECT MODE OF DELIVERY</p>
            <div className='gap-2 flex'>
              {
                serviceObject.mode.map((mode1, index) => (
                  <button key={index} className={`py-2 px-4 border bg-gray-200 cursor-pointer ${mode1 === mode ? 'border-gray-400' : 'border-transparent'}`} onClick={() => setMode(mode1)}>{mode1}</button>
                ))
              }
            </div>
          </div>
          <hr className='mt-8 sm:w-9/10 border-gray-300'/>
          <div className='flex flex-col mt-5 gap-2 text-xs text-gray-500'>
          {
              serviceObject.terms.map((term, index) => (
                <p key={index}>{term}</p>
              ))
            }
          </div>
          <div className='flex sm:w-9/10 justify-end sm:mt-8'>
          <button onClick={() => addToCart(serviceObject._id, mode)} className='text-sm bg-black text-white mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer'>ADD TO CART</button>
          </div>
        </div>
      </div>

      {/* Additional Information/Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border-t border-l border-r border-gray-400 px-5 py-3 text-lg rounded-tl-2xl rounded-tr-2xl'>Additional Information</p>
          {/* <p className='border border-gray-300 px-5 py-3 text-lg  rounded-tr-2xl'>Customer Reviews</p> */}
        </div>
        <div className='flex flex-col gap-4 p-6 justify-start items-start text-sm border border-gray-400 rounded-2xl rounded-tl-none text-gray-500'>
        {
            serviceObject.more_info.map((info_item, index) => (
                              <p className='text-[13px] font-medium my-3 sm:my-6 sm:mx-15 flex' key={index}><span className='pr-4 mt-4'><img className='w-5 h-5' src={assets.dropdown_icon} alt="" /></span>{info_item}</p>

            ))
          }
        </div>
      </div>

      {/* Related Services */}
      <RelatedServices category={serviceObject.category} companyScale={serviceObject.companyScale}/>

    </div>
  ) : <div className='flex h-screen text-4xl text-gray-500 w-full justify-center items-center'>
    <p>ITEM NOT FOUND</p>
    </div>
}

export default Service