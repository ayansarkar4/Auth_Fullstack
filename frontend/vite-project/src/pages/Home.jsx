import React, { useEffect, useState ,} from "react";
import { handelError, handelSuccess } from "../Utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("Guest");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "Guest");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    
    handelSuccess("You have successfully logged out.");
    setTimeout(() => {
      navigate("/login")
      
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://auth-fullstack-api.onrender.com/products/p";
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(url, headers);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      handelError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-gray-900 to-purple-900 flex flex-col items-center px-4">
      {/* Header */}
      <header className="w-full max-w-3xl flex flex-col items-center mb-10 mt-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
          Welcome, <span className="text-indigo-400">{loggedInUser}</span>!
        </h1>
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
        <ToastContainer />
      </header>

      {/* Product Grid */}
      <main className="w-full max-w-6xl mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-white text-lg py-20">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id || product.name}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-200 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h2>
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Category Badge */}
                    {product.category && (
                      <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-semibold">
                        {product.category}
                      </span>
                    )}
                    {/* Stock Badge */}
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        product.inStock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-indigo-600">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <button className="ml-2 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs shadow">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto mb-6 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} CSS Project. Crafted with{" "}
        <span className="text-pink-400">♥</span> using React & Tailwind CSS.
      </footer>
    </div>
  );
};

export default Home;
