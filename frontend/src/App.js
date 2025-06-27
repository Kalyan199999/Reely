//  Import the require packages
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


// Custom packages
import NavBar from './components/NavBar'

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

          <Route path="/profile" element={<h1>profile</h1>}></Route>

          <Route path="/*" element={<h1>Page Not Found!</h1>}></Route>


         </Routes>
      
      </Router>

    </div>

  )

}

export default App;