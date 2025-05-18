import jwt from "jsonwebtoken";

const sellerAuth = async (req, res, next) => {
    try {
        const { sellertoken } = req.headers;
        if (!sellertoken) {
            return res.status(401).json({status: "unsuccessful", message: "Unauthorized"});
        }
        const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET_KEY);
        
        if (decoded !== process.env.SELLER_SECRET_KEY) {
            console.log(decoded + process.env.SELLER_SECRET_KEY);
            return res.status(401).json({status: "unsuccessful", message: "Unauthorized"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export default sellerAuth;