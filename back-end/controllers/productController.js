import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/productModel.js';

// Create a new product
const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, companyScale, rating, terms, features, more_info, color, bestseller, userEmail} = req.body;
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

        const productObject = {
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
            color: JSON.parse(color), 
            bestseller: bestseller === "true" ? true : false,
            userEmail
        }

        console.log(productObject);

        const product = await Product.create(productObject);

        res.json({status: "successful", productObject: product});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Get all products
const getAllProducts = async (req, res) => {

    try {
        const products =  await Product.find({});
        res.status(200).json({status: "successful", products});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }

}

// Get all Products by user email
const getAllProductsByUserEmail = async (req, res) => {
    try {
        const products = await Product.find({}).where({userEmail: req.body.userEmail});
        res.status(200).json({status: "successful", products})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id);
        if (!product) {
            res.status(404).json({status: "unsuccessful", message: "Product not found"});
        } else {
            res.status(200).json({status: "successful", product});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Update product by ID
const updateProductById = async (req, res) => {
    try {
        const {id, name, description, price, category, subCategory, companyScale, rating, terms, features, more_info, color, bestseller, userEmail} = req.body;
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

        const productObject = {
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
            color: JSON.parse(color), 
            bestseller: bestseller === "true" ? true : false,
            userEmail
        }

        console.log(productObject);

        const product = await Product.findByIdAndUpdate(id, productObject);
        const updatedProduct = await Product.findById(id);

        res.json({status: "successful", productObject: updatedProduct});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

// Delete product by ID
const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.body.id);
        if (!deletedProduct) {
            return res.status(404).json({status: "unsuccessful", message: "Product not found"});
        }
        res.status(200).json({status: "successful", message: "Product deleted successfully"});
    } catch(error) {
        console.log(error);
        res.status(500).json({status: "unsuccessful", message: error.message});
    }
}

export { createProduct, getAllProducts, getAllProductsByUserEmail, getProductById, updateProductById, deleteProductById };