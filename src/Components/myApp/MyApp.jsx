import React from "react";
import Login_Signup from "../../Pages/Auth/Login_Signup";
import "./MyApp.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPass from "../../Pages/Auth/ResetPass";
import Dashboard from "../../Pages/Dashboard/Dashboard";

function MyApp() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login_Signup />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default MyApp;
