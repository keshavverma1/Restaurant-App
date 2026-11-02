
import React, { useContext } from "react";
import { AppContext } from "./../context/AppContext";

const MyOrder = () => {
  const { orders, loading } = useContext(AppContext);

  // Safe orders array
  const orderList = Array.isArray(orders) ? orders : [];

  // Image fallback
  const fallbackImage =
    "https://placehold.co/100x100?text=No+Image";

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold text-gray-600">
          Loading your orders...
        </div>
      </div>
    );
  }

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

        {/* Empty Orders */}
        {orderList.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <div className="text-5xl mb-4">🛒</div>

            <h2 className="text-xl font-bold">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Your orders will appear here once you place one.
            </p>
          </div>
        ) : (

          /* Orders List */
          <div className="space-y-6">

            {orderList.map((order, orderIndex) => {

              if (!order) return null;

              const items = Array.isArray(order.items)
                ? order.items
                : [];

              return (
                <div
                  key={order._id || orderIndex}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden"
                >

                  {/* Order Header */}
                  <div className="p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h2 className="font-bold text-slate-900">
                        #{order._id || "N/A"}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "Date unavailable"}
                      </p>
                    </div>

                    {/* Status */}
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      ● {order.status || "Processing"}
                    </span>

                  </div>

                  {/* Order Items */}
                  <div className="p-5">

                    <h3 className="font-bold text-lg mb-4">
                      Order Items
                    </h3>

                    <div className="space-y-4">

                      {items.length === 0 ? (
                        <p className="text-gray-500">
                          No items found in this order.
                        </p>
                      ) : (

                        items.map((item, index) => {

                          if (!item) return null;

                          // Handle null populated product
                          const menuItem = item.menuItem;

                          const name =
                            menuItem?.name || "Product unavailable";

                          const image =
                            menuItem?.image || fallbackImage;

                          const price =
                            Number(menuItem?.price) || 0;

                          const quantity =
                            Number(item.quantity) || 0;

                          return (
                            <div
                              key={item._id || index}
                              className="flex items-center gap-4"
                            >

                              {/* Product Image */}
                              <img
                                src={image}
                                alt={name}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = fallbackImage;
                                }}
                                className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                              />

                              {/* Product Details */}
                              <div className="flex-1">

                                <h4 className="font-semibold text-slate-900">
                                  {name}
                                </h4>

                                <p className="text-sm text-gray-500">
                                  ₹{price} × {quantity}
                                </p>

                                {!menuItem && (
                                  <p className="text-xs text-red-500">
                                    Product reference is missing
                                  </p>
                                )}

                              </div>

                              {/* Total */}
                              <p className="font-bold">
                                ₹{price * quantity}
                              </p>

                            </div>
                          );
                        })

                      )}

                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="px-5 pb-5">

                    <div className="bg-amber-50 rounded-xl p-4">

                      <p className="text-sm font-semibold text-slate-800">
                        📍 Delivery Address
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {order.address || "Address unavailable"}
                      </p>

                    </div>

                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 p-5 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="text-2xl font-bold text-slate-900">
                        ₹{Number(order.totalAmount) || 0}
                      </p>

                    </div>

                    <button
                      type="button"
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold transition"
                    >
                      View Details
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrder;
