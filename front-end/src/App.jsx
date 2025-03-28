import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Contacts from './pages/Contacts'
import Product from './pages/Product'
import Products from './pages/Products'
import Purchase from './pages/Purchase'
import Purchases from './pages/Purchases'
import SignIn from './pages/SignIn'
import NavBar from './components/NavBar'
import Services from './pages/Services'
import Service from './pages/Service'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Checkout from './pages/Checkout'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col min-h-screen'>
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />

      <NavBar/>
      
      <SearchBar/>

      <div className='flex-grow'>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/contacts' element={<Contacts/>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/purchase' element={<Purchase/>}/>
      <Route path='/purchases' element={<Purchases/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/service/:serviceId' element={<Service/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
      </div>
      

      <Footer/>
    </div>
    
  )
}

export default App  