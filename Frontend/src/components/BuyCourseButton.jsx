import { useCreateCheckoutSessionMutation } from "../features/api/purchaseApi";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";


const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; 
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <button
        disabled={isLoading}
        onClick={purchaseCourseHandler}
        className="w-full sm:w-64 flex items-center justify-center gap-2 py-3 px-6 rounded-lg 
                   bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold 
                   transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg 
                   disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
         >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          "Purchase Course"
        )}
      </button>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" /> */}
    </div>
  );
};

export default BuyCourseButton;
