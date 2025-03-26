


import React, { useState } from "react";
import { motion } from "framer-motion";
import { Login, Signup } from "./LoginSignup";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");


  
  return (
    <>
    <div className="flex flex-col items-center mt-8  justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-128 p-8 m-56  bg-white rounded-lg shadow-2xl"
      >
        {/* Tab Switch */}
        <div className="flex justify-around mb-6 border-b pb-3">
          <button
            className={`w-1/2 py-2 transition-all duration-300 rounded-t-lg text-lg font-semibold ${
              activeTab === "login" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 transition-all duration-300 rounded-t-lg text-lg font-semibold ${
              activeTab === "signup" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>
        {/* Conditional Rendering */}
        <motion.div 
          key={activeTab} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "login" ? <Login /> : <Signup />}
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default AuthForm;
