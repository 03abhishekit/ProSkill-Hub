

;

import { ChartBar, BookOpen,Menu, X } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-blue-600 text-white shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
  
        {/* Sidebar */}
        <aside
          className={`lg:flex flex-col w-[260px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 shadow-lg fixed lg:static h-screen transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="space-y-6">
            {/* Branding */}
            <div className="flex items-center gap-3 p-3 mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md">
              <ChartBar size={28} className="text-white" />
              <h1 className="text-lg font-bold">Admin Panel</h1>
            </div>
  
            {/* Dashboard Link */}
            <Link
              to="dashboard"
              className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300"
            >
              <ChartBar size={22} />
              <span className="font-medium">Dashboard</span>
            </Link>
  
            {/* Courses Link */}
            <Link
              to="course"
              className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300"
            >
              <BookOpen size={22} />
              <span className="font-medium">Courses</span>
            </Link>
          </div>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
         <Outlet/>
        </main>
      </div>
  );
};

export default Sidebar

