import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from "../Utils.jsx";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSignupInfo = { ...signupInfo, [name]: value };
    setSignupInfo(newSignupInfo);
  };
  const handelsignup = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = signupInfo;
    if (!fullName || !email || !password) {
      console.log("Calling handelError"); // Add this
      return handelError("Please fill all fields");
    }
    if (password.length < 4) {
      handelError("Password must be at least 4 characters long");
      setSignupInfo({ fullName: "", email: "", password: "" });
      return;
    }
    try {
      const url = "https://auth-fullstack-api.onrender.com/users/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const data = await response.json();
      console.log("Response data:", data);
      const { success, message } = data;
      if (success) {
        handelSuccess(message);
        setSignupInfo({ fullName: "", email: "", password: "" });
        setTimeout(() => {
          window.location.href = "/login"; // Redirect to login page after 1 second
        }, 1000);
      }
    } catch (error) {
      handelError("Signup failed. Please try again.");
      setSignupInfo({ fullName: "", email: "", password: "" });
    }
  };
  console.log("signupInfo", signupInfo);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-200">
      <div className="relative w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-white/40">
        <form onSubmit={handelsignup} className="space-y-5">
          <div className="flex justify-center mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Create your account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign up to get started!
          </p>

          {/* Name Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A7.975 7.975 0 0012 20a7.975 7.975 0 006.879-2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              onChange={handleChange}
              name="fullName"
              value={signupInfo.fullName}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 shadow focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m8 0V8a4 4 0 10-8 0v4m8 0v4a4 4 0 01-8 0v-4"
                />
              </svg>
            </span>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={signupInfo.email}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 shadow focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v2m0 4h.01"
                />
              </svg>
            </span>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={signupInfo.password}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 shadow focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Remember Me */}
          {/* <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div> */}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Sign Up
          </button>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-semibold underline hover:text-indigo-800"
            >
              Login
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
