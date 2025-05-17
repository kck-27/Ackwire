import {v2 as cloudinary} from 'cloudinary';
import Service from '../models/serviceModel.js';

// Create a new service
const createService = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, companyScale, rating, terms, features, more_info, mode, bestseller} = req.body;
        const date = new Date().getTime();
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);

        let imageURLs = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {resource_type: "image"});
                return result.secure_url;
            })
        );

        const serviceObject = {
            name, 
            description, 
            price: Number(price),
            image: imageURLs,
            category, 
            subCategory, 
            companyScale, 
            date,
            rating: Number(rating),
            terms: JSON.parse(terms),
            features: JSON.parse(features), 
            more_info: JSON.parse(more_info), 
            mode: JSON.parse(mode), 
            bestseller: bestseller === "true" ? true : false
        }

        console.log(serviceObject);

        const service = await Service.create(serviceObject);

        res.json({status: "successful", serviceObject: service});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services =  await Service.find({});
        res.status(200).json({status: "successful", services});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Get service by ID
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.body.id);
        if (!service) {
            res.status(404).json({status: "unsuccessful", message: "Service not found"});
        } else {
            res.status(200).json({status: "successful", service});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Update service by ID
const updateServiceById = async (req, res) => {
    try {
        const {id, name, description, price, category, subCategory, companyScale, rating, terms, features, more_info, mode, bestseller} = req.body;
        const date = new Date().getTime();
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);

        let imageURLs = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {resource_type: "image"});
                return result.secure_url;
            })
        );

        const serviceObject = {
            name, 
            description, 
            price: Number(price),
            image: imageURLs,
            category, 
            subCategory, 
            companyScale, 
            date,
            rating: Number(rating),
            terms: JSON.parse(terms),
            features: JSON.parse(features), 
            more_info: JSON.parse(more_info), 
            mode: JSON.parse(mode), 
            bestseller: bestseller === "true" ? true : false
        }

        console.log(serviceObject);

        const service = await Service.findByIdAndUpdate(id, serviceObject);
        const updatedService = await Service.findById(id);

        res.json({status: "successful", serviceObject: updatedService});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Delete service by ID
const deleteServiceById = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.body.id);
        res.status(200).json({status: "Successful", message: "Service deleted successfully"});
    } catch(error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

export { createService, getAllServices, getServiceById, updateServiceById, deleteServiceById };