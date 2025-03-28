import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='border-t border-gray-300 pt-14'>
      <div className='text-4xl text-center'>
        <Title text1='ABOUT' text2='US'/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img1} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/3 md:text-xl text-gray-600'>
          <p>At Ackwire, we believe in creating a seamless and dynamic marketplace that brings together the best of both products and services. Our platform is designed with you in mind—whether you're shopping for high-quality goods, exploring unique offerings, or searching for expert services, we make it easy to connect, discover, and transact.</p>
          <p>Founded on the idea of convenience, trust, and innovation, Ackwire offers a diverse selection of categories and sellers, ensuring you find exactly what you're looking for. We're more than just a platform—we're a community. At Ackwire, we value quality, reliability, and customer satisfaction above all else.</p>
          <p>Thank you for choosing Ackwire—where shopping and services meet, in one place.</p>
          <b className='text-gray-800 mt-15'>OUR GOAL:</b>
          <p>At Ackwire, our goal is simple: to provide a marketplace that empowers both buyers and sellers. We aim to create a platform that is not only easy to navigate but also fosters trust and convenience. By offering a wide variety of products and services in one place, we strive to make every transaction secure, reliable, and enjoyable. We are dedicated to continuously improving our platform, ensuring that each experience is seamless and that our community remains at the heart of everything we do.</p>
        </div>
      </div>

      <div className='text-4xl py-8 mt-20'>
        <Title text1='WHAT SETS US' text2='APART'/>
      </div>
      
      <div className='flex flex-col md:flex-row gap-8 mb-10'>

      <div className='flex flex-col items-center text-center gap-4 p-6 border border-gray-300'>
    <b className='text-xl text-gray-800'>Centralization of Products and Services</b>
    <p className='text-gray-600 max-w-3/4'>At Ackwire, we bring everything you need into one convenient place. Our platform seamlessly integrates both products and services, allowing you to shop and hire experts without the hassle of jumping between multiple sites. Whether you're purchasing goods or searching for professional services, everything is centralized for your convenience, making Ackwire your go-to destination for all your needs.</p>
  </div>
 
  <div className='flex flex-col items-center text-center gap-4 p-6 border border-gray-300'>
    <b className='text-xl text-gray-800'>Best Quality</b>
    <p className='text-gray-600 max-w-3/4'>We believe in offering only the best to our customers. Ackwire ensures that every product and service on our platform meets high standards of quality, reliability, and performance. From top-tier goods to trusted service providers, we carefully vet all listings to ensure you have access to the finest options available. When you choose Ackwire, you're choosing excellence.</p>
  </div>

  
  <div className='flex flex-col items-center text-center gap-4 p-6 border border-gray-300'>
    <b className='text-xl text-gray-800'>Customer Satisfaction</b>
    <p className='text-gray-600 max-w-3/4'>Your satisfaction is our top priority. At Ackwire, we’re committed to providing an experience that exceeds your expectations. From browsing to purchase or service selection, we aim to make every interaction smooth and enjoyable. Our dedicated support team is always here to assist you, ensuring that your needs are met with care and attention. Your happiness drives us to continually improve and innovate.</p>
  </div>

</div>
      <NewsletterBox/>

    </div>
  )
}

export default About