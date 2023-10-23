import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUsers,
  faDashboard,
  faUserGraduate,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { LogoutAdmin } from "../../Redux/AdminSlice/adminSlice";

export default function AdminDashBoard() {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  const sidebarClass = isSidebarMinimized ? "w-16" : "w-64"; // Adjust width as needed
  const textClass = isSidebarMinimized ? "hidden" : "";
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(LogoutAdmin());
  };

  return (
    <div className="h-screen">
      <div className="flex h-full">
        <div
          className={`bg-blue-300 ${sidebarClass} transition-all duration-300 ease-in-out`}
        >
          <div className="flex justify-between px-5">
            <div
              className={`text-white font-semibold text-center py-3 ${textClass}`}
            >
              <img
                className="rounded h-12 w-32 object-cover"
                src="/Assets/EduConnectLogo.png"
                alt="logo"
              />
            </div>
            <div className="mt-4 cursor-pointer" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} size="lg" color="white" />
            </div>
          </div>
          <div className="">
            <ul className="pl-5 pr-6 text-xl">
              <li>
                <NavLink
                  to="/admin/dashboard/dashboard"
                  className={`text-white flex font-sans my-2 cursor-pointer hover:text-slate-500`}
                  activeClassName="active"
                >
                  <div className="icon">
                    {" "}
                    <FontAwesomeIcon icon={faDashboard} size="lg" />
                  </div>
                  <div
                    className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}
                  >
                    DashBoard
                  </div>
                </NavLink>
              </li>
              <hr className="bg-white my-2" />
              <li>
                <NavLink
                  to="/admin/dashboard/user"
                  className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`}
                  activeClassName="active"
                >
                  <div className="icon">
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                  </div>
                  <div
                    className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}
                  >
                    Users List
                  </div>
                </NavLink>
              </li>
              <hr className="bg-white my-2" />
              <li>
                <NavLink
                  to="/admin/dashboard/tutors"
                  className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`}
                  activeClassName="active"
                >
                  <div className="icon">
                    <FontAwesomeIcon icon={faUserGraduate} size="lg" />
                  </div>
                  <div
                    className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}
                  >
                    Tutors List
                  </div>
                </NavLink>
              </li>
              <hr className="bg-white my-2" />
              <li>
                <NavLink
                  to="/admin/dashboard/tutorrequest"
                  className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`}
                  activeClassName="active"
                >
                  <div className="icon">
                    <FontAwesomeIcon icon={faUserGraduate} size="lg" />
                  </div>
                  <div
                    className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}
                  >
                    Tutor Request
                  </div>
                </NavLink>
              </li>
              <hr className="bg-white my-2" />
              <li>
                <NavLink
                  to="/admin/login"
                  className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`}
                  activeClassName="active"
                  onClick={handleLogout}
                >
                  <div className="icon">
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                  </div>
                  <div
                    className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}
                  >
                    Logout
                  </div>
                </NavLink>
              </li>
              <hr className="bg-white my-2" />
            </ul>
          </div>
        </div>
        <div className="bg-gray-200 w-full pl-5 overflow-y-auto">
          <Outlet /> {/* This will render the content for the matching route */}
        </div>
      </div>
    </div>
  );
}
