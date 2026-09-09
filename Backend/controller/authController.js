import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
//Token Generation
const generateToken = (res, payload) => {
  const generatedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("token", generatedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return generatedToken;
};

//Register User---------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = generateToken(res, { id: newUser._id ,email:email });
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
  }
};

//Login User-----------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const token = generateToken(res, {
      id: user._id,
      role: user.isAdmin ? "admin" : "user",
      email:user.email
    });
    return res.status(200).json({
      success: true,
      token: token,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.isAdmin ? "admin" : "user",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

//Logout User-----------------------
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//AdminLogin-----------------
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("Admintoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      token: token,
      message: "Admin logged in successfully",
      admin: {
        email: adminEmail,
        password: adminPassword,
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//GetProfile----------------
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const isAuth = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ authenticated: true, user: user , message: "Authorized"  ,success: true});
    } catch (error) {
        console.log(error);
        return res.status(401).json({ authenticated: false, message: "Unauthorized" ,success: false ,error: error.message ,errorCode: error.code});
    }
};

const AdminLogout = async (req, res) => {
  try {
    res.clearCookie("Admintoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, message: "Admin logged out successfully" });
    
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export { registerUser, loginUser, logoutUser, adminLogin ,getProfile, isAuth ,AdminLogout };
