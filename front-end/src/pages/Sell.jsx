import React from "react";
import SellSidebar from "../components/SellSidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Add";
import List from "./List";
import Orders from "./Orders";

const Sell = ({ sellerToken }) => {
  return (
    <>
      {sellerToken === "" ? (
        <div>Unauthorized</div>
      ) : (
        <div className="border-t border-gray-300 pt-10 pb-10 min-h-screen">
          <div className="flex w-full">
            <SellSidebar />
            <div className="w-[75%] mx-auto ml-[max(5vw, 20px)] my-8 text-gray-500 text-base">
                <Routes>
                    <Route path="/add" element={<Add sellerToken={sellerToken} />} />
                    <Route path="/list" element={<List sellerToken={sellerToken} />} />
                    <Route path="/orders" element={<Orders sellerToken={sellerToken} />} />
                </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sell;
