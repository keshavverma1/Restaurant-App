import {Router} from "express";
import { registerUser, loginUser ,logoutUser,adminLogin ,getProfile , isAuth, AdminLogout} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const authRouter = Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.post("/logout",logoutUser);
authRouter.post("/admin",adminLogin);
authRouter.get("/profile",protect,getProfile);
authRouter.get("/isauth",protect,isAuth);
authRouter.post("/adminlogout",AdminLogout);
export default authRouter;
