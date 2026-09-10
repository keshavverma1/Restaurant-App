
import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiCategoryAlt, BiFoodMenu } from "react-icons/bi";
import { FaClipboardList, FaCalendarCheck } from "react-icons/fa";
import { MdRestaurantMenu, MdCategory } from "react-icons/md";
import { AppContext } from "../../context/AppContext";
import { toast, Bounce, ToastContainer } from "react-toastify";

const AdminLayout = () => {
  const menuItem = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <MdOutlineSpaceDashboard />,
      exact: true,
    },
    {
      path: "/admin/add-category",
      name: "Add Category",
      icon: <MdCategory />,
    },
    {
      path: "/admin/add-menu",
      name: "Add Menu",
      icon: <MdRestaurantMenu />,
    },
    {
      path: "/admin/categories",
      name: "All Categories",
      icon: <BiCategoryAlt />,
    },
    {
      path: "/admin/menus",
      name: "All Menus",
      icon: <BiFoodMenu />,
    },
    {
      path: "/admin/orders",
      name: "My Orders",
      icon: <FaClipboardList />,
    },
    {
      path: "/admin/bookings",
      name: "My Bookings",
      icon: <FaCalendarCheck />,
    },
  ];

  const location = useLocation();
  const [sideBarOpen, setSidebarOpen] = useState(false);

  const { admin, setAdmin, axios, navigate } = useContext(AppContext);

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const logouthandler = async () => {
    try {
      const res = await axios.post("auth/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/admin");
        localStorage.removeItem("admin");
        setAdmin(null);

        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
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

      <div className="flex h-screen bg-gray-200">

        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-1000">
          <button
            onClick={() => setSidebarOpen(!sideBarOpen)}
            className="p-2 rounded-md z-100 transition duration-300 transition-colors"
          >
            {sideBarOpen ? (
              <div className="w-8 flex flex-col gap-2 cursor-pointer">
                <div className="rounded-2xl h-[3px] w-full bg-white rotate-45 translate-y-[5px]"></div>
                <div className="rounded-2xl h-[3px] w-full bg-white -rotate-45 -translate-y-[5px]"></div>
              </div>
            ) : (
              <div className="w-8 flex flex-col gap-2 cursor-pointer">
                <div className="rounded-2xl h-[3px] w-1/2 bg-black"></div>
                <div className="rounded-2xl h-[3px] w-full bg-black"></div>
                <div className="rounded-2xl h-[3px] w-1/2 bg-black place-self-end"></div>
              </div>
            )}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`bg-[#0f172A] z-100 w-64 md:min-w-[300px] shadow-lg transform transition-transform duration-300 ease-in-out fixed top-0 bottom-0 left-0 md:translate-x-0 md:inset-0 md:static ${
            sideBarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">

            <Link
              to="/admin"
              className="flex items-center gap-2 pl-[70px] pt-[5px] md:pl-[20px] border-b border-gray-700 pb-2"
            >
              <img
                src="https://res.cloudinary.com/dvr0vpuuk/image/upload/v1789025775/ChatGPT_Image_Aug_30_2026_05_51_15_PM_ea0djw.png"
                alt=""
                className="w-15 md:w-23"
              />

              <h1
                className="md:text-[26px] text-[20px] tracking-tight text-white font-bold"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Dine{" "}
                <span className="bg-amber-300 md:text-[26px] text-[20px] text-[#0f172A] rounded-full px-2 py-2">
                  zo
                </span>
              </h1>
            </Link>

            {/* Navigation Bar */}
            {menuItem.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`${
                  isActive(item.path, item.exact)
                    ? "bg-gray-700"
                    : ""
                } flex items-center gap-3 pl-[70px] py-3 hover:bg-gray-700 transition-colors`}
              >
                {/* ICON */}
                <span className="text-white text-[21px] flex items-center">
                  {item.icon}
                </span>

                {/* TEXT */}
                <span
                  className="text-white font-medium text-[15px] tracking-wide"
                  style={{
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden md:ml-0">

          <header className="bg-white shadow-sm border-b border-gray-200 md:pl-0 pl-16">
            <div className="flex items-center justify-between px-6 py-4">

              <h2
                className="text-2xl font-semibold text-gray-800"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {menuItem.map((item, index) =>
                  isActive(item.path, item.exact)
                    ? item.name
                    : ""
                )}
              </h2>

            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto pl-3 pr-3 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>

        </div>
      </div>
    </>
  );
};

export default AdminLayout;
