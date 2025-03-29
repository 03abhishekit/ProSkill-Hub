


import { useGetCreatorCourseQuery } from "../../../features/api/courseApi";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";
import React from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <h1 className="text-center text-lg font-semibold">Loading...</h1>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <button 
        onClick={() => navigate(`create`)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
      >
        Create a new course
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <caption className="text-gray-700 text-sm py-2">
            A list of your recent courses.
          </caption>
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border border-gray-300 w-[100px]">Price</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300 font-medium">{course?.coursePrice || "NA"}</td>
                <td className="p-3 border border-gray-300">
                
                <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      course.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                </span>

                </td>
                <td className="p-3 border border-gray-300">{course.courseTitle}</td>
                <td className="p-3 border border-gray-300 text-right">
                  <button
                    onClick={() => navigate(`${course._id}`)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-all"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
