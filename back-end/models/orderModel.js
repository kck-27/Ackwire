import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    sellerEmails: {type: Array, required: true},
    items: {type: Array, required:true},
    price: {type: Number, required: true},
    address: {type:Object, required: true},
    paymentMethod: {type: String, required: true},
    status: {type: String, required: true, default: "Order Submitted"},
    date: {type: Number, required: true},
    paymentStatus:{type: Boolean, required: true, default: false},
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;