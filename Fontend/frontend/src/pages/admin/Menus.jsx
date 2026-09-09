import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  MdDelete,
  MdEdit,
  MdRestaurantMenu,
  MdAdd,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

const Menus = () => {
  const {
    axios,
    navigate,
    menus,
    setMenus,
    handleCart
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);



  // Delete menu
  const deleteMenu = async (id) => {
    try {
      const res = await axios.delete(`/menu/delete/${id}`);
      console.log("DELETE MENU RESPONSE:", res.data);

      if (res.data.success) {
        // UI se immediately remove
        setMenus((prev) =>
          prev.filter(
            (menu) => String(menu._id) !== String(id)
          )
        );

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("DELETE MENU ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete menu"
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
                <MdRestaurantMenu className="text-amber-500 text-2xl" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172A]">
                Menus
              </h1>

            </div>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Manage all your food menus
            </p>
          </div>


          {/* Add Menu */}

          <Link
            to="/admin/add-menu"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0f172A] font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <MdAdd className="text-xl" />
            Add Menu
          </Link>

        </div>


        {/* ================= STATS ================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Menus
              </p>

              <h2 className="text-3xl font-bold text-[#0f172A] mt-1">
                {menus?.length || 0}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">

              <MdRestaurantMenu className="text-3xl text-amber-500" />

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

        {!loading && (!menus || menus.length === 0) && (

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-20 text-center">

            <div className="text-6xl mb-4">
              🍔
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No Menus Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start by adding your first food menu.
            </p>

            <Link
              to="/admin/add-menu"
              className="inline-flex items-center gap-2 mt-5 bg-amber-400 hover:bg-amber-500 px-5 py-2.5 rounded-xl font-semibold text-[#0f172A] transition"
            >
              <MdAdd />
              Add Menu
            </Link>

          </div>

        )}


        {/* ================= MENU GRID ================= */}

        {!loading && menus?.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {menus.map((menu) => (

              <div
                key={menu._id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* ================= IMAGE ================= */}

                <div className="relative h-48 overflow-hidden bg-gray-100">

                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>


                  {/* Menu Name */}

                  <div className="absolute bottom-3 left-4 right-4">

                    <h2 className="text-white text-xl font-bold drop-shadow-md truncate">
                      {menu.name}
                    </h2>

                  </div>


                  {/* Availability */}

                  <div className="absolute top-3 right-3">

                    {menu.isAvailable ? (

                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        Available
                      </span>

                    ) : (

                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        Unavailable
                      </span>

                    )}

                  </div>

                </div>


                {/* ================= CARD BODY ================= */}

                <div className="p-4">

                  {/* Price */}

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-sm text-gray-500">
                      Price
                    </span>

                    <span className="text-lg font-bold text-amber-600">
                      ₹{menu.price}
                    </span>

                  </div>


                  {/* Category */}

                  <div className="mb-3">

                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Category
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {menu.category?.name || "No Category"}
                    </p>

                  </div>


                  {/* Description */}

                  <div className="mb-4">

                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Description
                    </p>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {menu.description}
                    </p>

                  </div>


                  {/* Buttons */}

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        navigate(`/admin/edit-menu/${menu._id}`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 border border-amber-300 text-amber-600 hover:bg-amber-50 py-2.5 rounded-xl font-semibold transition"
                    >
                      <MdEdit />
                      Edit
                    </button>


                    <button
                      onClick={() => deleteMenu(menu._id)}
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

export default Menus;