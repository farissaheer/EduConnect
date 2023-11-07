import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import { toastError } from "../Components/toast";
import AdminDashBoardPage from "../Pages/AdminPages/AdminDashBoardPage";
import TutorDashboardPage from "../Pages/TutorPages/TutorDashboardPage";

export const UserLoginAuth = () => {
  const userLogin = Cookies.get("userDetails");
  const isLogin = userLogin ? JSON.parse(userLogin) : false;

  if (isLogin.role === "student") {
    return <Navigate to="/" />;
  } else if (isLogin.role === "admin") {
    toastError("Access denied!!");
    return;
  } else {
    return <Outlet />;
  }
};

export const UserDashAuth = async () => {
  const userLogin = Cookies.get("userDetails");
  const isLogin = userLogin ? JSON.parse(userLogin) : false;

  if (isLogin.role === "student") {
    return;
  } else {
    toastError("Access denied!!");
    return <Navigate to="/" />;
  }
};

export const AdminLoginAuth = () => {
  const adminLogin = Cookies.get("userDetails");
  const isLogin = adminLogin ? JSON.parse(adminLogin) : false;

  if (isLogin.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  } else if (isLogin.role === "student") {
    toastError("Access denied!!");
    return;
  } else {
    return <Outlet />;
  }
};

export const AdminDashAuth = () => {
  const userLogin = Cookies.get("userDetails");
  const isLogin = userLogin ? JSON.parse(userLogin) : false;

  if (isLogin.role === "admin") {
    return <AdminDashBoardPage />;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export const TutorDashAuth = () => {
  const userLogin = Cookies.get("userDetails");
  const isLogin = userLogin ? JSON.parse(userLogin) : false;

  if (isLogin.role === "tutor") {
    return <TutorDashboardPage />;
  } else {
    toastError("Access denied!!");
    return <Navigate to="/" />;
  }
};
