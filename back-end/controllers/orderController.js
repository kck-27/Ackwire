import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

const delivery_fee = 30;
const currency = 'usd';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCODOrder = async (req, res) => {
    try {
        const {userId, sellerEmails, items, price, address} = req.body;
        const date = new Date().getTime();

        const orderObject = {
            userId,
            sellerEmails,
            items,
            price,
            address,
            paymentMethod: "Cash on Delivery",
            paymentStatus: false,
            date
        }

        const order = await Order.create(orderObject);
        if (!order) {
            res.status(500).json({status: "unsuccessful", message: "Order creation failed"});
        } else {
            await User.findByIdAndUpdate(userId, {cart: {}});
            res.status(200).json({status: "successful", message: "Order created successfully", order});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

const createStripeOrder = async (req, res) => {
    try {
        const {userId, sellerEmails, items, price, address} = req.body;
        const {origin} = req.headers;
        const date = new Date().getTime();

        const orderObject = {
            userId,
            sellerEmails,
            items,
            price,
            address,
            paymentMethod: "Stripe",
            paymentStatus: false,
            date
        }

        const order = await Order.create(orderObject);

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Free'
                },
                unit_amount: delivery_fee * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/validate?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/validate?success=false&orderId=${order._id}`,
            line_items,
            mode: 'payment'
        });

        res.status(200).json({status: "successful", session_url: session.url});
    } catch (error) {
        console.log(error);
        res.status(400).json({status: "unsuccessful", message: error.message});
    }
}

const validateStripe = async (req, res) => {
    const {orderId, userId, success} = req.body;

    try {
        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, {paymentStatus: true});
            await User.findByIdAndUpdate(userId, {cart: {}});
            res.status(200).json({status: "successful", message: "Payment successful"});
        } else {
            await Order.findByIdAndDelete(orderId);
            res.status(500).json({status: "unsuccessful", message: "Payment unsuccessful. Please try again!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// const createRazorPayOrder = async (req, res) => {
    
// }

const getOrdersBySeller = async (req, res) => {
    try {
        const orders = await Order.find({ sellerEmails: req.body.userEmail });
        res.status(200).json({status: "successful", orders})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await Order.find({userId}).sort({date: -1});
        res.status(200).json({status: "successful", mesasge: "Orders fetched successfully", orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

const updateOrderStatus = async (req, res) => {
    const { orderId, itemId, selectedColor, selectedMode, updateFields } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ status: "unsuccessful", message: "Order not found" });
    }

    let itemIndex = -1;

    if (selectedColor !== "") {
      itemIndex = order.items.findIndex(
      item => item._id.toString() === itemId && item.selectedColor === selectedColor
    );
    }

    if (selectedMode != "") {
        itemIndex = order.items.findIndex(
        item => item._id.toString() === itemId && item.selectedMode === selectedMode
    );
    }
    

    if (itemIndex === -1) {
      return res.status(404).json({ status: "unsuccessful", message: "Item not found in order" });
    }

    Object.assign(order.items[itemIndex], updateFields);
    order.markModified('items');
    await order.save();

    res.status(200).json({ status: "successful", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "unsuccessful", message: error.message });
  }
}

export {createCODOrder, createStripeOrder, getOrdersBySeller, getOrdersByUser, updateOrderStatus, validateStripe};