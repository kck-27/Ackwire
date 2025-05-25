import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contacts from "./pages/Contacts";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import Purchases from "./pages/Purchases";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Checkout from "./pages/Checkout";
import { ToastContainer, toast } from "react-toastify";
import Sell from "./pages/Sell";
import Validate from "./pages/Validate";
import Profile from "./pages/Profile";

export const backendURL = import.meta.env.VITE_BACKEND_URL;
export const currency = import.meta.env.VITE_CURRENCY;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  const [sellertoken, setSellertoken] = useState(localStorage.getItem("sellertoken")?localStorage.getItem("sellertoken"):"");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail")?localStorage.getItem("userEmail"):"");
  const [userBusinessScale, setUserBusinessScale] = useState(localStorage.getItem("userBusinessScale")?localStorage.getItem("userBusinessScale"):"");

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("sellertoken", sellertoken);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userBusinessScale", userBusinessScale);
  }, [token, sellertoken, userEmail, userBusinessScale]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col min-h-screen">
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

      <div>
          <NavBar token={token} sellerToken={sellertoken} setToken={setToken} setSellertoken={setSellertoken} setUserEmail={setUserEmail} setUserBusinessScale={setUserBusinessScale}/>

          <SearchBar />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/purchases" element={<Purchases token={token} sellerToken={sellertoken} userEmail={userEmail}/>} />
              <Route path="/sign-in" element={<SignIn setToken={setToken} setSellertoken={setSellertoken} setUserEmail={setUserEmail} setUserBusinessScale={setUserBusinessScale}/>} />
              <Route path="/services" element={<Services />} />
              <Route path="/service/:serviceId" element={<Service />} />
              <Route path="/checkout" element={<Checkout token={token} sellerToken={sellertoken} userEmail={userEmail}/>} />
              <Route path="/sell/*" element={<Sell sellerToken={sellertoken} userEmail={userEmail} userBusinessScale={userBusinessScale}/>} />
              <Route path="/validate" element={<Validate token={token}/>} />
              <Route path="/profile" element={<Profile token={token}/>} />
              
            </Routes>
          </div>

          <Footer />
        </div>

      {/* {token === "" ? (
        <div>
          <NavBar token={token} sellerToken={sellertoken} setToken={setToken} setSellertoken={setSellertoken}/>
          <SearchBar/>
                  <SignIn setToken={setToken} setSellertoken={setSellertoken} setUserEmail={setUserEmail} setUserBusinessScale={setUserBusinessScale}/>
          <Footer />
        </div>
      ) : (
        <div>
          <NavBar sellerToken={sellertoken} setToken={setToken} setSellertoken={setSellertoken}/>

          <SearchBar />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service/:serviceId" element={<Service />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/sell/*" element={<Sell sellerToken={sellertoken} userEmail={userEmail} userBusinessScale={userBusinessScale}/>} />
            </Routes>
          </div>

          <Footer />
        </div>
      )} */}

      {/* <NavBar/>
      
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
      

      <Footer/> */}
    </div>
  );
};

export default App;
