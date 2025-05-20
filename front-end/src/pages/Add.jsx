import React from 'react'
import { assets } from '../assets/assets'

const Add = ({sellerToken}) => {
  return (
    <form className='flex flex-col items-start gap-4 w-full text-[14px] font-medium'>

        <div className='w-full'>
            <p className='mb-3'>Product Name: </p>
            <input className='w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300' type="text" placeholder='Enter product name' required/>
        </div>

        <div className='w-full'>
            <p className='mb-3'>Product Description: </p>
            <textarea className='w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300' type="text" placeholder='Describe your product briefly' required/>
        </div>

        <div className='w-full'>
            <p className='mb-3'>Product Category: </p>
            <select className='rounded border border-gray-300'>
                <option value="Electronics">Electronics</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Sports">Sports</option>
                <option value="Beauty">Beauty</option>
                <option value="Fashion">Fashion</option>
                <option value="Accessories">Accessories</option>
            </select>
        </div>

        <div className='w-full'>
            <p className='mb-3'>Product Sub-Category: </p>
            <select className='rounded border border-gray-300'>
                <option value="Accessories">Accessories</option>
                <option value="Audio">Audio</option>
                <option value="Bags">Bags</option>
                <option value="Bedding">Bedding</option>
                <option value="Bottles">Bottles</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Decor">Decor</option>
                <option value="Dresses">Dresses</option>
                <option value="Fitness">Fitness</option>
                <option value="Footwear">Footwear</option>
                <option value="Grooming">Grooming</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Monitors">Monitors</option>
                <option value="Security">Security</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Tables">Tables</option>
                <option value="TVs">TVs</option>
                <option value="Wallets">Wallets</option>
                <option value="Wearables">Wearables</option>
            </select>
        </div>

        <div>
            <p className='mb-3'>Attach Images: </p>
            <div className='flex gap-4'>
                <label htmlFor="image1">
                    <img className='w-15 border border-gray-400 rounded-lg p-2' src={assets.attach_icon} alt="" />
                    <input type="file" id='image1' hidden/>
                </label>

                <label htmlFor="image2">
                    <img className='w-15 border border-gray-400 rounded-lg p-2' src={assets.attach_icon} alt="" />
                    <input type="file" id='image2' hidden/>
                </label>

                <label htmlFor="image3">
                    <img className='w-15 border border-gray-400 rounded-lg p-2' src={assets.attach_icon} alt="" />
                    <input type="file" id='image3' hidden/>
                </label>

                <label htmlFor="image4">
                    <img className='w-15 border border-gray-400 rounded-lg p-2' src={assets.attach_icon} alt="" />
                    <input type="file" id='image4' hidden/>
                </label>
            </div>
        </div>
    </form>
  )
}

export default Add