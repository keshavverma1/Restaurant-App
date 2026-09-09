import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  MdDelete,
  MdEdit,
  MdCategory,
  MdAdd,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

const Categories = () => {
  const { axios, navigate ,categories,setCategories,getAllCategory} = useContext(AppContext);
  
  const [loading, setLoading] = useState(false);

  // Get all categories


 
  // Delete category
const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`/category/delete/${id}`);

    console.log("DELETE RESPONSE:", res.data);

    if (res.data.success) {
      // UI se immediately remove
      setCategories((prev) =>
        prev.filter((category) => String(category._id) !== String(id))
      );

      toast.success(res.data.message);
    }
  } catch (error) {
    console.log("DELETE ERROR:", error);

    toast.error(
      error?.response?.data?.message || "Failed to delete category"
    );
  }
};

  return (
    <>
       <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
    <div className="w-full">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-xl">
              <MdCategory className="text-amber-500 text-2xl" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172A]">
              Categories
            </h1>
          </div>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Manage all your food categories
          </p>
        </div>

        {/* Add Category */}
        <Link
          to="/admin/add-category"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0f172A] font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <MdAdd className="text-xl" />
          Add Category
        </Link>
      </div>


      {/* ================= STATS ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-7">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Total Categories
            </p>

            <h2 className="text-3xl font-bold text-[#0f172A] mt-1">
              {categories.length}
            </h2>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
            <MdCategory className="text-3xl text-amber-500" />
          </div>

        </div>
      </div>


      {/* ================= LOADING ================= */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-amber-300 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}


      {/* ================= EMPTY ================= */}
      {!loading && categories.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-20 text-center">

          <div className="text-6xl mb-4">
            🍕
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            No Categories Found
          </h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first food category.
          </p>

          <Link
            to="/admin/add-category"
            className="inline-flex items-center gap-2 mt-5 bg-amber-400 hover:bg-amber-500 px-5 py-2.5 rounded-xl font-semibold text-[#0f172A] transition"
          >
            <MdAdd />
            Add Category
          </Link>

        </div>
      )}


      {/* ================= CATEGORY GRID ================= */}
      {!loading && categories.length > 0 && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {categories.map((category) => (

            <div
              key={category._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Category Name */}
                <div className="absolute bottom-3 left-4">

                  <h2 className="text-white text-xl font-bold drop-shadow-md">
                    {category.name}
                  </h2>

                </div>

              </div>


              {/* Card Body */}
              <div className="p-4">

                {/* ID */}
                <div className="mb-4">

                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Category ID
                  </p>

                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {category._id}
                  </p>

                </div>


                {/* Buttons */}
                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      navigate(`/admin/edit-category/${category._id}`)
                    }
                    className="flex-1 flex items-center justify-center gap-2 border border-amber-300 text-amber-600 hover:bg-amber-50 py-2.5 rounded-xl font-semibold transition"
                  >
                    <MdEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-semibold transition"
                  >
                    <MdDelete />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
    </>
  );
  
};

export default Categories;