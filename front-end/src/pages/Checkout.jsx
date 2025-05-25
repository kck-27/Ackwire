import React, { useContext } from 'react'
import Title from '../components/Title'
import CartCost from '../components/CartCost'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner'

const Checkout = ({token, sellertoken, userEmail}) => {

    const {products, services, currency, cartItems, setCartItems, getTotalQuantity, getQuantityByItem, updateQuantity, delivery_fee, getFullCost, navigate, loading, setLoading} = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        streetName: '',
        city: '',
        zipCode: '',
        stateProvince: '',
        country: '',
        contactNumber: ''
    });

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setForm(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (products.length > 0 && services.length > 0) {
            setLoading(true);
                try {
            const combinedArray = [...products, ...services];
            let tempSellerEmails = [];
            let tempOrderDetails = [];

            for (const item in cartItems) {
                for (const attribute in cartItems[item]) {
                    if (cartItems[item][attribute] > 0) {
                        const itemDetails = structuredClone(combinedArray.find(arrayItem => arrayItem._id === item));
                        if (itemDetails) {
                            if ('color' in itemDetails) {
                                itemDetails.selectedColor = attribute;
                            }
                            if ('mode' in itemDetails) {
                                itemDetails.selectedMode = attribute;
                            }
                            itemDetails.quantity = cartItems[item][attribute];
                            itemDetails.status = "Order Submitted";
                            tempOrderDetails.push(itemDetails);
                            if (!tempSellerEmails.includes(itemDetails.userEmail)) {
                                tempSellerEmails.push(itemDetails.userEmail);
                            }
                        }
                        }
                    }
                }

                console.log(tempOrderDetails);
                console.log(tempSellerEmails);

                let orderObject = {
                    sellerEmails: tempSellerEmails,
                    items: tempOrderDetails,
                    price: getFullCost() + delivery_fee,
                    address: form
                }

                switch (paymentMethod) {
                    case 'cash_on_delivery':
                        const res = await axios.post(`${backendURL}/api/orders/create-cod`, orderObject, {headers: {token}});
                        if  (res.data.status === "successful") {
                            setCartItems({});
                            navigate('/purchases');
                        } else {
                            console.log(res.data.message);
                            toast.error(res.data.message);
                        }
                        break;
                    
                    case 'stripe':
                        console.log("from stripe")
                        const resStripe = await axios.post(`${backendURL}/api/orders/create-stripe`, orderObject, {headers: {token}});
                        if (resStripe.data.status === "successful") {
                            const {session_url} = resStripe.data;
                            window.location.replace(session_url);
                        } else {
                            toast.error(resStripe.data.message);
                        }
                        break;
                    default:
                        break;
                }
            
        } catch (error) {
            console.log(error);
              toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
            }
        

    }

      if (loading) {
  return (
        <Spinner />  
  );
}
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 justify-between pt-5 sm:pt-15 min-h-[80vh] border-t border-gray-300'>
        <div className='flex flex-col gap-4 w-full sm:w-2/5'>
            <div className='text-2xl sm:text-3xl my-3'>
                <Title text1='CHECKOUT' text2='DETAILS'/>
            </div>
            <div className='flex gap-3'>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='firstName' value={form.firstName} onChange={handleInputChange} type="text" placeholder='First name' required/>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='lastName' value={form.lastName} onChange={handleInputChange} type="text" placeholder='Last name' required/>
            </div>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='email' value={form.email} onChange={handleInputChange} type="email" placeholder='Email' required/>
            <div className='flex gap-3'>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='addressLine1' value={form.addressLine1} onChange={handleInputChange} type="text" placeholder='Address line 1' required/>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='addressLine2' value={form.addressLine2} onChange={handleInputChange} type="text" placeholder='Address line 2'/>
            </div>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='streetName' value={form.streetName} onChange={handleInputChange} type="text" placeholder='Street name' required/>
            <div className='flex gap-3'>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='city' value={form.city} onChange={handleInputChange} type="text" placeholder='City' required/>
                <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='zipCode' value={form.zipCode} onChange={handleInputChange} type="number" placeholder='Zip code' required/>
            </div>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='stateProvince' value={form.stateProvince} onChange={handleInputChange} type="text" placeholder='State/Provice' required/>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='country' value={form.country} onChange={handleInputChange} type="text" placeholder='Country' required/>
            <input className='border border-gray-300 py-1.5 px-3.5 rounded w-full' name='contactNumber' value={form.contactNumber} onChange={handleInputChange} type="number" placeholder='Contact number' required/>
        </div>

        <div className='mt-8'>
            <div className='mt-8 '>
                <CartCost/>
            </div>

            <div className='mt-12 text-xl sm:text-2xl'>
                <Title text1='CHOOSE' text2='PAYMENT METHOD'/>
                <div className='gap-3 flex flex-col lg:flex-row'>
                    <div onClick={() => setPaymentMethod('stripe')} className={`flex items-center gap-2 p-2 px-3 border border-gray-300 cursor-pointer ${paymentMethod === 'stripe' ? 'border-gray-600' : ''}`}>
                        <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'stripe' ? 'bg-gray-800' : ''}`}></p>
                        <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                    </div>
                    {/* <div onClick={() => setPaymentMethod('razor_pay')} className={`flex items-center gap-2 p-2 px-3 border border-gray-300 cursor-pointer ${paymentMethod === 'razor_pay' ? 'border-gray-600' : ''}`}>
                        <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'razor_pay' ? 'bg-gray-800' : ''}`}></p>
                        <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                    </div> */}
                    <div onClick={() => setPaymentMethod('cash_on_delivery')} className={`flex items-center gap-2 p-2 px-3 border border-gray-300 cursor-pointer ${paymentMethod === 'cash_on_delivery' ? 'border-gray-600' : ''}`}>
                        <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'cash_on_delivery' ? 'bg-gray-800' : ''}`}></p>
                        <p className='text-gray-600 text-lg font-medium mx-4'>CASH ON DELIVERY</p>
                    </div>
                </div>

                <div className='w-full text-end mt-8'>
                    <button type='submit' className='text-sm bg-black text-white mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer'>PURCHASE</button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default Checkout