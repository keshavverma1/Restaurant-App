import categoryModel from "../model/categoryModel.js";
import cloudinary from "../config/cloudinary.js";

// Add Category
const addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const existingCategory = await categoryModel.findOne({ name: name });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    // Upload image buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "restaurant/categories",
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

    const category = new categoryModel({
      name: name,
      image: result.secure_url,
    });

    await category.save();

    return res.status(201).json({
      message: "Category added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// Get All Category
const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    if (!categories) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      categories: categories,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// Update Category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    // If new image is uploaded
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "restaurant/categories",
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

      category.image = result.secure_url;
    }

    if (name) {
      category.name = name;
    }

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// Delete Category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};