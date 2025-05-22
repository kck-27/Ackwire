import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendURL } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../App";
import { assets } from "../assets/assets";

const List = ({ sellerToken, userEmail, userBusinessScale }) => {
  const [currentState, setCurrentState] = useState("");
  const [items, setItems] = useState([]);

  const deleteItem = async (itemId) => {

  }

  const editItem = async (itemId) => {
    
  }

  useEffect(() => {
    if (!currentState) {
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.post(
          `${backendURL}/api/${currentState}/all-by-email`,
          { userEmail }
        );
        if (res.data.status === "successful") {
          setItems(res.data[currentState]);
        } else {
          toast.error(res.data.message);
        }
        
      } catch (error) {
        console.log(error);
              toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchItems();
  }, [currentState]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
    <div  className="w-full flex flex-col sm:flex-row text-center">
    <div className="w-full">
      {/* <p className="mb-3 pl-1">Products or Services? </p> */}
      <select
        onChange={(e) => {
          setCurrentState(e.target.value);
        }}
        value={currentState}
        name="currentState"
        className=" px-3 py-2 border border-gray-300 rounded-xl"
        required
      >
        <option value="" disabled hidden>
          Products or Services?
        </option>
        <option value="products">Products</option>
        <option value="services">Services</option>
      </select>
    </div>
    </div>
    



    <div className="flex flex-col gap-5 mt-10">
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-xl p-4 flex flex-col gap-2 items-center sm:gap-10 sm:flex-row min-w-0 w-full"
          >
            <img src={item.image[0]} alt="" className="sm:w-[10%] rounded-2xl border border-gray-300"/>
            <p className="sm:w-[15%] break-words text-lg font-medium pl-5">{item.name}</p>
            <p className="sm:w-[43%] break-words text-lg pl-3">{item.description.slice(0, 40)}</p>
            <p className="sm:w-[7%] break-words text-lg font-medium">{currency}{item.price}.00</p>
            <div className="sm:w-15 flex flex-row gap-5">
            <img className="w-10 sm:w-[55%] cursor-pointer" src={assets.edit_icon} alt="" />
            <img className="w-8 sm:w-[45%] cursor-pointer" src={assets.bin_icon} alt="" />
            </div>
            
          </div>
        ))
      ) : (
        <p>No items to list</p>
      )}
      </div>
    </>
    
  );
};

export default List;
