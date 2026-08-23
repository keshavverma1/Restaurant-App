import {Router} from "express";
import { registerUser, loginUser ,logoutUser,adminLogin} from "../controller/authController.js";
const authRouter = Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.post("/logout",logoutUser);
authRouter.post("/admin",adminLogin);
export default authRouter;
