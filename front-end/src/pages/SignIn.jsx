import React, { useEffect } from 'react'
import { useState } from 'react'

const SignIn = () => {

  const [currentState, setCurrentState] = useState('Sign Up');
  const [userType, setUserType] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();  
  }

  useEffect(() => {
    console.log(userType)
  }, [userType])

  return (
    <div className='border-t border-gray-300'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-140 text-gray-700 m-auto mt-14 gap-6 mb-10'>
      <div className='inline-flex gap-2 items-center mb-10 mt-7'>
        <p className='barlow-regular-italic text-5xl'>{currentState}</p>
      </div>
      {currentState === 'Login' ? '' : <input type="text" className='w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl' placeholder='Name' required/>}
      <input type="email" className='w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl' placeholder='Email' required/>
      <input type="password" className='w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl' placeholder='Password' required/>
      {currentState === 'Login' ? '' : 
      <select onChange={(e) => setUserType(e.target.value)} defaultValue={""} name="user_type" className='w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl' required>
        <option value="" disabled hidden>ARE YOU HERE AS A BUYER OR SELLER?</option>
        <option value="buyer">BUYER</option>
        <option value="seller">SELLER</option>
      </select>
      }
      {
        currentState === 'Sign Up' && userType === 'seller' ? 
        <select name="business_scale" defaultValue={""} className='w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl' required>
        <option value="" disabled hidden>PLEASE SELECT THE SCALE OF YOUR BUSINESS</option>
        <option value="small">SMALL</option>
        <option value="medium">MEDIUM</option>
        <option value="large">LARGE</option>
      </select> : ''
        
      }
      <div className='w-full flex justify-between px-2 text-md mt-[-4px]'>
        <p className='cursor-pointer'>FORGOT YOUR PASSWORD?</p>
        {
          currentState === 'Login' ?
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>CREATE AN ACCOUNT</p>
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>SIGN IN</p>
        }
      </div>

      <button className='text-lg bg-black text-white rounded-xl sm:min-w-60 mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer'>{currentState === 'Login' ? 'SIGN IN' : 'SIGN UP'}</button>
      
    </form>
    </div>
    
  )
}

export default SignIn