import './App.css'
import Navbar from "./components/Navbar.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {AuthGit} from "./pages/auth/AuthGit.tsx";
import Projects from "./pages/Projects.tsx";
import Auth from "./pages/auth/Auth.tsx";
import Settings from "./pages/user/Settings.tsx";

function App() {

  return (
      <>
          <Router>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>

                  <Route path="/Auth" element={<Auth/>}/>
                  <Route path="/Auth/Git" element={<AuthGit/>}/>

                  <Route path="/User/Settings" element={<Settings/>}/>

                  <Route path="/Projects" element={<Projects/>}/>
              </Routes>
          </Router>
      </>
  )
}

export default App
