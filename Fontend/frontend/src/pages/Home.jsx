import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiShoppingBag } from "react-icons/fi";

const Home = () => {
  const { categories, menus, handleCart, user,navigate } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#0f172a]">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* HERO CONTENT */}
            <div>
              <span className="inline-flex items-center gap-2 bg-amber-300/10 border border-amber-300/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FiStar />
                Delicious food, delivered with love
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Your cravings.
                <br />
                <span className="text-amber-300">Our passion.</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
                Discover delicious meals, explore new flavours and order your
                favourite food from our carefully curated menu.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/menu"
                  className="flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-[#0f172a] px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-300/10"
                >
                  Explore Menu
                  <FiArrowRight />
                </Link>

                <button
                  onClick={() => {
                    document.getElementById("categories")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-white px-6 py-3.5 rounded-xl font-semibold transition-all"
                >
                  View Categories
                </button>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative flex justify-center md:justify-end">
              <div className="absolute inset-0 bg-amber-300/10 blur-3xl rounded-full" />

              <img
                src="/public/Burger.png"
                alt="Delicious Food"
                className="relative w-64 sm:w-80 lg:w-[420px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= AD / PROMOTION ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-300 to-orange-400 p-7 sm:p-10">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-2xl" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[#0f172a]/60 text-sm font-bold uppercase tracking-widest">
                Special Offer
              </p>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mt-1">
                Hungry? Get your favourites today!
              </h2>

              <p className="text-[#0f172a]/70 mt-2">
                Fresh food, great taste and exclusive deals.
              </p>
            </div>

            <Link
              to="/menu"
              className="shrink-0 bg-[#0f172a] text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section id="categories" className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        {/* Heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber-500 font-bold text-xs sm:text-sm uppercase tracking-[0.25em]">
              Explore Our Menu
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-2">
              Browse Categories
            </h2>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Discover delicious choices made for every craving.
            </p>
          </div>

          <button
            type="button"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-amber-500 transition"
          >
            View All
            <FiArrowRight />
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {categories?.map((category) => (
            <button
              type="button"
              key={category._id}
              onClick={() => {
                // Abhi koi redirect nahi hoga
                console.log("Selected Category:", category.name);
              }}
              className="
          group relative overflow-hidden
          bg-white rounded-3xl
          border border-gray-100
          shadow-sm
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all duration-500
          text-left
          focus:outline-none
          focus:ring-2
          focus:ring-amber-400
        "
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="
              w-full h-full object-cover
              group-hover:scale-110
              transition-transform duration-700
            "
                />

                {/* Dark Gradient */}
                <div
                  className="
            absolute inset-0
            bg-gradient-to-t
            from-black/70
            via-black/10
            to-transparent
            opacity-80
          "
                />

                {/* Floating Arrow */}
                <div
                  className="
            absolute top-3 right-3
            w-9 h-9
            rounded-full
            bg-white/90
            backdrop-blur-sm
            flex items-center justify-center
            text-gray-800
            opacity-0
            translate-x-2
            group-hover:opacity-100
            group-hover:translate-x-0
            transition-all duration-300
          "
                >
                  <FiArrowRight size={16} />
                </div>

                {/* Category Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="
              text-white
              font-extrabold
              text-base
              sm:text-lg
              tracking-tight
            "
                  >
                    {category.name}
                  </h3>

                  <p
                    className="
              text-white/70
              text-[11px]
              mt-1
              uppercase
              tracking-wider
            "
                  >
                    Explore dishes
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ================= MENU ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-amber-500 font-bold text-sm uppercase tracking-widest">
                Our Menu
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
                Popular Dishes
              </h2>

              <p className="text-gray-500 mt-2">
                Made fresh. Served with flavour.
              </p>
            </div>

            <Link
              to="/menu"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-amber-500 transition"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menus?.map((menu) => (
              <div
                key={menu._id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-gray-700">
                    Popular
                  </div>

                  <div className="absolute bottom-4 right-4 bg-[#0f172a] text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                    ₹{menu.price}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-extrabold text-lg text-gray-900 line-clamp-1">
                      {menu.name}
                    </h3>

                    <div className="flex items-center gap-1 text-amber-500 text-sm shrink-0">
                      <FiStar className="fill-current" />
                      <span className="font-bold">4.8</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {menu.description ||
                      "Delicious food prepared with fresh ingredients and amazing flavours."}
                  </p>

                  <button
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                        return;
                      }

                      handleCart(menu._id, 1);
                    }}
                    className="w-full mt-5 flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-amber-300 hover:text-[#0f172a] text-white py-3 rounded-xl font-bold transition-all"
                  >
                    <FiShoppingBag />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="rounded-3xl bg-[#0f172a] px-6 sm:px-12 py-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl" />

          <div className="relative">
            <p className="text-amber-300 font-bold uppercase tracking-widest text-sm">
              Taste the difference
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Good food is always a good idea.
            </h2>

            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Explore our menu and discover something delicious for your next
              meal.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 mt-7 bg-amber-300 hover:bg-amber-400 text-[#0f172a] px-7 py-3.5 rounded-xl font-extrabold transition"
            >
              Explore Menu
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
