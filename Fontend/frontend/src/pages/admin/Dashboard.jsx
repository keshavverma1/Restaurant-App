import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Categories from "./Categories";

const Dashboard = () => {
  const {
    admin,
    setAdmin,
    navigate,
    axios,
    bookings,
    menus,
    categories,
    allOrders,
  } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      const res = await axios.post("/auth/adminlogout");

      if (res.data.success) {
        localStorage.removeItem("admin");
        setAdmin(null);
        toast.success("Logged out successfully");
        navigate("/admin/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= NAVBAR ================= */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>

          {/* Admin + Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">
                {admin?.name || "Admin"}
              </p>

              <p className="text-xs text-gray-400">
                {admin?.email || "Administrator"}
              </p>
            </div>

            <div
              className="w-11 h-11 rounded-full bg-amber-100
              flex items-center justify-center font-semibold text-amber-700"
            >
              {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-50 text-red-500
              hover:bg-red-100 transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Welcome back, {admin?.name || "Admin"}
          </h2>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your restaurant today.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Bookings */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {bookings.length}
                </h3>
              </div>

              <div
                className="w-12 h-12 rounded-xl bg-blue-50
                flex items-center justify-center text-blue-600"
              >
                Booking
              </div>
            </div>

            <p className="text-xs text-green-500 mt-4">{bookings.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Categories</p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {categories.length}
                </h3>
              </div>

              <div
                className="w-12 h-12 rounded-xl bg-yellow-50
                flex items-center justify-center text-yellow-600"
              >
                Categories
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Menu</p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {menus.length}
                </h3>
              </div>

              <div
                className="w-12 h-12 rounded-xl bg-green-50
                flex items-center justify-center text-green-600"
              >
                Menu
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {allOrders.length}
                </h3>
              </div>

              <div
                className="w-12 h-12 rounded-xl bg-red-50
                flex items-center justify-center text-red-600"
              >
                Orders
              </div>
            </div>
          </div>
        </div>

        {/* ================= LOWER CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Recent Bookings */}
          <div
            className="lg:col-span-2 bg-white rounded-2xl
            border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Bookings
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Latest customer reservations
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/bookings")}
                className="text-sm text-amber-600 font-medium hover:underline"
              >
                View All
              </button>
            </div>

            {/* Booking 1 */}
            {bookings.map((item, index) => {
              return <div className="p-5 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-gray-100
                  flex items-center justify-center font-medium"
                  >
                    RS
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>

                    <p className="text-xs text-gray-400 mt-1">
                     {item.numberOfGuests} •{item.date} {item.time}
                    </p>
                  </div>
                </div>

                <span
                  className="px-3 py-1 rounded-full bg-yellow-100
                text-yellow-700 text-xs font-medium"
                >
                  {item.status}
                </span>
              </div>;
            })}
          </div>

          {/* Quick Actions */}
          <div
            className="bg-white rounded-2xl border border-gray-100
            shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>

            <p className="text-sm text-gray-400 mt-1 mb-5">
              Manage your restaurant
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/admin/bookings")}
                className="w-full p-4 rounded-xl bg-amber-50
                hover:bg-amber-100 transition text-left"
              >
                <p className="font-medium text-gray-800">Manage Bookings</p>

                <p className="text-xs text-gray-500 mt-1">
                  Approve or cancel reservations
                </p>
              </button>

              <button
                onClick={() => navigate("/admin/menus")}
                className="w-full p-4 rounded-xl bg-blue-50
                hover:bg-blue-100 transition text-left"
              >
                <p className="font-medium text-gray-800">Manage Menu</p>

                <p className="text-xs text-gray-500 mt-1">
                  Add or update food items
                </p>
              </button>

              <button
                onClick={() => navigate("/admin/categories")}
                className="w-full p-4 rounded-xl bg-green-50
                hover:bg-green-100 transition text-left"
              >
                <p className="font-medium text-gray-800">Categories</p>

                <p className="text-xs text-gray-500 mt-1">
                  Manage food categories
                </p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
