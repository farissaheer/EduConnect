import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AdminLoginPage from "./Pages/AdminPages/AdminLoginPage";
import { AdminDashAuth, AdminLoginAuth } from "./Auth/LoginAuth";
import AdminHome from "./Components/AdminComponents/AdminHome";
import AdminUser from "./Components/AdminComponents/AdminUsers";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/admin" element={<AdminLoginAuth />}>
          <Route index element={<AdminLoginPage />} />
          <Route path="login" element={<AdminLoginPage />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashAuth />}>
          <Route path="dashboard" element={<AdminHome/>} />
          <Route path="user" element={<AdminUser/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
