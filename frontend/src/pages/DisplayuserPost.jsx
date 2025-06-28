import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useAuth } from '../config/AuthContext';
import useApi from '../customHooks/useApiPost';

// Optional: Register modules manually (Swiper v9+ only)
import SwiperCore from 'swiper';
SwiperCore.use([Navigation, Pagination]);

const DisplayUserPost = () => {
  const { user } = useAuth();
  const { triggerGetPostById } = useApi();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    if (user) {
      try {
        const url = `http://localhost:5050/api/post/${user?.data._id}`;
        const token = user?.token;

        const res = await triggerGetPostById(url, token);
        setPosts(res?.data || []);
        setIsLoading(false);
        toast.success('Posts fetched successfully!');
      } catch (error) {
        toast.error('Failed to fetch posts!');
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [user]);

  return (
    <div className="p-4">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : posts.length === 0 ? (
        <h2>No Posts Found</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="mb-4">{post.description}</p>

              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="w-full h-64 cursor-pointer"
                
              >
                {post.post.map((media, index) => {
                  const isImage = media.mimetype.startsWith('image');
                  const src = `http://localhost:5050/${media.destination}/${media.filename}`;

                  return (
                    <SwiperSlide key={index}>
                      {isImage ? (
                        <img
                          src={src}
                          alt="Post media"
                          className="w-full h-64 object-contain rounded"
                        />
                      ) : (
                        <video
                          controls
                          src={src}
                          className="w-full h-64 object-cover rounded"
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayUserPost;