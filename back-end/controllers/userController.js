import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY);
}

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({status: "false", message: "Invalid email"});
        }
} catch (error) {

}
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, userType, businessScale } = req.body;

    // Checking email uniqueness
    const nonUnique = await User.findOne({email});
    if (nonUnique) {
        return res.status(400).json({status: "false", message: "Specified email already registered"});
    }

    // Email validation
    if (!validator.isEmail(email)) {
        return res.status(400).json({status: "false", message: "Invalid email"});
    }

    // Password validation
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({status: "false", message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol."});
    }

    // User type validations
    if (userType !== "buyer" && userType !== "seller") {
        return res.status(400).json({status: "false", message: "User type must be specified"});
    }

    if (userType === "seller" && businessScale === "") {
        return res.status(400).json({status: "false", message: "Business scale must be specified"});
    }

    // Password hashing
    const salt = await bcrypt.genSalt(9);
    const passwordHash = await bcrypt.hash(password, salt);

    // Creating user
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      userType,
      businessScale,
    });

    // Creating token
    const token = createToken(user._id);

    // Sending response
    res.status(200).json({status: "true", userObject:{
      name: user.name,
      email: user.email,
      userType: user.userType,
      businessScale: user.businessScale,
      token,
    }});

  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
    
  }
};

const adminSignIn = async (req, res) => {};

export { signIn, signUp, adminSignIn };
