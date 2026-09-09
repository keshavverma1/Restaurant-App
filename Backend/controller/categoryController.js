import categoryModel from "../model/categoryModel.js";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
import fs from "fs/promises";

//Add Category
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
    return res.status(201).json({ message: "Category added successfully" ,success:true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }
};

//Get All Category
const getAllCategory = async (req, res) => {
  try {
    const categories = (await categoryModel.find());
    if (!categories) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ categories: categories ,success:true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update Category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" , success:false });
    }
    if (req.file) {
      const path = req.file.path;
      const result = await cloudinary.uploader.upload(path);
      category.image = result.secure_url;
      await fs.unlink(req.file.path);
    }
    if (name) {
      category.name = name;
    }

    await category.save();
    return res.status(200).json({ message: "Category updated successfully",success:true });
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).json({ message: "File not found" });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete Category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.findByIdAndDelete(id, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully",success:true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addCategory, getAllCategory, updateCategory, deleteCategory };
