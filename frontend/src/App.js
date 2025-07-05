//  Import the require packages
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

// For toast
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';



// Custom packages
import NavBar from './components/NavBar'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/ProfilePage'
import ProfileUpdate from './pages/UpdateProfile'
import PostUpload from './pages/PostUpload'
import Search from './pages/Search'

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <NavBar />

        {/* Main content with left margin equal to sidebar width */}
        <div className="ml-64 w-full p-4">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<h1>explore</h1>} />
            <Route path="/create" element={<PostUpload />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update-profile" element={<ProfileUpdate />} />
            <Route path="/*" element={<h1>Page Not Found!</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;