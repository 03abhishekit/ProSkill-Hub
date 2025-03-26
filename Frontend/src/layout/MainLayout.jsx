import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
       <Navbar/>

      {/* Main Content */}
      <main className="flex-1 mt-16 p-4 md:p-8">
        <Outlet/>
      </main>
    </div>
  );
};

export default MainLayout;
