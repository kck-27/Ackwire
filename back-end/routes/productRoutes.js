import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/create', upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), createProduct);
productRouter.get('/all', getAllProducts);
productRouter.post('get-by-id', getProductById);
productRouter.put('/update', updateProductById);
productRouter.post('/delete', deleteProductById);

export default productRouter;
