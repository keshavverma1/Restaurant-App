import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TfiPackage } from "react-icons/tfi";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Button from "@mui/material/Button";
const NavBar = () => {
  const { navigate, user, setUser, axios, toggleDrawer ,allCarts } =
    useContext(AppContext);
  const [isMenuOpen, setisMenuopen] = useState(false);
  const [isProfileOpen, setisProfileOpen] = useState(false);
  const handleLogout = async () => {
    try {
      const res = await axios.post("/auth/logout");
      if (res.data.success) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleDrawer(true);
  };

  return (
    <>
      <nav className="bg-[#0f172A] shadow-md py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" flex items-center justify-between h-16">
            {/* Left Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-0">
                <img
                  src="../../public/Burger.png"
                  alt=""
                  className="w-15 md:w-23"
                />
                <h1
                  className="md:text-[26px] text-[20px] tracking-tighter text-white"
                  style={{
                    fontFamily: '"Urbanist", sans-serif',
                    fontOpticalSizing: "auto",
                    fontWeight: 700,
                    fontStyle: "normal",
                  }}
                >
                  Order{" "}
                  <span className="bg-amber-300 md:text-[26px] text-[20px] text-[#0f172A] rounded-full px-2 py-2">
                    now
                  </span>
                </h1>
              </Link>
            </div>
            {/* Centered Items */}
            <div
              style={{
                fontFamily: '"Urbanist", sans-serif',
                fontOpticalSizing: "auto",
                fontWeight: 700,
                fontStyle: "normal",
              }}
            >
              <ul className="hidden md:flex items-center space-x-8">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black transition-colors bg-amber-300 rounded-full px-2 py-2"
                        : "text-white"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-amber-300 transition-colors rounded-full px-2 py-2"
                        : "text-white"
                    }
                    to="/menu"
                  >
                    Menu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-amber-300 transition-colors rounded-full px-2 py-2"
                        : "text-white"
                    }
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-amber-300 transition-colors rounded-full px-2 py-2"
                        : "text-white"
                    }
                    to="/book-table"
                  >
                    BookTable
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* Right Items */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCartClick}
                className="relative md:p-2 p-1 bg-amber-300 hover:bg-amber-400  rounded-lg transition-colors"
              >
                <MdOutlineShoppingCart className="md:text-3xl text-2xl text-black" />
                <span className="absolute h-6 w-6 rounded-full bg-black text-white -top-3 -right-2">
                  {allCarts?.items?.length || 0}
                </span>
              </button>

              <div>
                {user ? (
                  <>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setisProfileOpen(true)}
                        onMouseLeave={() => setisProfileOpen(false)}
                        className="relative hidden md:flex md:p-2 p-1 bg-amber-300 hover:bg-amber-400  rounded-lg transition-colors"
                      >
                        <FaRegUserCircle className="md:text-3xl text-2xl text-black" />
                      </button>
                      {isProfileOpen && (
                        <div
                          onMouseEnter={() => setisProfileOpen(true)}
                          onMouseLeave={() => setisProfileOpen(false)}
                          className="absolute w-40 md:w-48 mt-0 right-0  bg-white rounded-lg shadow-lg border border-gray-100"
                        >
                          <Link
                            className="w-full flex items-center md:px-4 md:py-2 px-2 py-1 hover:bg-gray-300 space-x-2"
                            to="/my-bookings"
                          >
                            <FaRegCalendarAlt className="mr-3 md:text-3xl text-2xl" />
                            My Booking
                          </Link>
                          <Link
                            className="w-full flex items-center md:px-4 md:py-2 px-2 py-1 hover:bg-gray-300 space-x-2"
                            to="/my-orders"
                          >
                            <TfiPackage className="mr-3 md:text-3xl text-2xl" />
                            My Orders
                          </Link>
                          <Link
                            onClick={handleLogout}
                            className="w-full flex items-center md:px-4 md:py-2 px-2 py-1 hover:bg-gray-300 space-x-2"
                            to="/my-booking"
                          >
                            <IoLogOutOutline className="mr-3 md:text-3xl text-2xl" />
                            Logout
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="px-5 py-2 rounded-full border border-gray-500 text-white hover:bg-amber-300 hover:text-black transition-colors"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
              <div className="md:hidden flex">
                {isMenuOpen ? (
                  <>
                    <button onClick={() => setisMenuopen(false)}>
                      <div className="relative md:p-2 p-1 z-100  border-white border-2  rounded-lg  transition-colors">
                        <AiOutlineMenuUnfold className="md:text-3xl text-2xl text-white" />
                      </div>
                    </button>
                    <div className="fixed top-0 left-0 w-full h-screen bg-[#050505] z-[90]">
                      <div className="flex flex-col px-6 sm:px-8 pt-28 gap-3">
                        {/* HOME */}
                        <Link
                          to="/"
                          onClick={() => setisMenuopen(false)}
                          className="group flex items-center justify-between
                 text-gray-200 text-xl px-6 py-5 rounded-2xl
                 bg-gradient-to-r from-[#111111] to-[#0b0b0b]
                 border border-white/[0.08]
                 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                 hover:from-[#1c1c1c] hover:to-[#111111]
                 hover:border-amber-400/40
                 hover:text-amber-300
                 transition-all duration-300"
                        >
                          <span className="tracking-wide">Home</span>

                          <span
                            className="text-gray-600 text-2xl
                       group-hover:text-amber-300
                       group-hover:translate-x-2
                       transition-all duration-300"
                          >
                            →
                          </span>
                        </Link>

                        {/* MENU */}
                        <Link
                          to="/menu"
                          onClick={() => setisMenuopen(false)}
                          className="group flex items-center justify-between
                 text-gray-200 text-xl px-6 py-5 rounded-2xl
                 bg-gradient-to-r from-[#111111] to-[#0b0b0b]
                 border border-white/[0.08]
                 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                 hover:from-[#1c1c1c] hover:to-[#111111]
                 hover:border-amber-400/40
                 hover:text-amber-300
                 transition-all duration-300"
                        >
                          <span className="tracking-wide">Menu</span>

                          <span
                            className="text-gray-600 text-2xl
                       group-hover:text-amber-300
                       group-hover:translate-x-2
                       transition-all duration-300"
                          >
                            →
                          </span>
                        </Link>

                        {/* CONTACT */}
                        <Link
                          to="/contact"
                          onClick={() => setisMenuopen(false)}
                          className="group flex items-center justify-between
                 text-gray-200 text-xl px-6 py-5 rounded-2xl
                 bg-gradient-to-r from-[#111111] to-[#0b0b0b]
                 border border-white/[0.08]
                 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                 hover:from-[#1c1c1c] hover:to-[#111111]
                 hover:border-amber-400/40
                 hover:text-amber-300
                 transition-all duration-300"
                        >
                          <span className="tracking-wide">Contact</span>

                          <span
                            className="text-gray-600 text-2xl
                       group-hover:text-amber-300
                       group-hover:translate-x-2
                       transition-all duration-300"
                          >
                            →
                          </span>
                        </Link>
                        {user ? (
                          <>
                            {/* MY BOOKING */}
                            <Link
                              to="/my-bookings"
                              onClick={() => setisMenuopen(false)}
                              className="group flex items-center justify-between
                 text-gray-200 text-xl px-6 py-5 rounded-2xl
                 bg-gradient-to-r from-[#111111] to-[#0b0b0b]
                 border border-white/[0.08]
                 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                 hover:from-[#1c1c1c] hover:to-[#111111]
                 hover:border-amber-400/40
                 hover:text-amber-300
                 transition-all duration-300"
                            >
                              <span className="tracking-wide">My Booking</span>

                              <span
                                className="text-gray-600 text-2xl
                       group-hover:text-amber-300
                       group-hover:translate-x-2
                       transition-all duration-300"
                              >
                                →
                              </span>
                            </Link>
                            <Link
                              to="/my-orders"
                              onClick={() => setisMenuopen(false)}
                              className="group flex items-center justify-between
                 text-gray-200 text-xl px-6 py-5 rounded-2xl
                 bg-gradient-to-r from-[#111111] to-[#0b0b0b]
                 border border-white/[0.08]
                 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                 hover:from-[#1c1c1c] hover:to-[#111111]
                 hover:border-amber-400/40
                 hover:text-amber-300
                 transition-all duration-300"
                            >
                              <span className="tracking-wide">My Orders</span>

                              <span
                                className="text-gray-600 text-2xl
                       group-hover:text-amber-300
                       group-hover:translate-x-2
                       transition-all duration-300"
                              >
                                →
                              </span>
                            </Link>
                            <Link
                              to="/book-table"
                              className="group flex items-center justify-between
                 text-gray-200 text-xl px-6 py-5 rounded-2xl
                 bg-gradient-to-r from-[#111111] to-[#0b0b0b]
                 border border-white/[0.08]
                 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                 hover:from-[#1c1c1c] hover:to-[#111111]
                 hover:border-amber-400/40
                 hover:text-amber-300
                 transition-all duration-300"
                            >
                              <Link className="tracking-wide">Book Table</Link>

                              <span
                                className="text-gray-600 text-2xl
                       group-hover:text-amber-300
                       group-hover:translate-x-2
                       transition-all duration-300"
                              >
                                →
                              </span>
                            </Link>
                            <Link
                              onClick={handleLogout}
                              className="group flex items-center justify-between
                 text-gray-200 text-xl px-6 py-5 rounded-2xl
                 bg-gradient-to-r from-[#111111] to-[#0b0b0b]
                 border border-white/[0.08]
                 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                 hover:from-[#1c1c1c] hover:to-[#111111]
                 hover:border-amber-400/40
                 hover:text-amber-300
                 transition-all duration-300"
                            >
                              <Link className="tracking-wide">Log Out</Link>

                              <span
                                className="text-gray-600 text-2xl
                       group-hover:text-amber-300
                       group-hover:translate-x-2
                       transition-all duration-300"
                              >
                                →
                              </span>
                            </Link>
                             
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={() => setisMenuopen(true)}>
                      <div className="relative md:p-2 p-1 z-100  border-white border-2  rounded-lg transition-colors">
                        <AiOutlineMenuFold className="md:text-3xl text-2xl text-white" />
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
