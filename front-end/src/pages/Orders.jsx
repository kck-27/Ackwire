import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { backendURL } from '../App';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import Spinner from '../components/Spinner';

const Orders = ({sellerToken, userEmail, userBusinessScale}) => {

  const {currency, loading, setLoading} = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);

  const fetchOrders = async () => {
    if (!sellerToken) {
      return null;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/orders/get-by-seller`, {userEmail}, {headers: {sellerToken}});
      if (res.data.status === "successful") {
        console.log(res.data)
        setOrders(res.data.orders)
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
            toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  const updateItems = async () => {
    let tempItems = [];
    orders.forEach(order => {
      order.items.forEach(item => {
          if (item.userEmail === userEmail) {
          item.purchasedDate = order.date;
          item.address = order.address;
          item.orderId = order._id;
          tempItems.push(item);
      }});
    });
    tempItems.sort((a, b) => b.purchasedDate - a.purchasedDate);
    setItems(tempItems);
  }

  const handleStatusUpdates = async (e, orderId, itemId, selectedColor="", selectedMode="") => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/orders/update`, {orderId, itemId, selectedColor, selectedMode, updateFields: {status: e.target.value} }, {headers: {sellerToken}});
      if (res.data.status === "successful") {
        await fetchOrders();
      }
    } catch (error) {
      console.log(error);
                    toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateItems();
  }, [orders]);

  useEffect(() => {
    fetchOrders();
  }, [sellerToken]);

    if (loading) {
  return (
        <Spinner />  
  );
}

  return (
    
    <div className=' pt-4 pb-4'>
      <div className='text-3xl'>
        <Title text1={'ORDERS OF YOUR'} text2={'PURCHASES'}/>
      </div>

      <div>
        { 
          items.map((item, index) => (
              <div key={index} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-t border-gray-300 py-4'>
              <div className='flex items-start gap-6 text-md'>
                <img src={item.image[0]} alt='' className='w-20 sm:w-30'/>
                <div className='flex items-start h-full my-auto flex-col gap-2'>
                <p className='font-medium text-lg sm:text-xl'>{item.name}</p>
                <div className=' flex items-center gap-3 mt-2 sm:mt-6 text-sm sm:text-md text-gray-600'>
                  <p className='text-sm sm:text-md'>{currency}{item.price}</p>
                  <p>QUANTITY: {item.quantity}</p>
                  { 'color' in item ? <p>COLOR: {item.selectedColor}</p> : 'mode' in item ? <p>MODE: {item.selectedMode}</p> : ''}
                </div>
                <p className='mt-0 text-sm sm:text-md'>DATE OF PURCHASE: <span className='text-gray-400 ml-2'>{new Date(item.purchasedDate).toLocaleDateString()}</span></p>
                </div>
              </div>

                <div className='flex flex-col items-center sm:items-start gap-1 sm:ml-0'>
                  <div className='flex text-sm md:text-base'> Name:
                  <p className='ml-1 text-sm md:text-base'>{item.address.firstName}</p>
                  <p className='ml-1 text-sm md:text-base'>{item.address.lastName}</p>
                  </div>
                  
                  <div className='flex text-sm md:text-base'>Address: 
                  <p className='ml-1 text-sm md:text-base'>{item.address.addressLine1},</p>
                  <p className='ml-1 text-sm md:text-base'>{item.address.addressLine2},</p>
                  <p className='ml-1 text-sm md:text-base'>{item.address.city},</p>
                  <p className='ml-1 text-sm md:text-base'>{item.address.stateProvince},</p>
                  <p className='ml-1 text-sm md:text-base'>{item.address.country}</p>
                  </div>
                  
                  <div className='flex text-sm md:text-base'>Email: 
                  <p className='ml-1 text-sm md:text-base'>{item.address.email}</p>
                  </div>

                  <div className='flex text-sm md:text-base'>Contact Number: 
                  <p className='ml-1 text-sm md:text-base'>{item.address.contactNumber}</p>
                  </div>
                  
                </div>
              <div className='flex justify-center sm:justify-between'>
                
                {/* <button className='text-md bg-white text-black mr-4 sm:mr-0 mt-5 mb-5 px-8 py-3 border border-gray-300 rounded-full active:bg-gray-300 cursor-pointer'>REFRESH</button> */}
                <select onChange={(e) => handleStatusUpdates(e, item.orderId, item._id, item.selectedColor, item.selectedMode)} value={item.status} className=" px-3 py-2 border border-gray-300 rounded-xl">
                  <option value="Order Submitted">Order Submitted</option>
                  <option value="Payment Pending">Payment Pending</option>
                  <option value="Preparing Order">Preparing Order</option>
                  {
                    'color' in item ? <option value="Ready to Dispatch">Ready to Dispatch</option>
                  : ""
                  }
                  {
                    'color' in item ? <option value="In Delivery">In Delivery</option> 
                  : ""
                  }
                  
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        }
      </div>
      </div>
  )
}

export default Orders