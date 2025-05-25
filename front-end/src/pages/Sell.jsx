import React from "react";
import SellSidebar from "../components/SellSidebar";
import { Route, Routes } from "react-router-dom";
import Publish from "./Publish";
import List from "./List";
import Orders from "./Orders";
import Edit from "./Edit";

const Sell = ({ sellerToken, userEmail, userBusinessScale }) => {
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
                    <Route path="/publish" element={<Publish sellerToken={sellerToken} userEmail={userEmail} userBusinessScale={userBusinessScale}/>} />
                    <Route path="/list" element={<List sellerToken={sellerToken} userEmail={userEmail} userBusinessScale={userBusinessScale}/>} />
                    <Route path="/orders" element={<Orders sellerToken={sellerToken} userEmail={userEmail} userBusinessScale={userBusinessScale}/>} />
                    <Route path="/edit" element={<Edit sellerToken={sellerToken} userEmail={userEmail} userBusinessScale={userBusinessScale}/>} />
                </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sell;
