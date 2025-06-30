import { useState, useEffect } from 'react';

import { useAuth } from '../config/AuthContext';
import useApi from '../customHooks/useApiPost';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { FaHeart, FaComment, FaShare } from 'react-icons/fa';

const Home = () => {
  const { user, isLogedIn } = useAuth();
  const { triggerGetAllPosts } = useApi();

  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const url = 'http://localhost:5050/api/post/all-posts';
      const token = user.token;
      const res = await triggerGetAllPosts(url, token);

      setPosts(res.data);
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
    if (isLogedIn) {
      fetchData();
    }
  }, [isLogedIn]);

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-2 sm:px-4 flex flex-col items-center">
      {/* <h1 className="text-3xl font-bold mb-8">Instagram-style Posts</h1> */}

      <div className="w-full max-w-md flex flex-col gap-8">
        {posts.length === 0 ? (
          <h2 className="text-lg text-center">No Posts Found</h2>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* User Info */}
              <div className="flex items-center p-4 border-b">
                <img
                  src={
                    post.user_id?.profile_photo
                      ? `http://localhost:5050/${post.user_id.profile_photo.destination}/${post.user_id.profile_photo.filename}`
                      : 'https://via.placeholder.com/40'
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="ml-3 font-semibold text-gray-800">
                  {post.user_id?.username}
                </p>
              </div>

              {/* Media Swiper */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="w-full h-80 bg-black"
              >
                {post.post.map((media, index) => {
                  const isImage = media.mimetype.startsWith('image');
                  const src = `http://localhost:5050/${media.path}`;

                  return (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                      {isImage ? (
                        <img
                          src={src}
                          alt="Post media"
                          className="h-full w-full object-center"
                        />
                      ) : (
                        <video
                          controls
                          src={src}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Buttons */}
              <div className="flex items-center gap-6 text-xl px-4 py-2">
                <FaHeart className="cursor-pointer hover:text-red-500 transition" />
                <FaComment className="cursor-pointer hover:text-blue-500 transition" />
                <FaShare className="cursor-pointer hover:text-green-500 transition" />
              </div>

              {/* Description */}
              <div className="px-4 pb-4 text-sm text-gray-800">
                <span className="font-semibold">
                  {post.user_id?.username}
                </span>{' '}
                {post.description}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;