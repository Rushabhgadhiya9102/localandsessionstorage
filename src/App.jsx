import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LocalStorage from "./components/LocalStorage";
import SessionStorage from "./components/SessionStorage";

const App = () => {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg w-25 mx-auto mt-5 rounded-pill">
          <div className="container-fluid">

              <ul className="navbar-nav mx-auto">
                <li>
                  <Link 
                    to="/" 
                    className="text-decoration-none rounded-end-0 btn btn-outline-primary"
                  >
                    Local Storage
                  </Link>
                </li>
                <li>
                  <Link
                    to="/SessionStorage"
                    className="text-decoration-none rounded-start-0 btn btn-outline-danger"
                  >
                    Session Storage
                  </Link>
                </li>
              </ul>
          </div>
        </nav>

        

        <Routes>
          <Route path="/" element={<LocalStorage />} />
          <Route path="/SessionStorage" element={<SessionStorage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
