import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

import AdminPage from "./pages/AdminPAge";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<LoginPage />} />
    //     {/* <Route path="/admin" element={<AdminPage />} /> */}
    //     <Route path="/user" element={<UserPage />} />
    //     <Route path="*" element={<Navigate to="/login" />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
