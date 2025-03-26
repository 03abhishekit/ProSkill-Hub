import React from "react";
// import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
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
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();
     
  if (isLoading) return <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>;
  if (isError) return <h1 className="text-red-500 text-lg font-semibold">Failed to get purchased courses</h1>;

  
  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));
;
  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;
     
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {/* Total Sales Card */}
      <div className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-gray-600 dark:text-gray-300 text-lg font-semibold">Total Sales</h2>
        <p className="text-3xl font-bold text-blue-600 mt-2">{totalSales}</p>
      </div>

      {/* Total Revenue Card */}
      <div className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-gray-600 dark:text-gray-300 text-lg font-semibold">Total Revenue</h2>
        <p className="text-3xl font-bold text-blue-600 mt-2">₹{totalRevenue}</p>
      </div>

      {/* Course Prices Chart */}
      <div className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl p-6 border border-gray-200 dark:border-gray-700 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <h2 className="text-gray-700 dark:text-gray-300 text-xl font-semibold mb-4">Course Prices</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={courseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              angle={-30}
              textAnchor="end"
              interval={0}
            />
            <YAxis stroke="#6b7280" />
            <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4a90e2"
              strokeWidth={3}
              dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
