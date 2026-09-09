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
    } catch (error){
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const isAdmin = async (req,res,next) =>{
    const Admintoken = req.cookies.Admintoken;
    if(!Admintoken){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
    const decoded = jwt.verify(req.cookies.Admintoken, process.env.JWT_SECRET);
      
        req.admin = decoded;//{id,role,email}
        console.log("REQADMIN",req.admin);
        if(req.admin.email === process.env.ADMIN_EMAIL){
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
export {protect,isAdmin};