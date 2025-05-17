import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/productModel.js';

// Create a new product
const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, companyScale, rating, terms, features, more_info, color, bestseller} = req.body;
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
            bestseller: bestseller === "true" ? true : false
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

}

// Get product by ID
const getProductById = async (req, res) => {

}

// Update product by ID
const updateProductById = async (req, res) => {

}

// Delete product by ID
const deleteProductById = async (req, res) => {
    
}

export { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById };