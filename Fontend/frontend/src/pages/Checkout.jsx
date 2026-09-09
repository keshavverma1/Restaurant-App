import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Checkout = () => {
  const { axios, allCarts, fetchAllCarts, setLoading, loading } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const totalAmount =
    allCarts?.items?.reduce(
      (acc, item) => acc + (item.menuItem?.price || 0) * item.quantity,
      0,
    ) || 0;

  const addOrder = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await axios.post("/order/place",{address});
      if(res.data.success){
        fetchAllCarts();
        navigate("/my-orders");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fetchAllCarts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Checkout
          </h1>
          <p className="text-gray-500 mt-1">
            Complete your order by providing your delivery details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Address */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h2 className="text-xl font-bold mb-6">Delivery Address</h2>

            <label className="block text-sm font-semibold mb-2">
              Full Address
            </label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete delivery address..."
              rows="6"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />

            <div className="mt-6 p-4 rounded-xl bg-amber-50">
              <p className="text-sm text-gray-600">
                📍 Please make sure your address is correct before placing the
                order.
              </p>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {allCarts?.items?.length > 0 ? (
                allCarts.items.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.menuItem?.image}
                      alt={item.menuItem?.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.menuItem?.name}</h3>

                      <p className="text-sm text-gray-500">
                        ₹{item.menuItem?.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold">
                      ₹{(item.menuItem?.price || 0) * item.quantity}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Your cart is empty.
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t mt-6 pt-5">
              <div className="flex justify-between text-gray-600 mb-3">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-3">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-xl font-bold mt-4">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Place Order */}
            <button
              onClick={(e)=>addOrder(e)}
              disabled={loading || !allCarts?.items?.length}
              className="w-full mt-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold transition"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
