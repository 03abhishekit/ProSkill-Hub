import { useLoadUserQuery, useUpdateUserMutation } from "../../features/api/authApi";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../assets/image.jpg";
import Course from "./Course";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading, isError, error, isSuccess }] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully!");
    }

    if (isError) {
      const errorMessage = error.message || "Failed to update profile.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, refetch]);

  if (isLoading) return <h1 className="text-center text-lg font-bold">Loading Profile...</h1>;

  const user = data && data.user;

  return (
    <div className="max-w-5xl mx-auto px-6 my-12">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-center">
        Profile
      </h1>

      <div className="mt-10 flex flex-col md:flex-row items-center md:items-start gap-8 p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoUrl || image}
            alt="Profile"
            className="h-32 w-32 rounded-xl border border-gray-300 dark:border-gray-600 shadow-md"
            onError={(e) => {
              e.target.src = image;
            }}
          />
        </div>
        <div className="w-full">
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Name: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.name}</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Email: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.email}</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Role: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.role?.toUpperCase()}</span>
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Edit Profile</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Update Name"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mt-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
            <input
              type="file"
              accept="image/*"
              onChange={onChangeHandler}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mt-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
            <button
              disabled={updateUserIsLoading}
              onClick={updateUserHandler}
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-3 hover:bg-blue-600 transition disabled:bg-gray-400"
            >
              {updateUserIsLoading ? (
                <span className="flex justify-center items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enrolled Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user?.enrolledCourses?.length === 0 ? (
            <p className="text-center text-lg text-gray-500 dark:text-gray-300">
              You haven't enrolled in any courses yet.
            </p>
          ) : (
            user?.enrolledCourses.map((course) => <Course key={course._id} course={course} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;