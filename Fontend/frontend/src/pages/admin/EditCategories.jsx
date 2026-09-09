import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useState } from "react";
const EditCategories = () => {
  const { axios, navigate, loading, setLoading ,setCategories ,getAllCategory } = useContext(AppContext);
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false);
      const {id} = useParams();

  const fileHandler = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setCategoryLoading(true);

    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("name", e.target.name.value);

    console.log("ID:", id);
    console.log("NAME:", e.target.name.value);

    const res = await axios.put(
      `/category/update/${id}`,
      formData
    );

    console.log("UPDATE RESPONSE:", res.data);

    if (res.data.success) {
      toast.success(res.data.message);

      // Context ki categories ko fresh data do
      getAllCategory();

      // Phir categories page par jao
      navigate("/admin/categories");
    }
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    toast.error(
      error?.response?.data?.message || "Failed to update category"
    );
  } finally {
    setCategoryLoading(false);
  }
};
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={(e) => e.target.value}
           
            placeholder="Category Name"
            required
            className="p-2 border border-2 border-amber-400/30 rounded-xl hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          />
          <label
            htmlFor="image"
            className="flex flex-col mt-5 items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all"
          >
            <span className="text-4xl">📸</span>

            <p className="mt-2 text-gray-600 font-medium">
              Upload Category Image
            </p>

            <p className="text-sm text-gray-400">PNG, JPG or JPEG</p>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={fileHandler}
              className="hidden"
           
            />
          </label>
          {preview && (
            <div className="mt-5">
              <img
                src={preview}
                alt="preview"
                className="w-full h-44 object-cover rounded-2xl"
              />
            </div>
          )}
          <button
            type="submit"
            className="cursor-pointer mt-4 bg-gradient-to-r from-amber-400 to-orange-500 
  shadow-[0_4px_25px_rgba(245,158,11,0.35)] 
  px-7 py-3 rounded-xl border border-amber-300 
  text-[#0f172A] font-bold group overflow-hidden"
          >
            <div className="relative overflow-hidden h-6">
              {loading ? (
                <>
                  {" "}
                  <p className=" duration-500 ease-in-out">Loading</p>
                </>
              ) : (
                <>
                  {" "}
                  <p className=" duration-500 ease-in-out">Add Category</p>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCategories;
