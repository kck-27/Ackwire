import express from 'express';
import { createService, getAllServices, getServiceById, updateServiceById, deleteServiceById } from '../controllers/serviceController.js';

const serviceRouter = express.Router();

serviceRouter.post('/create', createService);
serviceRouter.get('/all', getAllServices);
serviceRouter.post('get-by-id', getServiceById);
serviceRouter.put('/update', updateServiceById);
serviceRouter.post('/delete', deleteServiceById);

export default serviceRouter;
