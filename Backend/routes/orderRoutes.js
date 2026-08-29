import {Router} from "express";
import { placeOrder, getUserOrder, updateOrder }
 from "../controller/orderController.js";
import {protect} from "../middleware/authMiddleware.js";
const orderRouter = Router();

orderRouter.post("/place",protect,placeOrder);
orderRouter.get("/get",protect,getUserOrder);
orderRouter.put("/update/:orderId",protect,updateOrder);
export default orderRouter;