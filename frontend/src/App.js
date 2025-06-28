//  Import the require packages
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


// Custom packages
import NavBar from './components/NavBar'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/ProfilePage'
import ProfileUpdate from './pages/UpdateProfile'

function App() {

  return (

    <div className=" m-2 border-2 border-green-500 flex flex-row gap-2 ">

      <Router >

        <NavBar />
        
         <Routes>

          <Route path="/" element={<h1>Home</h1>}></Route>

          <Route path="/search" element={<h1>search</h1>}></Route>

          <Route path="/explore" element={<h1>explore</h1>}></Route>

          <Route path="/create" element={<h1>create</h1>}></Route>

          <Route path="/profile" element={<Profile />}></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>
          
          <Route path="/update-profile" element={<ProfileUpdate /> }></Route>

          <Route path="/*" element={<h1>Page Not Found!</h1>}></Route>

         </Routes>
      
      </Router>

    </div>

  )

}

export default App;