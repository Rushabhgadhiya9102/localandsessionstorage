import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LocalStorage from "./components/LocalStorage";
import SessionStorage from "./components/SessionStorage";

const App = () => {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg w-25 border border-primary mx-auto mt-5 rounded-pill">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav mx-auto gap-3">
                <li>
                  <Link to="/" className="text-decoration-none text-black">
                    Local Storage
                  </Link>
                </li>
                <li>
                  <Link
                    to="/SessionStorage"
                    className="text-decoration-none text-black"
                  >
                    Session Storage
                  </Link>
                </li>
              </ul>
            </div>
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
