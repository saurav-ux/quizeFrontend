import "./App.css";
import Quize from "./Components/Quize";
import Navv from "./Components/Navv";
import LoginPage from "./Components/SignInPage";
import Login from "./Components/Login";
import Start from "./Components/Start";
import LeaderBoard from "./Components/LeaderBoard";
import {
  BrowserRouter as Router7,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  const name = localStorage.getItem("name");

  return (
    <>
      <Router7>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navv />
                <Quize />
              </div>
            }
          />

          <Route
            path="/quize"
            element={
              <div>
                <Navv />
                <Quize />
              </div>
            }
          />

          <Route
            path="/signin"
            element={
              <>
                <Navv />
                <LoginPage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navv />
                <Login />
              </>
            }
          />
          <Route
            path="/leader"
            element={
              <div>
                <Navv />
                <LeaderBoard />
              </div>
            }
          />
        </Routes>
      </Router7>
    </>
  );
  // return (
  //   <div className="App">
  //     <Navv/>
  //    <Quize/>
  //   </div>
  // );
}

export default App;
