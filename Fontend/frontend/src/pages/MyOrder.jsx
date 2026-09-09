import React from "react";
import { AppContext } from "./../context/AppContext";

const MyOrder = () => {
  const { orders, setAllOrder, navigate, loading, user } =
    React.useContext(AppContext);
  // Dummy data - baad mein API se replace kar dena
 

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track and manage your recent orders.
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {orders.map((orders) => (
            <div
              key={orders._id}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>

                  <h2 className="font-bold text-slate-900">#{orders._id}</h2>

                  <p className="text-sm text-gray-500 mt-1">{orders.date}</p>
                </div>

                {/* Status */}
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${
                    orders.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : orders.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  ● {orders.status}
                </span>
              </div>

              {/* Items */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-4">Order Items</h3>

                <div className="space-y-4">
                  {orders.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">
                          {item.menuItem.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          ₹{item.menuItem.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">₹{item.menuItem.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="px-5 pb-5">
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-800">
                    📍 Delivery Address
                  </p>

                  <p className="text-sm text-gray-600 mt-1">{orders.address}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-5 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>

                  <p className="text-2xl font-bold text-slate-900">
                    ₹{orders.totalAmount}
                  </p>
                </div>

                <button className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Orders */}
        {orders.length === 0 && (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <div className="text-5xl mb-4">🛒</div>

            <h2 className="text-xl font-bold">No Orders Yet</h2>

            <p className="text-gray-500 mt-2">
              Your orders will appear here once you place one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
