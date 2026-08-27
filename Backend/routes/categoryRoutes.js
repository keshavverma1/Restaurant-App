import { Router } from "express";
import {
    addCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
} from "../controller/categoryController.js";
import upload from "./../middleware/multer.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
const categoryRouter = Router();

categoryRouter.post("/add",protect, isAdmin, upload.single("image"), addCategory);
categoryRouter.get("/all", getAllCategory);
categoryRouter.put(
  "/update/:id",
  protect,
  isAdmin,
  upload.single("image"),
  updateCategory,
);
categoryRouter.delete("/delete/:id",protect, isAdmin, deleteCategory);

export default categoryRouter;
