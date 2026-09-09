import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Booking = () => {
 

  const { loading, setLoading, axios, admin ,bookings, setAllBookings, fetchBookings } = useContext(AppContext);
  const [status, setStatus] = useState("");
  // =========================
  // UPDATE BOOKING STATUS
  // =========================
  const handleBookingStatus = async (id, status) => {
    try {
      const res = await axios.put(`/booking/update/${id}`, {
        status,
      });

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });

        fetchBookings();
      }
    } catch (error) {
      console.log("UPDATE BOOKING ERROR:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update booking status",
        {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };


  // =========================
  // FETCH WHEN ADMIN AVAILABLE
  // =========================


  // =========================
  // STATUS STYLE
  // =========================
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";

      case "approved":
        return "bg-blue-100 text-blue-700 border-blue-300";

      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";

      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-50 py-24 px-3 sm:px-6">
        {/* PAGE HEADER */}
        <div className="max-w-6xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            All Bookings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and track restaurant bookings
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* DESKTOP HEADER */}
          <div className="hidden md:grid grid-cols-6 gap-4 bg-gray-100 border-b px-5 py-4 text-sm font-semibold text-gray-600">
            <div>#</div>
            <div>Name</div>
            <div>Phone Number</div>
            <div>Number of Guests</div>
            <div>Date</div>
            <div>Status</div>
          </div>

          {/* BOOKINGS */}
          <div>
            {bookings.map((booking, index) => (
              <div
                key={booking._id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
              >

                {/* =========================
                    DESKTOP
                ========================= */}
                <div className="hidden md:grid grid-cols-6 gap-4 items-center px-5 py-5">

                  {/* INDEX */}
                  <div className="font-semibold text-gray-500">
                    #{index + 1}
                  </div>

                  {/* NAME */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking?.name || "N/A"}
                    </p>
                  </div>

                  {/* PHONE */}
                  <div className="text-sm text-gray-600">
                    {booking?.phone || "N/A"}
                  </div>

                  {/* GUESTS */}
                  <div className="text-sm text-gray-600">
                    {booking?.numberOfGuests || "N/A"}
                  </div>

                  {/* DATE */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking?.date
                        ? new Date(booking.date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <select
                      value={booking?.status || "pending"}
                      onChange={(e) => {
                        const newStatus = e.target.value;

                        // UI immediately update
                        setAllBookings((prevBookings) =>
                          prevBookings.map((item) =>
                            item._id === booking._id
                              ? {
                                  ...item,
                                  status: newStatus,
                                }
                              : item
                          )
                        );

                        // Database update
                        handleBookingStatus(
                          booking._id,
                          newStatus
                        );
                      }}
                      className={`w-full px-3 py-2 rounded-lg border text-sm font-semibold outline-none cursor-pointer transition ${getStatusStyle(
                        booking?.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* =========================
                    MOBILE
                ========================= */}
                <div className="md:hidden p-4">

                  {/* TOP */}
                  <div className="flex justify-between items-start mb-4">

                    <div>
                      <p className="text-xs text-gray-400">
                        Booking #{index + 1}
                      </p>

                      <h2 className="font-bold text-lg text-gray-800 mt-1">
                        {booking?.name || "N/A"}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {booking?.phone || "N/A"}
                      </p>
                    </div>

                    {/* STATUS */}
                    <select
                      value={booking?.status || "pending"}
                      onChange={(e) => {
                        const newStatus = e.target.value;

                        setAllBookings((prevBookings) =>
                          prevBookings.map((item) =>
                            item._id === booking._id
                              ? {
                                  ...item,
                                  status: newStatus,
                                }
                              : item
                          )
                        );

                        handleBookingStatus(
                          booking._id,
                          newStatus
                        );
                      }}
                      className={`px-3 py-2 rounded-lg border text-xs font-semibold outline-none cursor-pointer ${getStatusStyle(
                        booking?.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* BOOKING INFO */}
                  <div className="grid grid-cols-2 gap-3">

                    {/* GUEST */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">
                        Number of Guests
                      </p>

                      <p className="font-bold text-gray-800 mt-1">
                        {booking?.numberOfGuests || "N/A"}
                      </p>
                    </div>

                    {/* DATE */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">
                        Booking Date
                      </p>

                      <p className="font-bold text-gray-800 mt-1">
                        {booking?.date
                          ? new Date(
                              booking.date
                            ).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>

                    {/* TIME */}
                    <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                      <p className="text-xs text-gray-400">
                        Booking Time
                      </p>

                      <p className="font-semibold text-gray-700 mt-1">
                        {booking?.time || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NO BOOKINGS */}
          {bookings.length === 0 && !loading && (
            <div className="py-16 text-center">
              <div className="text-5xl mb-3">📅</div>

              <h2 className="text-lg font-semibold text-gray-700">
                No Bookings Found
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                There are no bookings available right now.
              </p>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="py-10 text-center">
              <p className="text-gray-500">
                Loading bookings...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;