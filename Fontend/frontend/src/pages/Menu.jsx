
import React, { useContext, useMemo, useState } from "react";
import { FiSearch, FiShoppingBag, FiStar } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import Marquee from "./Marquee.jsx";

const Menu = () => {
  const { menus , handleCart } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from menu data
  const categories = useMemo(() => {
    const allCategories = menus
      ?.map((menu) => menu?.category?.name || menu?.category)
      .filter(Boolean);

    return ["All", ...new Set(allCategories)];
  }, [menus]);

  // Filter menus
  const filteredMenus = useMemo(() => {
    return menus?.filter((menu) => {
      const menuCategory =
        menu?.category?.name || menu?.category || "";

      const matchesCategory =
        selectedCategory === "All" ||
        menuCategory === selectedCategory;

      const matchesSearch =
        menu?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        menu?.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menus, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#fafafa]">

   {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#0f172a]">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">

          <div className="max-w-3xl">
            <p className="text-amber-300 uppercase tracking-[0.3em] text-xs sm:text-sm font-bold">
              Our Menu
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mt-3">
              Something delicious
              <span className="text-amber-300"> awaits you.</span>
            </h1>

            <p className="text-gray-400 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl">
              Explore our carefully crafted menu, made with fresh ingredients
              and packed with incredible flavours.
            </p>
          </div>

        </div>
      </section>
      {/* ================= MARQUEE ================= */}
      <Marquee />

   


      {/* ================= MENU SECTION ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">

        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between mb-10">

          {/* TITLE */}
          <div>
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest">
              Discover
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              Our Full Menu
            </h2>

            <p className="text-gray-500 mt-2">
              {filteredMenus?.length || 0} delicious items available
            </p>
          </div>


          {/* SEARCH */}
          <div className="relative w-full lg:w-80">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />

            <input
              type="text"
              placeholder="Search your favourite food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition"
            />

          </div>

        </div>


        {/* ================= CATEGORY FILTER ================= */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedCategory === category
                  ? "bg-[#0f172a] text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-500"
              }`}
            >
              {category}
            </button>
          ))}

        </div>


        {/* ================= MENU GRID ================= */}
        {filteredMenus?.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredMenus.map((menu) => (

              <div
                key={menu._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >

                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden bg-gray-100">

                  <img
                    src={menu?.image}
                    alt={menu?.name || "Food"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />


                  {/* CATEGORY */}
                  {(menu?.category?.name || menu?.category) && (
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-700">
                      {menu?.category?.name || menu?.category}
                    </span>
                  )}


                  {/* PRICE */}
                  <div className="absolute bottom-4 right-4 bg-[#0f172a] text-white px-4 py-2 rounded-xl font-extrabold shadow-lg">
                    ₹{menu?.price || 0}
                  </div>

                </div>


                {/* CONTENT */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <h3 className="text-lg font-extrabold text-gray-900 line-clamp-1">
                      {menu?.name || "Delicious Food"}
                    </h3>

                    <div className="flex items-center gap-1 shrink-0 text-amber-500">
                      <FiStar
                        size={15}
                        className="fill-current"
                      />
                      <span className="text-xs font-bold">
                        4.8
                      </span>
                    </div>

                  </div>


                  <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2 min-h-[40px]">
                    {menu?.description ||
                      "Freshly prepared with delicious ingredients and amazing flavours."}
                  </p>


                  {/* BOTTOM */}
                  <div className="flex items-center justify-between gap-3 mt-5">

                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                        Price
                      </p>

                      <p className="text-xl font-black text-gray-900">
                        ₹{menu?.price || 0}
                      </p>
                    </div>


                    <button
                    onClick={() => handleCart(menu._id,1)}
                      className="flex items-center gap-2 bg-[#0f172a] hover:bg-amber-300 hover:text-[#0f172a] text-white px-4 py-3 rounded-xl font-bold text-sm transition-all"
                    >
                      <FiShoppingBag size={17} />
                      Add
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= EMPTY STATE ================= */
          <div className="bg-white border border-gray-100 rounded-3xl py-20 text-center shadow-sm">

            <div className="text-6xl mb-5">
              🍽️
            </div>

            <h3 className="text-2xl font-extrabold text-gray-800">
              No dishes found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search or choose a different category.
            </p>

          </div>

        )}

      </section>


      {/* ================= PREMIUM CTA ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#0f172a] px-6 sm:px-12 py-12 md:py-14">

          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-amber-300/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-7">

            <div>
              <p className="text-amber-300 uppercase tracking-widest text-xs font-bold">
                Made for food lovers
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Can't decide what to eat?
              </h2>

              <p className="text-gray-400 mt-2">
                Pick your favourite dish and make your day delicious.
              </p>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="bg-amber-300 hover:bg-amber-400 text-[#0f172a] px-6 py-3.5 rounded-xl font-extrabold transition shrink-0"
            >
              Explore All
            </button>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Menu;
