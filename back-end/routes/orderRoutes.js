import express from 'express';
import {createCODOrder, createStripeOrder, getOrdersBySeller, getOrdersByUser, updateOrderStatus, validateStripe} from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';
import sellerAuth from '../middleware/sellerAuth.js';

const orderRouter = express.Router();

orderRouter.post('/create-cod', userAuth, createCODOrder);
orderRouter.post('/create-stripe', userAuth, createStripeOrder);
// orderRouter.post('/create-razor', userAuth, createRazorPayOrder);
orderRouter.post('/get-by-seller', sellerAuth, getOrdersBySeller);
orderRouter.post('/get-by-user', userAuth, getOrdersByUser);
orderRouter.post('/update', sellerAuth, updateOrderStatus);
orderRouter.post('/validate-stripe', userAuth, validateStripe);


export default orderRouter;