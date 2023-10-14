import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from "./Pages/UserPages/HomePage";
import LoginPage from "./Pages/UserPages/LoginPage";
import SignUpPage from "./Pages/UserPages/SignUpPage";
import AdminLoginPage from "./Pages/AdminPages/AdminLoginPage";
import { AdminDashAuth, AdminLoginAuth } from "./Auth/LoginAuth";
import AdminHome from "./Components/AdminComponents/AdminHome";
import AdminUser from "./Components/AdminComponents/AdminUsers";
import ForgotPasswordPage from "./Pages/UserPages/ForgotPasswordPage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />

        <Route path="/admin" element={<AdminLoginAuth />}>
          <Route index element={<AdminLoginPage />} />
          <Route path="login" element={<AdminLoginPage />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashAuth />}>
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="user" element={<AdminUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
