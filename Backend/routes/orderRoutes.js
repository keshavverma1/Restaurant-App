import {Router} from "express";
import { placeOrder, getUserOrder, updateOrder }
 from "../controller/orderController.js";
import {protect,isAdmin} from "../middleware/authMiddleware.js";
import {getAllOrders} from "../controller/orderController.js";
const orderRouter = Router();

orderRouter.post("/place",protect,placeOrder);
orderRouter.get("/get",protect,getUserOrder);
orderRouter.get("/all",isAdmin,getAllOrders);
orderRouter.put("/update/:orderId",isAdmin,updateOrder);
export default orderRouter;