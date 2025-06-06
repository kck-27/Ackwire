import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};


const getById = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ status: "unsuccessful", message: "Invalid user id" });
    }

    res.status(200).json({
        status: "successful",
        userObject: {
          name: user.name,
          email: user.email,
          userType: user.userType,
          businessScale: user.businessScale
        },
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Querying by email
    const user = await User.findOne({ email });

    // Handling invalid emails
    if (!user) {
      return res
        .status(400)
        .json({ status: "unsuccessful", message: "Invalid email" });
    }

    // Password verification
    const valid = await bcrypt.compare(password, user.password);

    // Sending response
    if (valid) {
      // const token = createToken(user._id);
      // res.status(200).json({
      //   status: "successful",
      //   userObject: {
      //     name: user.name,
      //     email: user.email,
      //     userType: user.userType,
      //     businessScale: user.businessScale,
      //     token,
      //   },
      // });

      if (user.userType === "seller") {
        const token = createToken(user._id);
        const sellertoken = jwt.sign(process.env.SELLER_SECRET_KEY, process.env.JWT_SECRET_KEY);
        res.status(200).json({
        status: "successful",
        userObject: {
          name: user.name,
          email: user.email,
          userType: user.userType,
          businessScale: user.businessScale,
          token,
          sellertoken
        },
      });
      } else {
      const token = createToken(user._id);
      res.status(200).json({
        status: "successful",
        userObject: {
          name: user.name,
          email: user.email,
          userType: user.userType,
          businessScale: user.businessScale,
          token,
        },
      });
      }

    } else {
      res.status(400).json({ status: "unsuccessful", message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, userType, businessScale } = req.body;

    // Querying by email
    const nonUnique = await User.findOne({ email });

    // Checking email uniqueness
    if (nonUnique) {
      return res
        .status(400)
        .json({
          status: "unsuccessful",
          message: "Specified email already registered",
        });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: "unsuccessful", message: "Invalid email" });
    }

    // Password validation
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({
          status: "unsuccessful",
          message:
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
        });
    }

    // User type validations
    if (userType !== "buyer" && userType !== "seller") {
      return res
        .status(400)
        .json({ status: "unsuccessful", message: "User type must be specified" });
    }

    if (userType === "seller" && businessScale === "") {
      return res
        .status(400)
        .json({ status: "unsuccessful", message: "Business scale must be specified" });
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
    res.status(200).json({
      status: "successful",
      userObject: {
        name: user.name,
        email: user.email,
        userType: user.userType,
        businessScale: user.businessScale,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const adminSignIn = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);
      res.status(200).json({status: "successful", token});
    } else {
      res.status(400).json({status: "unsuccessful", message: "Invalid email or password"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { signIn, signUp, adminSignIn, getById };
