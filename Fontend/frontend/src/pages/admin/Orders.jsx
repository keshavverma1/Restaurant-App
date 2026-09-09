import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Bounce } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

const AllOrders = () => {


  const { loading, setLoading, axios, admin , fetchOrders ,allOrders,setAllOrders } = useContext(AppContext);

  // =========================
  // UPDATE ORDER STATUS
  // =========================
 const handleStatusChange = async (id, status) => {
  try {
    setLoading(true);

    console.log("ORDER ID:", id);
    console.log("NEW STATUS:", status);

    const res = await axios.put(`/order/update/${id}`, {
      status,
    });

    console.log("SERVER RESPONSE:", res.data);

    if (res.data.success) {
      // DB update successful hone ke baad UI update
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? { ...order, status: status }
            : order
        )
      );

      toast.success(res.data.message);
    }
  } catch (error) {
    console.log("UPDATE ERROR:", error.response?.data || error);

    toast.error(
      error?.response?.data?.message || "Failed to update order status"
    );
  } finally {
    setLoading(false);
  }
};

  // =========================
  // GET ALL ORDERS
  // =========================



  // =========================
  // STATUS UI
  // =========================
  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }

    if (status === "Shipped") {
      return "bg-blue-100 text-blue-700 border-blue-300";
    }

    if (status === "Delivered") {
      return "bg-green-100 text-green-700 border-green-300";
    }

    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-50 py-24 px-3 sm:px-6">
        {/* PAGE TITLE */}
        <div className="max-w-6xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            All Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and track customer orders
          </p>
        </div>

        {/* ORDERS CONTAINER */}
        <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* DESKTOP HEADER */}
          <div className="hidden md:grid grid-cols-6 gap-4 bg-gray-100 border-b px-5 py-4 text-sm font-semibold text-gray-600">
            <div>#</div>
            <div>Customer</div>
            <div>Address</div>
            <div>Amount</div>
            <div>Payment</div>
            <div>Status</div>
          </div>

          {/* ORDERS */}
          <div>
            {allOrders.map((order, index) => (
              <div
                key={order._id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* DESKTOP ORDER */}
                <div className="hidden md:grid grid-cols-6 gap-4 items-center px-5 py-5">
                  {/* INDEX */}
                  <div className="font-semibold text-gray-500">
                    #{index + 1}
                  </div>

                  {/* CUSTOMER */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {order?.user?.name || "N/A"}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {order?.user?.email || ""}
                    </p>
                  </div>

                  {/* ADDRESS */}
                  <div className="text-sm text-gray-600">
                    {order?.address || "N/A"}
                  </div>

                  {/* AMOUNT */}
                  <div>
                    <p className="font-bold text-gray-800">
                      ₹{order?.totalAmount || 0}
                    </p>
                  </div>

                  {/* PAYMENT */}
                  <div>
                    <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {order?.paymentMethod || "N/A"}
                    </span>
                  </div>

                  {/* STATUS */}
                  <div>
                    <select
                      value={order?.status || "Pending"}
                      onChange={(e) => {
                        const newStatus = e.target.value;

                        // UI immediately update
                        setAllOrders((prevOrders) =>
                          prevOrders.map((item) =>
                            item._id === order._id
                              ? { ...item, status: newStatus }
                              : item
                          )
                        );

                        // Database update
                        handleStatusChange(order._id, newStatus);
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-sm font-semibold outline-none cursor-pointer transition ${getStatusStyle(
                        order?.status
                      )}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* MOBILE ORDER */}
                <div className="md:hidden p-4">
                  {/* TOP */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-400">
                        Order #{index + 1}
                      </p>

                      <h2 className="font-bold text-lg text-gray-800">
                        {order?.user?.name || "N/A"}
                      </h2>

                      <p className="text-xs text-gray-400">
                        {order?.user?.email || ""}
                      </p>
                    </div>

                    {/* STATUS */}
                    <select
                      value={order?.status || "Pending"}
                      onChange={(e) => {
                        const newStatus = e.target.value;

                        setAllOrders((prevOrders) =>
                          prevOrders.map((item) =>
                            item._id === order._id
                              ? { ...item, status: newStatus }
                              : item
                          )
                        );

                        handleStatusChange(order._id, newStatus);
                      }}
                      className={`px-3 py-2 rounded-lg border text-xs font-semibold outline-none cursor-pointer ${getStatusStyle(
                        order?.status
                      )}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  {/* ORDER INFO */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">Total Amount</p>
                      <p className="font-bold text-gray-800 mt-1">
                        ₹{order?.totalAmount || 0}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">Payment</p>
                      <p className="font-semibold text-gray-700 text-sm mt-1">
                        {order?.paymentMethod || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-400 mb-1">Delivery Address</p>

                    <p className="text-sm text-gray-700">
                      {order?.address || "N/A"}
                    </p>
                  </div>

                  {/* ITEMS */}
                  <div>
                    <p className="font-semibold text-gray-800 mb-3">
                      Ordered Items
                    </p>

                    <div className="space-y-3">
                      {order?.items?.map((item, key) => (
                        <div
                          key={key}
                          className="flex items-center gap-3 border border-gray-200 rounded-xl p-3"
                        >
                          {/* IMAGE */}
                          <img
                            className="w-16 h-16 object-cover rounded-lg"
                            src={item?.menuItem?.image}
                            alt={item?.menuItem?.name || "Food"}
                          />

                          {/* ITEM INFO */}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {item?.menuItem?.name || "N/A"}
                            </p>

                            <p className="text-sm text-gray-500">
                              ₹{item?.menuItem?.price || 0}
                            </p>
                          </div>

                          {/* QUANTITY */}
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Qty</p>

                            <p className="font-bold text-gray-700">
                              {item?.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DESKTOP ITEMS */}
                <div className="hidden md:block px-5 pb-5">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-700 mb-3">
                      Ordered Items
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {order?.items?.map((item, key) => (
                        <div
                          key={key}
                          className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 min-w-[250px]"
                        >
                          <img
                            className="w-16 h-16 object-cover rounded-lg"
                            src={item?.menuItem?.image}
                            alt={item?.menuItem?.name || "Food"}
                          />

                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {item?.menuItem?.name || "N/A"}
                            </p>

                            <p className="text-sm text-gray-500">
                              ₹{item?.menuItem?.price || 0}
                            </p>
                          </div>

                          <div className="text-center">
                            <p className="text-xs text-gray-400">Qty</p>

                            <p className="font-bold text-gray-700">
                              {item?.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NO ORDERS */}
          {allOrders.length === 0 && !loading && (
            <div className="py-16 text-center">
              <div className="text-5xl mb-3">📦</div>

              <h2 className="text-lg font-semibold text-gray-700">
                No Orders Found
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                There are no orders available right now.
              </p>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="py-10 text-center">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;