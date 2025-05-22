import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import "../SellSidebar.css";

const SellSidebar = () => {
  return (
    <div className="w-[15%] min-h-screen border-r-2 border-gray-200">
      <div className="flex flex-col gap-5 pt-7 pl-[10%] mr-3 md:mr-15 text-[14px]">
        <NavLink
          className={({ isActive }) =>
            `flex gap-3 items-center border border-gray-300 border-r-1 px-4 py-3 rounded-3xl${
              isActive ? " sell-sidebar-active" : ""
            }`
          }
          to={"/sell/publish"}
        >
          <img className="w-7 h-7 sm:w-9 sm:h-9" src={assets.add_icon} alt="" />
          <p className="md:block hidden">Publish Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex gap-3 items-center border border-gray-300 border-r-1 px-4 py-3 rounded-3xl${
              isActive ? " sell-sidebar-active" : ""
            }`
          }
          to={"/sell/list"}
        >
          <img
            className="w-7 h-7 sm:w-9 sm:h-9"
            src={assets.list_icon}
            alt=""
          />
          <p className="md:block hidden">List Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex gap-3 items-center border border-gray-300 border-r-1 px-4 py-3 rounded-3xl${
              isActive ? " sell-sidebar-active" : ""
            }`
          }
          to={"/sell/orders"}
        >
          <img
            className="w-7 h-7 sm:w-9 sm:h-9"
            src={assets.orders_icon}
            alt=""
          />
          <p className="md:block hidden">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SellSidebar;
