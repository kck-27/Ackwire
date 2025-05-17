import {v2 as cloudinary} from 'cloudinary'

const cloudinaryConfig = async () => {

    cloudinary.config({
        cloudinary_url: process.env.CLOUDINARY_URL
    })

}

export default cloudinaryConfig