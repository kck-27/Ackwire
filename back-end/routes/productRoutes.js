import express from 'express';
import { createProduct, getAllProducts, getAllProductsByUserEmail, getProductById, updateProductById, deleteProductById } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import sellerAuth from '../middleware/sellerAuth.js';

const productRouter = express.Router();

productRouter.post('/create', sellerAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), createProduct);
productRouter.get('/all', getAllProducts);
productRouter.get('/all-by-email', getAllProductsByUserEmail);
productRouter.post('/get', getProductById);
productRouter.put('/update', sellerAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), updateProductById);
productRouter.post('/delete', sellerAuth, deleteProductById);

export default productRouter;
