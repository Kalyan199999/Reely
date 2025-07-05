import { useState, useEffect, useRef } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const fetchData = async () => {
    try {
      const url = 'http://localhost:5050/api/post/all-posts';
     
      const res = await triggerGetAllPosts(url);
      setPosts(res.data);
      
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
   
      fetchData();
    
  }, [isLogedIn]);

  // Observe video visibility and control play/pause
  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [posts]);

  return (
    <div className="w-full min-h-screen bg-pink-600 py-8 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col gap-8">
        {posts.length === 0 ? (
          <h2 className="text-lg text-center text-white ">Loading Posts</h2>
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
                className="w-full h-[75vh] bg-black"
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
                          className="h-full w-full object-fill cursor-zoom-in"
                          onClick={() => {
                            setSelectedMedia(src);
                            setIsModalOpen(true);
                          }}
                        />
                      ) : (
                        <video
                          ref={(el) => (videoRefs.current.push(el))}
                          controls
                          muted
                          src={src}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Action Buttons */}
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

      {/* Zoom Modal */}
      {isModalOpen && selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={selectedMedia}
            alt="Zoomed"
            className="max-w-full max-h-full object-contain p-4"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Home;