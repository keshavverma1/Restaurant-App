
import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172A] text-white relative overflow-hidden">

      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-amber-300/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Newsletter */}
        <div className="py-12 border-b border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-7">

            <div className="text-center lg:text-left">
              <p className="text-amber-300 font-semibold text-sm uppercase tracking-widest">
                Hungry already?
              </p>

              <h2
                className="text-3xl sm:text-4xl font-bold mt-2"
                style={{ fontFamily: '"Urbanist", sans-serif' }}
              >
                Get tasty updates 🍔
              </h2>

              <p className="text-gray-400 mt-2">
                New dishes, special offers & delicious deals straight to you.
              </p>
            </div>

            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-72 px-5 py-3.5 rounded-l-full
                           bg-white/10 border border-white/10
                           outline-none text-white placeholder-gray-500
                           focus:border-amber-300 transition"
              />

              <button
                className="px-6 py-3.5 bg-amber-300 text-[#0f172A]
                           font-bold rounded-r-full
                           hover:bg-amber-400 transition-all
                           whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>

          </div>
        </div>

        {/* Main Footer */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-1 w-fit">
              <img
                src="/Burger.png"
                alt="Order Now"
                className="w-16 h-16 object-contain"
              />

              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: '"Urbanist", sans-serif' }}
              >
                Order
                <span className="bg-amber-300 text-[#0f172A] rounded-full px-2 py-1 ml-1">
                  now
                </span>
              </h1>
            </Link>

            <p className="text-gray-400 text-sm leading-6 mt-5 max-w-xs">
              Delicious food, delivered fresh and fast. From juicy burgers
              to cheesy pizzas — your cravings, our responsibility. 🍕
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center
                           rounded-full bg-white/10
                           hover:bg-amber-300 hover:text-black
                           transition-all duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center
                           rounded-full bg-white/10
                           hover:bg-amber-300 hover:text-black
                           transition-all duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center
                           rounded-full bg-white/10
                           hover:bg-amber-300 hover:text-black
                           transition-all duration-300"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center
                           rounded-full bg-white/10
                           hover:bg-amber-300 hover:text-black
                           transition-all duration-300"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <Link
                  to="/"
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/menu"
                  className="hover:text-amber-300 transition-colors"
                >
                  Our Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-amber-300 transition-colors"
                >
                  Contact Us
                </Link>
              </li>

             

            </ul>
          </div>

     

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full
                                bg-amber-300/10 flex items-center
                                justify-center text-amber-300">
                  <FaMapMarkerAlt />
                </div>

                <p className="text-sm leading-6">
                  Sector 18, Noida,
                  <br />
                  Uttar Pradesh, India
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full
                                bg-amber-300/10 flex items-center
                                justify-center text-amber-300">
                  <FaPhoneAlt />
                </div>

                <p className="text-sm">
                  +91 8171547808
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full
                                bg-amber-300/10 flex items-center
                                justify-center text-amber-300">
                  <FaEnvelope />
                </div>

                <p className="text-sm break-all">
                  kv193111@gmail.com
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div
          className="py-6 border-t border-white/10
                     flex flex-col sm:flex-row
                     items-center justify-between gap-4"
        >

          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2026 Order Now. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-amber-300 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-amber-300 transition">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
