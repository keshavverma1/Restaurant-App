import categoryModel from "../model/categoryModel.js";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
import fs from "fs/promises";

const addCategory = async (req, res) => {
  const { name } = req.body;

  try {
     const path = req.file.path;
    if (!name || !path) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    const existingCategory = await categoryModel.findOne({ name: name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const result = await cloudinary.uploader.upload(path);
    const category = new categoryModel({
      name: name,
      image: result.secure_url,
    });
    await fs.unlink(req.file.path);
    await category.save();
    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export { addCategory };
