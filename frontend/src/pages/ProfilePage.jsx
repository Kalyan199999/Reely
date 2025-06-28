// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../config/AuthContext'

const Profile = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800 p-4">
      
      {/* Section 1 */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between mb-6">
        
        {/* Profile Photo + Username */}
        <div className="flex flex-col items-center gap-2 md:w-1/3 text-center">
          <div className="h-32 w-32 bg-gray-300 rounded-full overflow-hidden border-2 border-pink-600">
            {user?.data.profile_photo ? (
              <img
                src={`http://localhost:5050/${user.data.profile_photo?.destination}/${user.data.profile_photo?.filename}`}
                alt={user.data.username}
                className="object-cover h-full w-full"
              />
            ) : (
              <span className="flex items-center justify-center h-full w-full text-white font-bold">
                No Photo
              </span>
            )}
          </div>
          <h1 className="text-xl font-semibold">{user?.data.username}</h1>
        </div>

        {/* Name and Email and Phone */}
        <div className="md:w-1/3 mt-4 md:mt-0 text-center md:text-left space-y-2">

          {
            user?.data.name && (
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {user.data.name}
              </p>
            )
          }

          {
              user?.data.email && (
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {user.data.email}
                </p>
              )
          }

          {
              user?.data.phone && (
                <p className="text-lg">
                  <span className="font-semibold">Phone:</span> {user.data.phone}
                </p>
              )
          }

        </div>

        {/* Edit Button */}
        <div className="md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0">

            <button 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={()=>{navigate('/update-profile')}}
            >
              Edit Profile
            </button>

        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Profile Details</h2>
        {/* Add more details or features here */}
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
};

export default Profile;