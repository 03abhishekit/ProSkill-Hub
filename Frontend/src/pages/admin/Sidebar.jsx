
import { ChartBar, BookOpen } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Dashboard Link */}
          <Link
            to="dashboard"
            className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg transition-all"
          >
            <ChartBar size={22} />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Courses Link */}
          <Link
            to="course"
            className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg transition-all"
          >
            <BookOpen size={22} />
            <span className="font-medium">Courses</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
