import express from 'express';
import { addToCart, updateCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import userAuth from '../middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/get', userAuth, getCartItems);
cartRouter.post('/add', userAuth, addToCart);
cartRouter.post('/update', userAuth, updateCart);
cartRouter.post('/remove', userAuth, removeFromCart);

export default cartRouter;