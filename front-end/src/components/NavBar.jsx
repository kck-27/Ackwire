import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = ({sellerToken, setToken, setSellertoken}) => {
  const [visible, setVisible] = useState(false);
  const {setDisplaySearch, getTotalQuantity, navigate} = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">

      <Link to='/'><img src={assets.ackwire_logo} className="w-28" alt="" /></Link>
      
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col gap-1 items-center">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/products" className="flex flex-col gap-1 items-center">
          <p>PRODUCTS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/services" className="flex flex-col gap-1 items-center">
          <p>SERVICES</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col gap-1 items-center">
          <p>ABOUT US</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contacts" className="flex flex-col gap-1 items-center">
          <p>CONTACTS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img onClick={() => setDisplaySearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <Link to={'/sign-in'}>
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-50 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/purchases')} className="cursor-pointer hover:text-black">Purchases</p>
              {sellerToken === "" ? "" : <p className="cursor-pointer hover:text-black" onClick={() => navigate('/sell')}>Sell</p>}
              <p onClick={() => {setToken(""); setSellertoken(""); navigate('/sign-in')}} className="cursor-pointer  hover:text-black">Sign Out</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {
              getTotalQuantity()
            }
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Side menu */}
      <div className={`absolute bottom-0 top-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div className="flex items-center gap-4 p-3 cursor-pointer" onClick={() => setVisible(false)}>
              <img src={assets.dropdown_icon} className="rotate-180 h-6" alt="" />
          </div>
          <div className="w-full items-center flex flex-col">
          <NavLink onClick={() => setVisible(false)} to="/" className="py-3">HOME</NavLink>
            <hr className="w-3/4 border-none h-[0.25px] bg-gray-400" />
          </div>

          <div className="w-full items-center flex flex-col">
          <NavLink onClick={() => setVisible(false)} to="/products" className="py-3">PRODUCTS</NavLink>
            <hr className="w-3/4 border-none h-[0.25px] bg-gray-400" />
          </div>

          <div className="w-full items-center flex flex-col">
          <NavLink onClick={() => setVisible(false)} to="/services" className="py-3">SERVICES</NavLink>
            <hr className="w-3/4 border-none h-[0.25px] bg-gray-400" />
          </div>

          <div className="w-full items-center flex flex-col">
          <NavLink onClick={() => setVisible(false)} to="/about" className="py-3">ABOUT US</NavLink>
            <hr className="w-3/4 border-none h-[0.25px] bg-gray-400" />
          </div>

          <div className="w-full items-center flex flex-col">
          <NavLink onClick={() => setVisible(false)} to="/contacts" className="py-3">CONTACTS</NavLink>
          </div>
          
          
        </div>
      </div>

    </div>
  );
};

export default NavBar;
