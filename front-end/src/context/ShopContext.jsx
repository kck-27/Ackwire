import { createContext } from "react";
// import { products, services } from "../assets/assets";
import { useState } from "react";
import { use } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 30;
    const [search, setSearch] = useState('');
    const [displaySearch, setDisplaySearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    const addToCart = async (itemId, attribute) => {

        if (!attribute) {
            toast.error('Please select a color', {
                style: {
                //   backgroundColor: '#FFFFFF', // Light red background
                //   color: '#gray', // Dark red text
                //   border: '1px solid #000000', // Border color
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"
                },
              });
            return;
        }

        let tempCartItems = structuredClone(cartItems);
        if (tempCartItems[itemId]) {
            if (tempCartItems[itemId][attribute]) {
                tempCartItems[itemId][attribute] += 1;
            } else {
                tempCartItems[itemId][attribute] = 1;
            } 
        } else {
            tempCartItems[itemId] = {[attribute]: 1};
        }
        setCartItems(tempCartItems);
    };

    const getQuantityByItem = (itemId, attribute) => {
        if (cartItems[itemId] && cartItems[itemId][attribute]) {
            return cartItems[itemId][attribute];
        }
        return 0;
    };

    const getTotalQuantity = () => {
        let total = 0;
        for (const item in cartItems) {
            for (const attribute in cartItems[item]) {
                try {
                    if (cartItems[item][attribute] > 0) {
                        total += cartItems[item][attribute];
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        return total;
    }

    const updateQuantity = async (itemId, attribute, quantity) => {
        let tempCartItems = structuredClone(cartItems);
        if (tempCartItems[itemId] && tempCartItems[itemId][attribute]) {
            if (quantity === 0) {
                tempCartItems[itemId][attribute] = quantity;
            } else {
                tempCartItems[itemId][attribute] += quantity;
            }
            
        }
        setCartItems(tempCartItems);
    }

    const getFullCost = () => {
        let totalCost = 0;
        const combinedArray = [...products, ...services];

        for (const item in cartItems) {
            const itemDetails = combinedArray.find((_item) => _item._id === item);
            for (const attribute in cartItems[item]) {
                try {
                    if (cartItems[item][attribute] > 0) {
                        totalCost += itemDetails.price * cartItems[item][attribute];
                    }
                } catch {

                }
            }
        }
        return totalCost;
    }

    const fetchItems = async () => {
        try {
            const productsRes = await axios.get(`${backendURL}/api/products/all`);
            if(productsRes.data.status === "successful") {
                setProducts(productsRes.data.products);
            } else {
                toast.error(res.data.message);
            }
            const servicesRes = await axios.get(`${backendURL}/api/services/all`);
            if(servicesRes.data.status === "successful") {
                setServices(servicesRes.data.services);
            }
        } catch (error) {
            console.log(error);
              toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const value = {
        products, services, currency, delivery_fee, search, setSearch, displaySearch, setDisplaySearch, cartItems, addToCart, getQuantityByItem, getTotalQuantity, updateQuantity, getFullCost, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;