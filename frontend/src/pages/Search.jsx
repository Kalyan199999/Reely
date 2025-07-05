import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === '') {
      setUsers([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5050/api/user/search/${value}`);
      setUsers(res.data.data); // Adjust this based on actual structure
    } 
    catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <input
        type="text"
        placeholder="Search here..."
        value={searchText}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {
      users.length > 0 && (
        <div className="mt-6 space-y-4">
        
          {
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border rounded-md shadow-sm hover:bg-gray-50 cursor-pointer transition"
              onClick={()=>navigate(`/searched-profile/${user._id}`)}
            >

              {
                user.profile_photo ? (
                  <img
                    src={`http://localhost:5050/${user.profile_photo.path}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                )
              }

              <div>
                <p className="font-semibold text-gray-800">{user.username}</p>
                
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Search;
