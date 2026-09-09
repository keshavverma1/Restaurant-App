
import React from "react";

const foods = [
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    doodle: "🍔",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80",
    doodle: "🍕",
  },
  {
    name: "Garlic Bread",
    image:
      "https://www.ambitiouskitchen.com/wp-content/uploads/2018/01/garlicbread-4.jpg",
    doodle: "🧄",
  },
  {
    name: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80",
    doodle: "🥤",
  },
];

export default function Marquee() {
  // Duplicate items for seamless marquee
  const marqueeItems = [...foods, ...foods, ...foods];

  return (
    <div className="w-full">

      {/* ================= MARQUEE ================= */}
      <section className="w-full overflow-hidden bg-[#080c13] py-5 sm:py-6 md:py-8">

        {/* Heading */}
        <div className="mb-3 text-center sm:mb-4 md:mb-5">
          <p className="text-[9px] tracking-[3px] text-amber-400 sm:text-[10px] sm:tracking-[4px] md:text-xs md:tracking-[5px]">
            Fresh • Tasty • Delicious
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden">

          {/* Left Fade */}
          <div
            className="
              absolute left-0 top-0 z-10 h-full
              w-8
              bg-gradient-to-r from-[#080c13] to-transparent
              sm:w-12
              md:w-20
            "
          />

          {/* Right Fade */}
          <div
            className="
              absolute right-0 top-0 z-10 h-full
              w-8
              bg-gradient-to-l from-[#080c13] to-transparent
              sm:w-12
              md:w-20
            "
          />

          {/* Moving Content */}
          <div className="flex w-max animate-marquee">

            {marqueeItems.map((food, index) => (
              <div
                key={index}
                className="
                  group relative mx-1.5 flex shrink-0
                  w-[125px]
                  flex-col items-center
                  rounded-xl
                  px-2 py-2
                  transition-all duration-300

                  sm:mx-2
                  sm:w-[150px]
                  sm:px-3 sm:py-2.5

                  md:mx-3
                  md:w-[190px]
                  md:px-4 md:py-3
                "
              >

                {/* Small Doodle */}
                <span
                  className="
                    absolute right-2 top-0
                    text-sm opacity-70
                    transition-transform duration-300
                    group-hover:rotate-[-10deg]
                    group-hover:scale-125

                    sm:right-3
                    sm:text-base

                    md:right-5
                    md:text-lg
                  "
                >
                  {food.doodle}
                </span>

                {/* Food Image */}
                <div
                  className="
                    relative h-[80px] w-[115px]
                    overflow-hidden rounded-lg

                    sm:h-[100px]
                    sm:w-[140px]
                    sm:rounded-xl

                    md:h-[125px]
                    md:w-[170px]
                  "
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="
                      h-full w-full object-cover
                      transition duration-500
                      group-hover:scale-110
                    "
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Food Name */}
                <p
                  className="
                    mt-2 text-[11px]
                    font-semibold italic
                    tracking-wide text-white/90

                    sm:mt-2.5
                    sm:text-xs

                    md:mt-3
                    md:text-sm
                  "
                >
                  {food.name}
                </p>

                {/* Hand Drawn Style Line */}
                <div
                  className="
                    relative mt-0.5
                    h-1.5 w-8

                    sm:mt-1
                    sm:w-10

                    md:w-12
                  "
                >
                  <span
                    className="
                      absolute left-0 top-1
                      h-[1.5px] w-7
                      rotate-[-4deg]
                      rounded-full bg-amber-400

                      sm:w-8

                      md:h-[2px]
                      md:w-10
                    "
                  />

                  <span
                    className="
                      absolute left-1 top-0
                      h-[1px] w-5
                      rotate-[3deg]
                      bg-amber-300

                      sm:left-2
                      sm:w-6

                      md:w-7
                    "
                  />
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CSS ================= */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 22s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 18s;
          }
        }

        @media (min-width: 768px) {
          .animate-marquee {
            animation-duration: 22s;
          }
        }
      `}</style>

    </div>
  );

}
