import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import Popular from '../components/Popular'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { ShopContext } from '../context/ShopContext'

const Home = () => {

  const {loading, setLoading} = useContext(ShopContext);

useEffect(() => {
setLoading(false);
}, []);

  return (
    <div className='border-t border-gray-300 pt-10'>
      <Hero/>
      <Popular/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home