import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

// Middleware to protect routes
const protect = async (req, res ,next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user =await userModel.findById(decoded.id);
        req.user = user;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const isAdmin = async (req,res,next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user =await userModel.findById(decoded.id);
        req.admin = user;
        if(req.admin.email === process.env.ADMIN_EMAIL){
            return next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
export {protect,isAdmin};