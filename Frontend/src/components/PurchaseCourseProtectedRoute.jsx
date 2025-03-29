

import { useParams, Navigate } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "../features/api/purchaseApi";


const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );

  return data?.purchased ? children : <Navigate to={`/course-detail/${courseId}`} />;
};

export default PurchaseCourseProtectedRoute;
