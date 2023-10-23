import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPen } from "@fortawesome/free-solid-svg-icons";

import instance from "../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";
import { tutorRequest } from "../../Redux/AdminSlice/adminSlice";
import swalFire from "../../Utils/SweetAlert";

function AdminTutorRequest() {
  const [statusChange, setStatusChange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.tutorRequests);

  useEffect(() => {
    const fetchData = async () => {
      const userLogin = Cookies.get("userDetails");
      const details = JSON.parse(userLogin);
      await instance({
        url: "/admin/tutorrequest",
        method: "POST",
        data: { token: details.token },
      }).then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          const userDetails = res.data.userData;
          console.log(userDetails);
          dispatch(tutorRequest(userDetails));
        } else {
          toastError(res.data.message);
          navigate("/admin/dashboard");
        }
      });
    };
    fetchData();
  }, [statusChange, navigate, dispatch]);

  const handleAccept = async (userId) => {
    swalFire("Accept this tutor").then(async (result) => {
      if (result.isConfirmed) {
        const userLogin = Cookies.get("userDetails");
        const details = JSON.parse(userLogin);
        instance({
          url: "/admin/acceptTutor",
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

  const handleReject = async (userId) => {
    swalFire("Reject this tutor").then(async (result) => {
      if (result.isConfirmed) {
        const userLogin = Cookies.get("userDetails");
        const details = JSON.parse(userLogin);
        instance({
          url: "/admin/rejectTutor",
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
                  <th>
                    <p className="pl-10">Qualifications</p>
                  </th>
                  <th>
                    <p className="pl-10">Skills</p>
                  </th>
                  <th>
                    <p className="pl-10">Date of join</p>
                  </th>
                  <th>
                    <p className="pl-10">Action</p>
                  </th>
                </tr>
                <tr>
                  <td colSpan="6">
                    <div className="border-t border-gray-200"></div>
                  </td>
                </tr>

                {users.length === 0 ? (
                  <h1>No Tutors Available</h1>
                ) : (
                  users.map((user, index) => (
                    <>
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
                              <p className="text-sm pb-1 font-medium leading-none text-gray-800">
                                {user.name} <br />
                              </p>
                              <p className="text-sm font-small leading-none text-gray-800">
                                {user.email} <br />
                                {user.phoneNumber}
                              </p>
                              <p className="text-xs leading-3 text-gray-600 mt-2"></p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="pl-16">
                            {user.qualifications.length === 0 ? (
                              <>No qualications</>
                            ) : (
                              <ul>
                                {user.qualifications.map((qualication) => (
                                  <li className="pb-1">{qualication}</li>
                                ))}
                              </ul>
                            )}
                          </p>
                        </td>
                        <td>
                          <p className="pl-16">
                            {user.skills.length === 0 ? (
                              <>No Skills</>
                            ) : (
                              <ul>
                                {user.skills.map((skill) => (
                                  <li className="pb-1">{skill}</li>
                                ))}
                              </ul>
                            )}
                          </p>
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
                          <p className="pl-14">
                            <button
                              onClick={() => handleAccept(user._id)}
                              className="mx-2 my-2 bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-6 py-2 text-xs"
                            >
                              Accept
                            </button>
                            {/* <br /> */}
                            <button
                              onClick={() => handleReject(user._id)}
                              className="mx-2 my-2 bg-red-700 transition duration-150 ease-in-out hover:bg-red-600 rounded text-white px-6 py-2 text-xs"
                            >
                              Reject
                            </button>
                          </p>
                        </td>
                      </tr>
                      {index < users.length - 1 && (
                        <tr>
                          <td colSpan="6">
                            <div className="border-t border-gray-200"></div>
                          </td>
                        </tr>
                      )}
                    </>
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

export default AdminTutorRequest;
