import express from 'express';
import { createService, getAllServices, getServiceById, updateServiceById, deleteServiceById } from '../controllers/serviceController.js';
import upload from '../middleware/multer.js';

const serviceRouter = express.Router();

serviceRouter.post('/create', upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), createService);
serviceRouter.get('/all', getAllServices);
serviceRouter.post('/get', getServiceById);
serviceRouter.put('/update', upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), updateServiceById);
serviceRouter.post('/delete', deleteServiceById);

export default serviceRouter;
