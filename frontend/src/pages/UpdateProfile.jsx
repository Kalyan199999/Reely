import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../config/AuthContext";
import useApi from '../customHooks/useApiPost'

const ProfileUpdate = () => {

  const { user, isLogedIn, login } = useAuth();

  const {triggerUpdateUser} = useApi()

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
    profile_photo: "",
  });

  const [preview, setPreview] = useState(""); // for image preview

  const [selectedImage, setSelectedImage] = useState(null); // raw file

  useEffect(() => {
    if (isLogedIn && user?.data) {
      setUserDetails((prev) => ({
        ...prev,
        ...user.data,
      }));

      setPreview(user.data.profile_photo || ""); // preview existing image

    }
  }, [isLogedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); // show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", userDetails.username);
    formData.append("email", userDetails.email);
    formData.append("name", userDetails.name);
    formData.append("phone", userDetails.phone);

    if (selectedImage) {
      formData.append("profile_photo", selectedImage);
    }

    // console.log("FormData contents:");

    // for (let pair of formData.entries()) 
    // {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    const url = `http://localhost:5050/api/user/${user.data._id}`;
    // const res = await triggerUpdateUser( url , formData , user.token );
    console.log(url);
    console.log(userDetails._id);
    
    console.log(user.token);
    
    
    
    // if(res)
    // {
    //   console.log("User updated successfully");
    //   login(res)
    //   navigate('/')
      
    // }
    
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">

      {
      !isLogedIn ? (
        <h1 className="text-2xl font-bold">Loading...</h1>
      ) 
      : 
      (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Update Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">

            {/* Image Preview */}
            <div className="text-center">
              {preview ? (            
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="h-24 w-24 rounded-full mx-auto object-cover border"
                />
              ) : (
                <div className="h-24 w-24 rounded-full mx-auto bg-gray-300" />
              )}
            </div>

            {/* Image Input */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Username */}
            <div>
              <input
                type="text"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded disabled:{true}"
                disabled
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
                disabled
              />
            </div>

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;