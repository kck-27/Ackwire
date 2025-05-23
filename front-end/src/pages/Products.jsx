import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { use } from 'react';

const Products = () => {

  const { products, search, displaySearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [companyScale, setCompanyScale] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');

  // const companyScaleMapping = {
  //   Small: "S",
  //   Medium: "M",
  //   Large: "L",
  // };

  const filterCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(category.filter(item => item !== e.target.value))
    } else {  
      setCategory([...category, e.target.value])
    }
  }

  const filterCompanyScale = (e) => {
    // const mappedValue = companyScaleMapping[e.target.value];
    if(companyScale.includes(e.target.value)){
      setCompanyScale(companyScale.filter(item => item !== e.target.value))
    } else {  
      setCompanyScale([...companyScale, e.target.value])
    }
  }

  const applyFilter = () => {
    let filteredProducts = products.slice();

    if(displaySearch && search){
      const searchWords = search.toLowerCase().split(' ');

      filteredProducts = filteredProducts.filter(product => {
      const productName = product.name.toLowerCase().split(' ');
      return searchWords.every(word =>
        productName.some(productWord => productWord.includes(word))
      );
    });
    }

    if(category.length > 0){
      filteredProducts = filteredProducts.filter(product => category.includes(product.category))
    }

    if(companyScale.length > 0){
      filteredProducts = filteredProducts.filter(product => companyScale.includes(product.companyScale))
    }

    if (sortOption === 'price-low-high') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      }
      if (sortOption === 'price-high-low') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }
    setFilterProducts(filteredProducts)
  }

  const sortProducts = () => {
    let tempFilteredProducts = filterProducts.slice();
    
    switch(sortOption){
      case 'price-low-high':
        setFilterProducts(tempFilteredProducts.sort((a, b) => a.price - b.price))
        break;
      case 'price-high-low':
        setFilterProducts(tempFilteredProducts.sort((a, b) => b.price - a.price))
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProducts()
  }, [sortOption])

  useEffect(() => {
    applyFilter()
  }, [category, companyScale, search, displaySearch, products])

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
      [...new Set(products.map(product => product.category))].map((category, index) => (
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
                  <input className='w-4 black-checkbox' type="checkbox" value={'small'} onChange={filterCompanyScale}/> Small
                </p>
                <p className='flex gap-2'>
                  <input className='w-4 black-checkbox' type="checkbox" value={'medium'} onChange={filterCompanyScale}/> Medium
                </p>
                <p className='flex gap-2'>
                  <input className='w-4 black-checkbox' type="checkbox" value={'large'} onChange={filterCompanyScale}/> Large
                </p>
              </div>
            </div>
        </div>

        {/* Products Display */}
        <div className='flex-1'>

            <div className='flex justify-between text-xl sm:text-3xl mb-4'>
              <Title text1={'ALL'} text2={'PRODUCTS'}/>
              {/* Sort */}
              <p className='flex text-base items-center mb-3 sm:mb-0'>Sort by:  
              <select onChange={(e) => setSortOption(e.target.value)} className='border-2 border-gray-300 text-md px-2 py-3 ml-2 sm:mr-25'>
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              </p>
            </div>

            {/* Product Mapping */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProducts.map((productItem, productIndex)=>(
                  <ProductItem key={productIndex} id={productItem._id} name={productItem.name} images={productItem.image} price={productItem.price}/>
                ))
              }
            </div>

        </div>
    </div>
  )
}

export default Products