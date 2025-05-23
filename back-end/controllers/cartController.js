import User from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, attribute } = req.body;
        const user = await User.findById(userId);
        let cart = user.cart;


            if(cart[itemId]) {
                if(cart[itemId][attribute]) {
                    cart[itemId][attribute] += 1;
                } else {
                    cart[itemId][attribute] = 1;
                }
            } else {
                cart[itemId] = {};
                cart[itemId][attribute] = 1;
            }


        const updatedUser = await User.findByIdAndUpdate(userId, {cart});

        if (!updatedUser) {
            return res.status(404).json({status: "unsuccessful", message: "User not found"});
        } else{
            res.status(200).json({status: "successful",  message: "Item added to cart", cart});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, attribute, quantity } = req.body;
        const user = await User.findById(userId);
        let cart = user.cart;


            if (quantity === 0) {
                cart[itemId][attribute] = quantity;
            } else {
                cart[itemId][attribute] += quantity;
            }
            

        const updatedUser = await User.findByIdAndUpdate(userId, {cart});

        if (!updatedUser) {
            return res.status(404).json({status: "unsuccessful", message: "User not found"});
        } else{
            res.status(200).json({status: "successful",  message: "Cart updated", cart});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

const getCartItems = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        let cart = user.cart;

        res.status(200).json({status: "successful", cart})

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

const removeFromCart = async (req, res) => {
    try {
        const {userId, itemId, attribute} = req.body;
        const user = await User.findById(userId);
        let cart = user.cart;

    
            cart[itemId][attribute] = 0;
 
        const updatedUser = await User.findByIdAndUpdate(userId, {cart});

        if (!updatedUser) {
            return res.status(404).json({status: "unsuccessful", message: "User not found"});
        } else{
            res.status(200).json({status: "successful",  message: "Item removed", cart});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

export { addToCart, updateCart, getCartItems, removeFromCart };