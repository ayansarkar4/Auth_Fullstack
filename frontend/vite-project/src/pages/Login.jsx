import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from "../Utils.jsx";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newLoginInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handelError("Please fill all fields");
    }

    try {
      const url = "https://auth-fullstack-api.onrender.com/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      const {
        success,
        message,
        data: {
          accessToken,
          user: { fullName },
        },
      } = data;

      if (success) {
        handelSuccess(message);

        localStorage.setItem("token", accessToken);
        localStorage.setItem("loggedInUser", fullName);
       
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      }
    } catch (error) {
      handelError("Login failed. Please try again.");

      setLoginInfo({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-200">
      <div className="relative w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-white/40">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex justify-center mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">Login to continue!</p>

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
              value={loginInfo.email}
              autoComplete="off"
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
              value={loginInfo.password}
              placeholder="Password"
              autoComplete="off"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 shadow focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Remember Me */}
         

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Login
          </button>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-semibold underline hover:text-indigo-800"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
