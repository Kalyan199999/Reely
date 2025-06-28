import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import useApi from "../customHooks/useApiPost";
import { useAuth } from "../config/AuthContext";


const PostUpload = () => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");

  const { triggerUploadPost } = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 10) {
      setError("You can upload a maximum of 10 files.");
      return;
    }

    setFiles(selectedFiles);
    setError("");

    const previewUrls = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image"
    }));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (files.length === 0 || description.trim() === "") {
      setError("All fields are required.");
      return;
    }

    const user_id = user?.data._id;
    const token = user?.token

    const formData = new FormData();

    formData.append("description", description);

    files.forEach((file) => formData.append("userpost", file));

    formData.append('user_id',user_id);

    const url = "http://localhost:5050/api/post/";

    const res = await triggerUploadPost(url,formData,token);

    console.log(res);
    
    if(res)
    {
      toast.success('Post uploaded successfully!')

      navigate('/')
    }
    else{
      toast.error('Post not uploaded')
    }

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Upload Post</h2>

        <textarea
          rows={4}
          className="w-full p-3 border rounded"
          placeholder="Write something about your post..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
            file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Swiper Preview Slider */}
        {previews.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full h-64 rounded overflow-hidden"
          >
            {previews.map((item, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={`preview-${index}`}
                    className="object-contain h-full w-full"
                  />
                ) : (
                  <video controls className="object-contain h-full w-full">
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>

      </form>
    </div>
  );
};

export default PostUpload;
