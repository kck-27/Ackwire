import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from './Title'
import ServiceItem from './ServiceItem'

const RelatedServices = ({category, companyScale}) => {

    const {services} = useContext(ShopContext);
        const [related, setRelated] = useState([]);
    
        useEffect(() => {
            if (services.length > 0) {
             let relatedServices = services.slice();
             relatedServices = relatedServices.filter(service => category.includes(service.category) && companyScale.includes(service.companyScale));
             setRelated(relatedServices.slice(0, 5));
            }
        }, [services]);

  return (
    <div className='my-24'>
        <div className='text-3xl py-2 text-center'>
            <Title text1={'RELATED'} text2={'SERVICES'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gapy-6 mt-10'>
            {
                related.map((serviceItem, serviceIndex) => (
                    <ServiceItem key={serviceIndex} id={serviceItem._id} name={serviceItem.name} images={serviceItem.image} price={serviceItem.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default RelatedServices