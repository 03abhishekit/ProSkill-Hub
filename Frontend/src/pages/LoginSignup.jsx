import React, { useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../features/api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginUser, { isLoading }] = useLoginUserMutation();
   const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData).unwrap();
      toast.success("Login successful!");
      setTimeout(()=>{
        navigate("/");
      },2000);
    } catch (error) {
      setTimeout(()=>{
        navigate("/");
      },2000);
      toast.error(error?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center m-8 rounded-lg min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700">
        <div className="w-[450px] p-10 bg-white rounded-lg shadow-xl">
          <h2 className="text-3xl p-4 font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                </>
                )  : 
                (
                  "Login"
                )
                }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const errorMessage = error?.data?.message || "Signup failed!";
      
      // Check if the error is due to an already registered email (409 Conflict)
      if (error?.status === 404) {
        toast.error("Email already registered! Redirecting to Home...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center m-8 rounded-lg justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600">
        <div className="w-[450px] p-10 bg-white rounded-lg shadow-xl">
          <h2 className="text-3xl p-4 font-bold text-center text-gray-800 mb-6">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex justify-center items-center"
            >
              {
              isLoading ? 
              (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
                </>
              )
              : (
                "Signup"
              )
              }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { Login, Signup };
