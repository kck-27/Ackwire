import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ServiceItem from '../components/ServiceItem';

const Services = () => {

  const { services, search, displaySearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterServices, setFilterServices] = useState([]);
    const [category, setCategory] = useState([]);
    const [companyScale, setCompanyScale] = useState([]);
    const [sortOption, setSortOption] = useState('popularity');
  
    const companyScaleMapping = {
      Small: "S",
      Medium: "M",
      Large: "L",
    };
  
    const filterCategory = (e) => {
      if(category.includes(e.target.value)){
        setCategory(category.filter(item => item !== e.target.value))
      } else {  
        setCategory([...category, e.target.value])
      }
    }
  
    const filterCompanyScale = (e) => {
      const mappedValue = companyScaleMapping[e.target.value];
      if(companyScale.includes(mappedValue)){
        setCompanyScale(companyScale.filter(item => item !== mappedValue))
      } else {  
        setCompanyScale([...companyScale, mappedValue])
      }
    }
  
    const applyFilter = () => {
      let filteredServices = services.slice();
  
      if(displaySearch && search){
        const searchWords = search.toLowerCase().split(' ');
  
        filteredServices = filteredServices.filter(service => {
        const serviceName = service.name.toLowerCase().split(' ');
        return searchWords.every(word =>
          serviceName.some(serviceWord => serviceWord.includes(word))
        );
      });
      }
  
      if(category.length > 0){
        filteredServices = filteredServices.filter(service => category.includes(service.category))
      }
  
      if(companyScale.length > 0){
        filteredServices = filteredServices.filter(service => companyScale.includes(service.companyScale))
      }
      setFilterServices(filteredServices)
    }
  
    const sortServices = () => {
      let tempFilteredServices = filterServices.slice();
      
      switch(sortOption){
        case 'price-low-high':
          setFilterServices(tempFilteredServices.sort((a, b) => a.price - b.price))
          break;
        case 'price-high-low':
          setFilterServices(tempFilteredServices.sort((a, b) => b.price - a.price))
          break;
        default:
          applyFilter();
          break;
      }
    }
  
    useEffect(() => {
      sortServices()
    }, [sortOption])
  
    useEffect(() => {
      applyFilter()
    }, [category, companyScale, search, displaySearch])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300 mb-20'>
      {/* Filters */}
        <div className='min-w-60'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER
          <img className={`h-4 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
            {/* Category */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>  
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-900'>
              {
      [...new Set(services.map(service => service.category))].map((category, index) => (
        <p key={index} className='flex gap-2'>
          <input 
            className='w-4 black-checkbox' 
            type="checkbox" 
            value={category} 
            onChange={filterCategory} 
          /> 
          {category}
        </p>
      ))
    }
              </div>
            </div>
            {/* Company Scale */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>  
              <p className='mb-3 text-sm font-medium'>Company Scale</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-900'>
                <p className='flex gap-2'>
                  <input className='w-4 black-checkbox' type="checkbox" value={'Small'} onChange={filterCompanyScale}/> Small
                </p>
                <p className='flex gap-2'>
                  <input className='w-4 black-checkbox' type="checkbox" value={'Medium'} onChange={filterCompanyScale}/> Medium
                </p>
                <p className='flex gap-2'>
                  <input className='w-4 black-checkbox' type="checkbox" value={'Large'} onChange={filterCompanyScale}/> Large
                </p>
              </div>
            </div>
        </div>

        {/* Services Display */}
        <div className='flex-1'>

            <div className='flex justify-between text-xl sm:text-3xl mb-4'>
              <Title text1={'ALL'} text2={'SERVICES'}/>
              {/* Sort */}
              <p className='flex text-base items-center mb-3 sm:mb-0'>Sort by:  
              <select onChange={(e) => setSortOption(e.target.value)} className='border-2 border-gray-300 text-md px-2 py-3 ml-2 sm:mr-25'>
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price High to Low</option>
              </select>
              </p>
            </div>

            {/* Service Mapping */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterServices.map((serviceItem, serviceIndex)=>(
                  <ServiceItem key={serviceIndex} id={serviceItem._id} name={serviceItem.name} images={serviceItem.image} price={serviceItem.price}/>
                ))
              }
            </div>

        </div>
    </div>
  )
}

export default Services