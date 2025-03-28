import React from 'react'
import Hero from '../components/Hero'
import Popular from '../components/Popular'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
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