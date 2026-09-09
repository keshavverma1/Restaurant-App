import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MyBooking = () => {
  const { user, navigate, toast } = useContext(AppContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyBookings = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/booking/get", {
        withCredentials: true,
      });

      if (res.data.success) {
        setBookings(res.data.bookings);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   

    getMyBookings();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-5 py-12">

      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-10">
        <p className="text-amber-400 uppercase tracking-[4px] text-sm font-semibold mb-3">
          Reservations
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          My <span className="text-amber-400">Bookings</span>
        </h1>

        <p className="text-gray-400 mt-3">
          Here you can see all your table reservations.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-amber-400 rounded-full animate-spin"></div>
        </div>
      )}

      {/* No bookings */}
      {!loading && bookings.length === 0 && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-12 text-center">
            <div className="text-5xl mb-5">🍽️</div>

            <h2 className="text-2xl font-bold mb-2">
              No Bookings Found
            </h2>

            <p className="text-gray-400 mb-6">
              You haven't booked a table yet.
            </p>

            <button
              onClick={() => navigate("/book-table")}
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-3 rounded-xl transition"
            >
              Book a Table
            </button>
          </div>
        </div>
      )}

      {/* Booking Cards */}
      {!loading && bookings.length > 0 && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-xl hover:border-amber-400/40 transition duration-300"
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">
                    Table Reservation
                  </h2>

                  <p className="text-gray-500 text-xs mt-1">
                    #{booking._id.slice(-6)}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-green-500/10 text-green-400"
                      : booking.status === "cancelled"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {booking.status || "Pending"}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <span className="text-xl">👤</span>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">{booking.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">{booking.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl">👥</span>
                  <div>
                    <p className="text-xs text-gray-500">Guests</p>
                    <p className="font-medium">
                      {booking.numberOfGuests} Guests
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      Date
                    </p>

                    <p className="font-semibold text-amber-400">
                      {booking.date}
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      Time
                    </p>

                    <p className="font-semibold text-amber-400">
                      {booking.time}
                    </p>
                  </div>

                </div>

                {booking.note && (
                  <div className="bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      Special Note
                    </p>

                    <p className="text-sm text-gray-300">
                      {booking.note}
                    </p>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="border-t border-gray-800 mt-6 pt-4">
                <p className="text-xs text-gray-500">
                  Order Now
                </p>

                
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyBooking;