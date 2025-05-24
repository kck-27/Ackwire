import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Validate = ({token}) => {

    const {navigate, setCartItems, loading, setLoading} = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    const validatePayment = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        validatePayment();
    }, [token]);

      if (loading) {
  return (
        <Spinner />  
  );
}

  return (
    <div></div>
  )
}

export default Validate