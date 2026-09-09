
import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form Data:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute -top-32 -right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center">

          <p className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
            Get In Touch
          </p>

          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black mt-3">
            Contact <span className="text-amber-400">Us</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-7">
            Have a question, suggestion, or just want to say hello?
            We'd love to hear from you.
          </p>

        </div>
      </section>


      {/* ================= MAIN ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2">

            <p className="text-amber-500 font-bold text-xs uppercase tracking-[0.2em]">
              Let's Talk
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
              We'd love to hear from you.
            </h2>

            <p className="text-gray-500 mt-4 leading-7 text-sm sm:text-base">
              Whether you have a question about our menu, reservations,
              orders, or anything else, our team is ready to help.
            </p>


            {/* Email */}
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition mt-8">

              <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <FiMail size={21} />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Email
                </p>

                <p className="text-gray-800 font-semibold mt-1">
                  kv193111@gmail.com
                </p>
              </div>

            </div>


            {/* Phone */}
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition mt-4">

              <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <FiPhone size={21} />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Phone
                </p>

                <p className="text-gray-800 font-semibold mt-1">
                  +91 8171547808
                </p>
              </div>

            </div>


            {/* Location */}
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition mt-4">

              <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <FiMapPin size={21} />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Location
                </p>

                <p className="text-gray-800 font-semibold mt-1">
                  Noida,Sector-15 A Block
                </p>
              </div>

            </div>


            {/* Timing */}
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition mt-4">

              <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <FiClock size={21} />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Opening Hours
                </p>

                <p className="text-gray-800 font-semibold mt-1">
                  Mon - Sun · 10:00 AM - 11:00 PM
                </p>
              </div>

            </div>

          </div>


          {/* ================= FORM ================= */}
          <div className="lg:col-span-3">

            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">

              <div className="mb-7">

                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Send us a message
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Fill out the form and our team will get back to you.
                </p>

              </div>


              {/* Success Message */}
              {submitted && (
                <div className="mb-6 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-green-700 text-sm font-semibold">
                  ✓ Message submitted successfully!
                </div>
              )}


              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition"
                    />
                  </div>

                </div>


                {/* Phone + Subject */}
                <div className="grid sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition"
                    />
                  </div>

                </div>


                {/* Message */}
                <div>

                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="6"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none resize-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition"
                  />

                </div>


                {/* Submit */}
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 hover:bg-amber-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  Send Message
                  <FiSend size={18} />
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">

        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 sm:px-10 py-12 text-center">

          <div className="absolute w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -top-32 -right-20" />

          <div className="relative">

            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
              We're Here For You
            </p>

            <h2 className="text-white text-2xl sm:text-3xl font-black mt-2">
              Great food starts with great conversations.
            </h2>

            <p className="text-gray-400 text-sm mt-3">
              Your feedback helps us make your experience even better.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;

