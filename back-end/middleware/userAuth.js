import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
   
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({status: "unsuccessful", message: "Unauthorized"});
        }
         try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "unsuccessful", message: error.message });
    }
}

export default userAuth;