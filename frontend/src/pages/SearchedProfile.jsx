import  { useState , useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useApi from '../customHooks/useApiPost'

import { useParams } from 'react-router-dom'

function SearchedProfile() {

    const id = useParams().id

    const [ user , setUser ] = useState({});

    const [ post , setPost ] = useState([]);

    const { triggerGetPostById,triggerUserById } = useApi();

    const handleFetch = async () => {

        try 
        {
            const url1 = `http://localhost:5050/api/user/${id}`
            const url2 = `http://localhost:5050/api/post/${id}`

            const response1 = await triggerUserById(url1);
            const response2 = await triggerGetPostById(url2);

            setUser(response1.data);
            setPost(response2.data);
            
            
        } 
        catch (error) {
            console.log("error");
            
        }
        
    }

    useEffect(()=>{
        handleFetch()
    } , [])
    
    
  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800 p-4">
      
      {/* Section 1 */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between mb-6">
        
            {/* Profile Photo + Username */}
            <div className="flex flex-col items-center gap-2 md:w-1/3 text-center">
              <div className="h-32 w-32 bg-gray-300 rounded-full overflow-hidden border-2 border-pink-600">
    
                {user.profile_photo ? (
                  <img
                    src={`http://localhost:5050/${user.profile_photo.path}`}
                    alt={user.username}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="flex items-center justify-center h-full w-full text-white font-bold">
                    No Photo
                  </span>
                )}
              </div>
              <h1 className="text-xl font-semibold">{user.username}</h1>
            </div>
    
            {/* Name and Email and Phone */}
            <div className="md:w-1/3 mt-4 md:mt-0 text-center md:text-left space-y-2">
    
              {
                user.name && (
                  <p className="text-lg">
                    <span className="font-semibold">Name:</span> {user.name}
                  </p>
                )
              }
    
              {
                  user.email && (
                    <p className="text-lg">
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>
                  )
              }
    
              {
                  user.phone && (
                    <p className="text-lg">
                      <span className="font-semibold">Phone:</span> {user.phone}
                    </p>
                  )
              }
    
            </div>

        </div>

        <div className="p-4">

      { 
            post.length === 0 ? (
              <h2>No Posts Found</h2>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {post.map((post) => (
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
                ))
              }

            </div>
        )}

    </div>

    </div>
  )
}

export default SearchedProfile
