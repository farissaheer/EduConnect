import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toastError, toastSuccess } from "../toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { userList } from "../../Redux/AdminSlice/adminSlice";
import swalFire from "../../Utils/SweetAlert";
import axios from "axios";

export default function AdminUser() {
  const [statusChange, setStatusChange] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.userDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLogin = Cookies.get("userDetails");
        const details = JSON.parse(userLogin);
        axios
          .post("/admin/userList", { token: details.token })
          .then((response) => {
            if (response.data.status === 200) {
              console.log(response);
              const userDetails = response.data.userData;
              dispatch(userList(userDetails));
            } else {
              toastError(response.data.message);
              navigate("/admin/dashboard");
            }
          });
      } catch (error) {
        // Handle any errors that occur during the API request.
        toastError(error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [statusChange, navigate, dispatch]);

  const handleDelete = async (userId) => {
    swalFire("Delete this User Account").then(async (result) => {
      if (result.isConfirmed) {
        const userLogin = Cookies.get("userDetails");
        const details = JSON.parse(userLogin);
        axios
          .post("/admin/blockUser", { userId, token: details.token })
          .then((res) => {
            if (res.data.status === 200) {
              toastSuccess(res.data.message);
              setStatusChange(!statusChange);
              return;
            } else {
              toastError(res.data.message);
              return;
            }
          });
      }
    });
  };

  const handleEdit = (userId) => {
    navigate(`/admin/dash/userEdit/${userId}`);
  };

  return (
    <div className="w-full px-4 md:w-10/12 md:mx-auto py-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">E-mail</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Date of Join</th>
              <th className="p-3">Status</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <h1 className="text-3xl py-10 font-semibold text-gray-400">
                    No User Found
                  </h1>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="align-middle">
                  <td className="p-3 pl-8">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phoneNumber}</td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">
                    {!user.isBlocked && (
                      <button className="btn border border-black rounded-md px-3 bg-green-600 text-white font-semibold">
                        Active
                      </button>
                    )}
                    {user.isBlocked && (
                      <button className="btn border border-black rounded-md px-3 bg-red-600 text-white font-semibold">
                        Blocked
                      </button>
                    )}
                  </td>
                  <td
                    className="p-3 cursor-pointer"
                    onClick={() => handleEdit(user._id)}
                  >
                    <FontAwesomeIcon icon={faPen} color="blue" />
                  </td>
                  <td
                    className="p-3 cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
