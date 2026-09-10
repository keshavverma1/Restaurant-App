import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.baseURL = "https://restaurant-app-sigma-sooty.vercel.app";
axios.defaults.withCredentials = true;
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bookings, setAllBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");

    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const isAuth = async () => {
    try {
      const res = await axios.get("/auth/isauth");
      if (res?.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  const getAllCategory = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/category/all");

      console.log("CATEGORY RESPONSE:", res.data);

      if (res?.data?.success) {
        setCategories(res.data.categories);
      } else {
        console.log("Failed to load categories");
      }
    } catch (error) {
      console.log("CATEGORY ERROR:", error);

      toast.error(
        error?.response?.data?.message || "Failed to load categories",
      );
    } finally {
      setLoading(false);
    }
  };

  const getAllMenu = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/menu/all");

      console.log("MENU RESPONSE:", res.data);

      if (res?.data?.success) {
        setMenus(res.data.menuItems);
      } else {
        console.log("Failed to load menus");
      }
    } catch (error) {
      console.log("MENU ERROR:", error);

      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/order/all");

      console.log("ORDERS RESPONSE:", res.data);

      if (res.data.success) {
        setAllOrders(res.data.order || []);
      } else {
        setAllOrders([]);
      }
    } catch (error) {
      console.log("ORDERS ERROR:", error);
      setAllOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET ALL BOOKINGS
  // =========================
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/booking/all");
      console.log("BOOKING RESPONSE:", res.data);
      if (res.data.success) {
        setAllBookings(res.data.bookings || []);
      } else {
        setAllBookings([]);
      }
    } catch (error) {
      console.log("BOOKING ERROR:", error);
      setAllBookings([]);
    } finally {
      setLoading(false);
    }
  };

  //For Cart
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value) => {
    setOpen(value);
  };

  //Carts Section
  const handleCart = async (menuItemId, quantity) => {
    try {
      const updateCart = await axios.post("/cart/add", {
        menuItemId,
        quantity,
      });
      if (updateCart.data.success) {
        fetchAllCarts();
        setOpen(true);
      } else {
        console.log(updateCart.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [allCarts, setAllCarts] = useState();

  const fetchAllCarts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/cart/get");
      console.log(res.data.cart);
      if (res.data.success) {
        setAllCarts(res.data.cart);
        console.log(res.data.cart);
      } else {
        setAllCarts([]);
      }
    } catch (error) {
      console.log(error);
      setAllCarts([]);
    } finally {
      setLoading(false);
    }
  };
  const removeCart = async (menuItemId) => {
    try {
      // 🔥 Instant UI update
      setAllCarts((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.menuItem._id !== menuItemId),
      }));
      const res = await axios.delete(`/cart/remove/`, {
        data: { menuItemId },
      });
      if (res.data.success) {
        fetchAllCarts();
        setOpen(true);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //------------------------------------------------------
  const [orders, setAllOrder] = useState([]);
  //For Order
  const getMyOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/order/get");
      if (res.data.success) {
        setAllOrder(res.data.order);
      } else {
        setAllOrder([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyOrders();
    }
  }, [user]);

  useEffect(() => {
    isAuth();
    getAllCategory();
    getAllMenu();
  }, []);
  useEffect(() => {
    console.log("ADMIN CHANGED:", admin);

    if (admin) {
      fetchOrders();
    }
  }, [admin]);

  useEffect(() => {
    if (admin) {
      fetchBookings();
    }
  }, [admin]);

  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    axios,
    isAuth,
    admin,
    setAdmin,
    categories,
    setCategories,
    getAllCategory,
    getAllMenu,
    menus,
    setMenus,
    allOrders,
    fetchOrders,
    setAllOrders,
    bookings,
    setAllBookings,
    fetchBookings,
    open,
    setOpen,
    toggleDrawer,
    handleCart,
    allCarts,
    setAllCarts,
    fetchAllCarts,
    removeCart,
    orders,
    setAllOrder,
    getMyOrders,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
