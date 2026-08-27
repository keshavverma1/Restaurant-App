import menuModel from "../model/menuModel.js";
import categoryModel from "../model/categoryModel.js";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
import fs from "fs/promises";


//Add MenuItem--------------------------------------------------------
const addMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const path = req.file.path;

    if (!name || !description || !price || !category || !path) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await cloudinary.uploader.upload(path); 
    const menuItem = new menuModel({
      name: name,
      description: description,
      price: price,
      image: result.secure_url,
      category: category,
    });
    await fs.unlink(req.file.path);
    await menuItem.save();
    return res
      .status(201)
      .json({ message: "Menu Item added successfully", menuItem: menuItem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//GetAllMenuItems------------------------------------------------------
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuModel.find().populate("category", "name");
    if (!menuItems) {
      return res.status(404).json({ message: "Menu Items not found" });
    }
    return res.status(200).json({ menuItems: menuItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UpdateallMenuItems-------------------------------------------
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category , isAvailable } = req.body;
  try {
    const menu = await menuModel.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu Item not found" });
    }
    if (name) {
      menu.name = name;
    }
    if (description) {
      menu.description = description;
    }
    if (price) {
      menu.price = price;
    }
    if (category) {
      menu.category = category;
    }
    if (req.file) {
      const path = req.file.path;
      const result = await cloudinary.uploader.upload(path);
      menu.image = result.secure_url;
      await fs.unlink(req.file.path);
    }
    if (isAvailable !== undefined) {
      menu.isAvailable = isAvailable;
    }
    await menu.save();
    return res.status(200).json({ message: "Menu Item updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DeleteMenuItem-----------------------------------------------------------
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await menuModel.findByIdAndDelete(id, { new: true });
    if (!menuItem) {
      return res.status(404).json({ message: "Menu Item not found" });
    }
    return res.status(200).json({ message: "Menu Item deleted successfully" });
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export  {
  addMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
};