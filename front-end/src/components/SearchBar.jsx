import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { use } from 'react';

const SearchBar = () => {

const { search, setSearch, displaySearch, setDisplaySearch } = useContext(ShopContext);
const [visible, setVisible] = useState(false);
const location = useLocation();

useEffect(() => {
  if(location.pathname.includes('products') || location.pathname.includes('services')){
    setVisible(true);
  } else {
        setVisible(false);  
    }
}, [location]);

  return displaySearch && visible ? (
    <div className='text-center pb-5'>
        <div className='justify-center items-center inline-flex border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
            <img className='w-4' src={assets.search_icon} alt="" />
        </div>
        <img onClick={() => setDisplaySearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar