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

categoryRouter.post("/add",isAdmin, upload.single("image"), addCategory);
categoryRouter.get("/all",getAllCategory);
categoryRouter.put(
  "/update/:id",
  isAdmin,
  upload.single("image"),
  updateCategory,
);
categoryRouter.delete("/delete/:id",isAdmin, deleteCategory);

export default categoryRouter;
