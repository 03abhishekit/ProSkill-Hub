import { useGetPurchasedCoursesQuery } from "../../features/api/purchaseApi";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const[isOpen, setIsOpen] = useState(false);
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading)
    return (
      <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
        Loading...
      </h1>
    );
  if (isError)
    return (
      <h1 className="text-red-500 text-lg font-semibold">
        Failed to get purchased courses
      </h1>
    );

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));
  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 md:p-8">
      <div className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 dark:from-gray-800 dark:via-gray-700 dark:to-black shadow-xl rounded-xl p-6 sm:p-8 border border-gray-300 dark:border-gray-700">
        <h2 className="text-gray-100 dark:text-gray-300 text-lg font-semibold">Total Sales</h2>
        <p className="text-4xl sm:text-5xl font-bold text-white mt-3">{totalSales}</p>
      </div>
      <div className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 dark:from-gray-800 dark:via-gray-700 dark:to-black shadow-xl rounded-xl p-6 sm:p-8 border border-gray-300 dark:border-gray-700">
        <h2 className="text-gray-100 dark:text-gray-300 text-lg font-semibold">Total Revenue</h2>
        <p className="text-4xl sm:text-5xl font-bold text-white mt-3">₹{totalRevenue}</p>
      </div>
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 sm:p-6 border border-gray-300 dark:border-gray-700 col-span-1 sm:col-span-2">
        <h2 className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl font-semibold mb-4">Course Prices</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={courseData} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#6b7280" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)", color: "#333" }} />
            <Line type="monotone" dataKey="price" stroke="#4a90e2" strokeWidth={3} dot={{ stroke: "#4a90e2", strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;



