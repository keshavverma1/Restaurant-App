import menuModel from "../model/menuModel.js";
import categoryModel from "../model/categoryModel.js";
import cloudinary from "../config/cloudinary.js";


// Add MenuItem --------------------------------------------------------
const addMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Upload image buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "restaurant",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    const menuItem = new menuModel({
      name: name,
      description: description,
      price: price,
      image: result.secure_url,
      category: category,
    });

    await menuItem.save();

    return res.status(201).json({
      message: "Menu Item added successfully",
      menuItem: menuItem,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// Get All Menu Items --------------------------------------------------
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuModel
      .find()
      .populate("category");

    if (!menuItems) {
      return res.status(404).json({
        message: "Menu Items not found",
      });
    }

    return res.status(200).json({
      menuItems: menuItems,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// Update MenuItem -----------------------------------------------------
const updateMenuItem = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    category,
    isAvailable,
  } = req.body;

  try {
    const menu = await menuModel.findById(id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu Item not found",
      });
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

    // If new image is uploaded
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "restaurant",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      menu.image = result.secure_url;
    }

    if (isAvailable !== undefined) {
      menu.isAvailable = isAvailable;
    }

    await menu.save();

    return res.status(200).json({
      message: "Menu Item updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// Delete MenuItem -----------------------------------------------------
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await menuModel.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu Item not found",
      });
    }

    return res.status(200).json({
      message: "Menu Item deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export {
  addMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
};