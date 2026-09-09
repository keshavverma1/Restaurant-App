import React, { useContext, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";

const BookTable = () => {
  const { loading, setLoading, navigate, toast, user } =
    useContext(AppContext);

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [guests, setguests] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [note, setnote] = useState("");

  const resetForm = () => {
  setname("");
  setphone("");
  setguests("");
  setdate("");
  settime("");
  setHour("");
  setMinute("");
  setAmpm("AM");
  setnote("");
};

  const updateTime = (h, m, ap) => {
    if (h && m) {
      settime(`${h}:${m} ${ap}`);
    } else {
      settime("");
    }
  };

  const handleHourChange = (e) => {
    const value = e.target.value;
    setHour(value);
    updateTime(value, minute, ampm);
  };

  const handleMinuteChange = (e) => {
    const value = e.target.value;
    setMinute(value);
    updateTime(hour, value, ampm);
  };

  const handleAmpmChange = (e) => {
    const value = e.target.value;
    setAmpm(value);
    updateTime(hour, minute, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return toast.error("Please login to book a table");
    }

    if (!name || !phone || !guests || !date || !time) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      const formData = {
        user: user._id,
        name,
        phone,
        numberOfGuests: guests,
        date,
        time,
        note,
      };

      const res = await axios.post("/booking/create", formData);

      if (res.data.success) {
        toast.success(res.data.message);

        resetForm();
        navigate("/bookings");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-500/5"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm font-semibold mb-4">
            Get In Touch
          </p>

          <h1 className="text-4xl md:text-6xl font-bold">
            Book Your{" "}
            <span className="text-amber-400">
              Table
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5 text-sm md:text-base">
            Reserve your table and enjoy a delicious dining
            experience with your friends and family.
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto px-5 pb-20 pt-20">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-6 md:p-10">

          <form onSubmit={handleSubmit}>

            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 outline-none text-white placeholder-gray-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 outline-none text-white placeholder-gray-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                />
              </div>

            </div>

            {/* Guests + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

              {/* Guests */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Number of Guests
                </label>

                <select
                  value={guests}
                  onChange={(e) => setguests(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 outline-none text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                >
                  <option value="" className="bg-gray-900">
                    Select guests
                  </option>

                  <option value="1" className="bg-gray-900">
                    1 Guest
                  </option>

                  <option value="2" className="bg-gray-900">
                    2 Guests
                  </option>

                  <option value="3" className="bg-gray-900">
                    3 Guests
                  </option>

                  <option value="4" className="bg-gray-900">
                    4 Guests
                  </option>

                  <option value="5" className="bg-gray-900">
                    5 Guests
                  </option>

                  <option value="6" className="bg-gray-900">
                    6 Guests
                  </option>

                  <option value="7" className="bg-gray-900">
                    7 Guests
                  </option>

                  <option value="8" className="bg-gray-900">
                    8 Guests
                  </option>

                  <option value="9" className="bg-gray-900">
                    9 Guests
                  </option>

                  <option value="10" className="bg-gray-900">
                    10 Guests
                  </option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Booking Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 outline-none text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition [color-scheme:dark]"
                />
              </div>

            </div>

            {/* Time */}
            <div className="mt-5">

              <label className="block text-gray-300 text-sm font-medium mb-2">
                Preferred Time
              </label>

              <div className="grid grid-cols-[1fr_1fr_auto] gap-2">

                {/* Hour */}
                <select
                  value={hour}
                  onChange={handleHourChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 outline-none text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                >
                  <option value="" className="bg-gray-900">
                    Hour
                  </option>

                  {Array.from({ length: 12 }, (_, i) => {
                    const h = String(i + 1).padStart(2, "0");

                    return (
                      <option
                        key={h}
                        value={h}
                        className="bg-gray-900"
                      >
                        {h}
                      </option>
                    );
                  })}
                </select>

                {/* Minute */}
                <select
                  value={minute}
                  onChange={handleMinuteChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 outline-none text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                >
                  <option value="" className="bg-gray-900">
                    Minute
                  </option>

                  {["00", "15", "30", "45"].map((m) => (
                    <option
                      key={m}
                      value={m}
                      className="bg-gray-900"
                    >
                      {m}
                    </option>
                  ))}
                </select>

                {/* AM PM */}
                <select
                  value={ampm}
                  onChange={handleAmpmChange}
                  className="bg-amber-400 text-black font-semibold border border-amber-400 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400/30 transition cursor-pointer"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>

              </div>

              {time && (
                <p className="text-amber-400 text-xs mt-2">
                  Selected time:{" "}
                  <span className="font-semibold">
                    {time}
                  </span>
                </p>
              )}
            </div>

            {/* Special Note */}
            <div className="mt-5">

              <label className="block text-gray-300 text-sm font-medium mb-2">
                Special Note
              </label>

              <textarea
                rows="4"
                value={note}
                onChange={(e) => setnote(e.target.value)}
                placeholder="Any special request..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 outline-none text-white placeholder-gray-500 resize-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
              />

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-7 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-700 disabled:text-gray-400 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 active:scale-[0.98]"
            >
              {loading ? "Booking..." : "Reserve My Table"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTable;