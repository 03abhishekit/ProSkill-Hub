import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Course from "./Course";
import { Loader2 } from "lucide-react";
import { useLoadUserQuery, useUpdateUserMutation } from "../../features/api/authApi";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading, isError, error, isSuccess }] = useUpdateUserMutation();
  console.log(data);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully!");
    }
    
    if (isError) {
        const errorMessage = error?.message || "Failed to update profile due to a server issue.";
        toast.error(errorMessage);
    }
      
  }, [isSuccess, isError, error]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  if (isLoading) return <h1 className="text-center text-lg font-bold">Profile Loading...</h1>;
  
  const user = data?.user;

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <ToastContainer />
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5 p-6 border rounded-lg shadow-lg bg-white">
        <div className="flex flex-col items-center">
          <img
            className="h-24 w-24 md:h-32 md:w-32 rounded-full border"
            src={user?.photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        </div>
        <div className="w-full">
          <div className="mb-3">
            <p className="font-semibold text-gray-900">Name: <span className="font-normal text-gray-700">{user?.name}</span></p>
          </div>
          <div className="mb-3">
            <p className="font-semibold text-gray-900">Email: <span className="font-normal text-gray-700">{user?.email}</span></p>
          </div>
          <div className="mb-3">
            <p className="font-semibold text-gray-900">Role: <span className="font-normal text-gray-700">{user?.role?.toUpperCase()}</span></p>
          </div>
          <div className="border-t pt-4">
            <h2 className="text-lg font-medium">Edit Profile</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={onChangeHandler}
              className="w-full p-2 border rounded mt-2"
            />
            <button
              disabled={updateUserIsLoading}
              onClick={updateUserHandler}
              className="w-full bg-blue-500 text-white py-2 rounded mt-3 hover:bg-blue-600 transition disabled:bg-gray-400"
            >
              {updateUserIsLoading ? (
                <span className="flex justify-center items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user?.enrolledCourses?.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user?.enrolledCourses?.map((course) => <Course course={course} key={course._id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
