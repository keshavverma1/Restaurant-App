import {
    addMenuItem,
    getAllMenuItems,
    updateMenuItem,
    deleteMenuItem,
} from "../controller/menuController.js";


import upload from "./../middleware/multer.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { Router } from "express";
const menuRouter = Router();
''
menuRouter.post("/add",isAdmin, upload.single("image"), addMenuItem);
menuRouter.get("/all", getAllMenuItems);
menuRouter.put(
  "/update/:id",
  isAdmin,
  upload.single("image"),
  updateMenuItem,
);
menuRouter.delete("/delete/:id",isAdmin, deleteMenuItem);
   
export default menuRouter;
