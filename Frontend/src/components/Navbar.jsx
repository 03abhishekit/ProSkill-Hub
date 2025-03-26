import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/api/authApi";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  // console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser, { data, isSuccess }] =  useLogoutUserMutation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.", { position: "top-right" });
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-extrabold text-blue-600">E</span>
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300">
            E-Learning
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {user ? (
             <div className="relative">
             {/* Avatar Button */}
             <button
               onClick={() => setIsOpen(!isOpen)}
               className="flex items-center gap-2 text-gray-800 hover:text-blue-600 focus:outline-none"
             >
               <img
                 src={user?.photoURL || "https://github.com/shadcn.png"}
                 alt="Avatar"
                 className="w-10 h-10 rounded-full border"
               />
             </button>
       
             {/* Dropdown Menu */}
             {isOpen && (
               <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border transition-all duration-200 ease-in-out">
                <h3 className="py-2 text-gray-700 block px-5 py-2 hover:bg-gray-100 rounded-md">My Account</h3>
                 <ul className="py-2 text-gray-700">
                   <li>
                     <Link
                       to="/myLearning"
                       className="block px-5 py-2 hover:bg-gray-100 rounded-md"
                     >
                       My Learning
                     </Link>
                   </li>
                   <li>
                     <Link
                       to="/profile"
                       className="block px-5 py-2 hover:bg-gray-100 rounded-md"
                     >
                       Edit Profile
                     </Link>
                   </li>
                   <li>
                     <button
                       onClick={logoutHandler}
                       className="block w-full text-left px-5 py-2 hover:bg-gray-100 rounded-md"
                     >
                       Log out
                     </button>
                   </li>
                   {user?.role === "instructor" && (
                     <li>
                       <Link
                         to="/admin/dashboard"
                         className="block px-5 py-2 hover:bg-gray-100 rounded-md"
                       >
                         Dashboard
                       </Link>
                     </li>
                   )}
                 </ul>
               </div>
             )}
           </div>
          ) : (
            <div className="flex gap-4">
              <button onClick={() => navigate("/login")} className="px-5 py-2 border rounded-md hover:bg-gray-100 transition duration-300">
                Login
              </button>
              <button onClick={() => navigate("/login")} className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Signup
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-800">
          ☰
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4">
          <nav className="flex flex-col space-y-3">
            {user ? (
              <>
                <Link to="/myLearning" className="py-2 border-b hover:text-blue-600">My Learning</Link>
                <Link to="/profile" className="py-2 border-b hover:text-blue-600">Edit Profile</Link>
                <button onClick={logoutHandler} className="py-2 text-left w-full border-b hover:text-blue-600">
                  Log out
                </button>
                {user?.role === "instructor" && (
                  <Link to="/admin/dashboard" className="py-2 hover:text-blue-600">Dashboard</Link>
                )}
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="py-2 border-b hover:text-blue-600">
                  Login
                </button>
                <button onClick={() => navigate("/signup")} className="py-2 border-b hover:text-blue-600">
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
