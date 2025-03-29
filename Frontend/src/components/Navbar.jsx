import { useLogoutUserMutation } from "../features/api/authApi";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Code } from "lucide-react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkMode from "../DarkMode";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    await logoutUser();
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(data?.message || "User logged out.", { position: "top-right" });
  //     navigate("/login");
  //   }
  // }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.", { position: "top-right" });
      navigate("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-800 via-indigo-700 to-pink-600 shadow-lg z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex justify-between items-center h-28">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <span className="text-4xl font-extrabold text-white drop-shadow-lg">
            <Code size={32} />
          </span>
          <Link
            to="/"
            className="text-3xl font-bold text-white hover:text-yellow-300 hover:scale-105 transition-transform duration-300"
          >
            ProSkill Hub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-white">
          {user ? (
            <>
              <Link
                to="/my-learning"
                className="hover:text-yellow-300 px-4 py-2 rounded-md transition-colors duration-300"
              >
                My Learning
              </Link>
               
              <Link
                to="/profile"
                className="hover:text-yellow-300 px-4 py-2 rounded-md transition-colors duration-300"
              >
                Edit Profile
              </Link>

              {user?.role === "instructor" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-yellow-300 px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="border border-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-white transition duration-300"
              >
                Log out
              </button>
              <DarkMode/>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-white transition duration-300 shadow-md"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-300 shadow-md"
              >
                Signup
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-3xl hover:scale-110 transition-transform duration-200"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={profileRef}
          className="absolute top-20 left-0 w-full bg-white shadow-lg px-8 py-5 rounded-lg transition-transform duration-300"
        >
          <nav className="flex flex-col space-y-4 text-gray-800">
            {user ? (
              <>
                <Link
                  to="/my-learning"
                  className="py-3 border-b hover:text-purple-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Learning
                </Link>
               
                <Link
                  to="/profile"
                  className="py-3 border-b hover:text-purple-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Edit Profile
                </Link>
                {user?.role === "instructor" && (
                  <Link
                    to="/admin/dashboard"
                    className="py-3 border-b hover:text-purple-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="py-3 text-left w-full border-b hover:text-purple-700 transition-colors duration-200"
                >
                  Log out
                </button>
                <DarkMode/>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="py-3 border-b hover:text-purple-700 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="py-3 border-b hover:text-purple-700 transition-colors duration-200"
                >
                  Signup
                </button>
              </>
            )}
          </nav>
        </div>
      )}
      <ToastContainer />
    </header>
  );
};

export default Navbar;
