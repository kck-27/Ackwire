import express from 'express';
import { createService, getAllServices, getAllServicesByUserEmail, getServiceById, updateServiceById, deleteServiceById } from '../controllers/serviceController.js';
import upload from '../middleware/multer.js';
import sellerAuth from '../middleware/sellerAuth.js';

const serviceRouter = express.Router();

serviceRouter.post('/create', sellerAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), createService);
serviceRouter.get('/all', getAllServices);
serviceRouter.get('/all-by-email', getAllServicesByUserEmail);
serviceRouter.post('/get', getServiceById);
serviceRouter.put('/update', sellerAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), updateServiceById);
serviceRouter.post('/delete', sellerAuth, deleteServiceById);

export default serviceRouter;
