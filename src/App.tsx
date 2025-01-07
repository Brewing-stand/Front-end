import './App.css'
import Navbar from "./components/Navbar.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {AuthGit} from "./pages/AuthGit.tsx";
import Projects from "./pages/Projects.tsx";

function App() {

  return (
      <>
          <Router>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/Projects" element={<Projects/>}/>
                  <Route path="/Auth/Git" element={<AuthGit/>}/>
              </Routes>
          </Router>
      </>
  )
}

export default App
