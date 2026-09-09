import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ToastContainer, toast , Bounce } from "react-toastify";

const AdminLogin = () => {
  const { axios, loading, setLoading , navigate , user, setUser , admin, setAdmin } = useContext(AppContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const formData = {
    email,
    password,
  };

  
  const formhandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
      const res = await axios.post("auth/admin", formData, { withCredentials: true });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        setemail("");
        setpassword("");
       
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
         setAdmin(res.data.admin);
       
         console.log("ADMIN LOGIN:", res.data.admin);
          navigate("/admin/");



      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };
return (
  <>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />

    <div className="min-h-screen w-full flex">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block lg:w-1/2 h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop"
          alt="Food"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-5 py-10">

        <form
          onSubmit={formhandler}
          className="w-full max-w-md flex flex-col items-center justify-center"
        >

          <h2 className="text-4xl text-gray-900 font-medium">
            Log in
          </h2>

          <p className="text-sm text-gray-500/90 mt-3 text-center">
            Welcome back! Please Log in to continue
          </p>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>

            <p className="text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>

            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">

            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>

            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">

            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>

            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-black font-semibold bg-amber-300 hover:bg-amber-400 transition-all"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </div>
  </>
);
};

export default AdminLogin;
