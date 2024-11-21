import './App.css'
import LoginGit from "./services/Login-Git.ts";

function App() {

  return (
      <>
          <h1>Brewing Stand</h1>

          <button onClick={LoginGit.CallGit}>
              login with github
          </button>

          <button onClick={LoginGit.Login}>
              Get Access Token
          </button>


      </>
  )
}

export default App
