import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Validate = ({token}) => {

    const {navigate, setCartItems} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    const validatePayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const res = await axios.post(`${backendURL}/api/orders/validate-stripe`, {success, orderId}, {headers: {token}});
            if (res.data.status === "successful") {
                setCartItems({});
                navigate('/purchases');
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
            navigate('/cart');
        }
    }

    useEffect(() => {
        validatePayment();
    }, [token]);

  return (
    <div></div>
  )
}

export default Validate