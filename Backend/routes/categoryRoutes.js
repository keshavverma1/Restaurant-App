import {Router} from "express";
import {addCategory} from "../controller/categoryController.js";
import upload from './../middleware/multer.js';
const categoryRouter = Router();

categoryRouter.post("/add",upload.single("image"),addCategory);


export default categoryRouter;