import React, { useContext } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "./../../context/AppContext";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories , getAllMenu } =
    useContext(AppContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      const res = await axios.post("/menu/add", formData);
      if (res.data.success) {
        toast.success(res.data.message);

        await getAllMenu(); // 👈 menus dobara fetch
        navigate("/admin/menus");
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
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
            onChange={(e) => setName(e.target.value)}
            placeholder="Menu Name"
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
              required
            />
          </label>
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter the Price Value"
            required
            className="p-2 border border-2 mt-5 border-amber-400/30 rounded-xl hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          />
          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Category
            </label>

            <select
              name="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
               outline-none focus:ring-2 focus:ring-amber-400 
               focus:border-amber-400 bg-white text-gray-700"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the Description"
            required
            className="p-2 mt-5 border border-2 border-amber-400/30 rounded-xl hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          />
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
                  <p className=" duration-500 ease-in-out">Add Menu</p>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMenu;
