import cartModel from "../model/cartModel.js";
import { addToCart, getuserCart, removeFromCart } from "../controller/cartController.js";
import {protect} from "../middleware/authMiddleware.js";
import {Router} from "express";
const cartRouter = Router();

cartRouter.post("/add",protect,addToCart);
cartRouter.get("/get",protect,getuserCart);
cartRouter.delete("/remove",protect,removeFromCart);
export default cartRouter;