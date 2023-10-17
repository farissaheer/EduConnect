import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import instance from "../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";
import { userList } from "../../Redux/AdminSlice/adminSlice";
import swalFire from "../../Utils/SweetAlert";

function AdminUser() {
  const [statusChange, setStatusChange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.userDetails);

  useEffect(() => {
    const fetchData = async () => {
      const userLogin = Cookies.get("userDetails");
      const details = JSON.parse(userLogin);
      await instance({
        url: "/admin/userList",
        method: "POST",
        data: { token: details.token },
      }).then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          const userDetails = res.data.userData;
          dispatch(userList(userDetails));
        } else {
          toastError(res.data.message);
          navigate("/admin/dashboard");
        }
      });
    };
    fetchData();
  }, [statusChange, navigate, dispatch]);

  const handleBlock = async (userId, blockStatus) => {
    const text = blockStatus ? "Unblock this user" : "Block this user";
    swalFire(text).then(async (result) => {
      if (result.isConfirmed) {
        const userLogin = Cookies.get("userDetails");
        const details = JSON.parse(userLogin);
        instance({
          url: "/admin/blockUser",
          method: "POST",
          data: { userId, token: details.token },
        })
          .then((res) => {
            if (res.data.status === 200) {
              toastSuccess(res.data.message);
              setStatusChange(!statusChange);
              return;
            } else {
              toastError(res.data.message);
              return;
            }
          })
          .catch((error) => {
            toastError(error.message);
          });
      }
    });
  };

  return (
    <>
      <div className=" mx-auto p-12 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Users
            </p>
            <div className="mt-4 sm:mt-0">
              {/* <button className="inline-flex sm:ml-3 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">
                  Download All
                </p>
              </button> */}
            </div>
          </div>
        </div>
        <div className="bg-white px-4 md:px-10 pb-5">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                <tr className="text-sm leading-none text-gray-600 h-16">
                  <th className="">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center"></div>
                      <div className="pl-2">
                        <p>Name</p>
                      </div>
                    </div>
                  </th>
                  <th className="pl-10">
                    <p>Email</p>
                  </th>
                  <th>
                    <p className="pl-16">Phone Number</p>
                  </th>
                  <th>
                    <p className="pl-16">Date of join</p>
                  </th>
                  <th>
                    <p className="pl-16">Status</p>
                  </th>
                  <th>
                    <p className="pl-16">Edit</p>
                  </th>
                  <th>
                    <p className="pl-16">Block/Unblock</p>
                  </th>
                </tr>

                {users.length === 0 ? (
                  <h1>hi</h1>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="text-sm leading-none text-gray-600 h-16"
                    >
                      <td className="">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-white-700 rounded-sm flex items-center justify-center">
                            <p className="text-xs font-bold leading-3 text-white"></p>
                          </div>
                          <div className="pl-2">
                            <p className="text-sm font-medium leading-none text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-xs leading-3 text-gray-600 mt-2"></p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-16">
                        <p>{user.email}</p>
                      </td>
                      <td>
                        <p className="pl-16">{user.phoneNumber}</p>
                      </td>
                      <td>
                        <p className="pl-16">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="pl-16">
                          {user.isBlocked ? (
                            <div className="bg-red-100 h-8 w-24 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                              <div className="flex items-center">
                                <div className="h-1 w-1 rounded-full bg-red-500 mr-1" />
                                <span className="text-xs text-red-600 font-normal">
                                  Blocked
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-green-100 h-8 w-24 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                              <div className="flex items-center">
                                <div className="h-1 w-1 rounded-full bg-green-500 mr-1" />
                                <span className="text-xs text-green-600 font-normal">
                                  Active
                                </span>
                              </div>
                            </div>
                          )}
                        </p>
                      </td>
                      <td className="mx-auto">
                        <p className="pl-16">
                          <FontAwesomeIcon icon={faPen} color="blue" />
                        </p>
                      </td>
                      <td className="mx-auto">
                        <p className="pl-16">
                          {user.isBlocked ? (
                            <button
                              onClick={() =>
                                handleBlock(user._id, user.isBlocked)
                              }
                              className="mx-2 my-2 bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-6 py-2 text-xs"
                            >
                              UnBlock
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleBlock(user._id, user.isBlocked)
                              }
                              className="mx-2 my-2 bg-red-700 transition duration-150 ease-in-out hover:bg-red-600 rounded text-white px-6 py-2 text-xs"
                            >
                              Block
                            </button>
                          )}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUser;
