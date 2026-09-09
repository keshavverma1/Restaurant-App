import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { all } from "axios";
import { Link } from "react-router-dom";
const Cart = () => {
  const {
    open,
    toggleDrawer,
    loading,
    setLoading,
    axios,
    user,
    handleCart,
    allCarts,
    setAllCarts,
    fetchAllCarts,
    removeCart,
    navigate,
  } = React.useContext(AppContext);

  const TotalAmount = allCarts?.items?.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0,
  );

  const handleCheckOut = () => {
    toggleDrawer(false);
    navigate("/checkout");
  };
  useEffect(() => {
    if (user) {
      fetchAllCarts();
    }
  }, [user]);

  const AddProductToCart = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/cart/add");
      if (res.data.success) {
        fetchAllCarts();
        toggleDrawer(true); // 👈 cart open
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{
          width: 380,
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">My Cart</h2>

          <button
            onClick={() => toggleDrawer(false)}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Cart Item 1 */}

        {allCarts?.items?.map((items, index) => (
          <div
            key={items._id || index}
            className="flex gap-3 border-b pb-4 mb-4"
          >
            {/* Product Image */}
            <img
              src={items.menuItem?.image}
              alt={items.menuItem?.name}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{items.menuItem?.name}</h3>

              {/* Quantity */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => {
                    // quantity increase API yahan lagegi

                    handleCart(items.menuItem._id, -1);
                  }}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-100 font-bold"
                >
                  -
                </button>

                <span className="font-semibold min-w-[20px] text-center">
                  {items.quantity}
                </span>

                <button
                  onClick={() => {
                    // quantity increase API yahan lagegi
                    handleCart(items.menuItem._id, 1);
                  }}
                  className="w-7 h-7 rounded-full bg-[#0f172a] text-white hover:bg-amber-300 hover:text-black font-bold"
                >
                  +
                </button>
              </div>

              {/* Product Price */}
              <p className="font-bold mt-1">
                ₹{(items.menuItem?.price || 0) * items.quantity}
              </p>
            </div>

            {/* Remove */}
            <button
              className="text-red-500 text-sm"
              onClick={() => {
                removeCart(items.menuItem._id);
              }}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Bottom */}
        <div className="mt-auto">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>₹{TotalAmount}</span>
          </div>

          <button
            onClick={handleCheckOut}
            className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </Box>
    </Drawer>
  );
};

export default Cart;
