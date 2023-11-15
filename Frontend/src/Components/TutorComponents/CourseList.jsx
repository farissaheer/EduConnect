import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import instance from "../../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";
import swalFire from "../../Utils/SweetAlert";

function CourseList() {
  const [statusChange, setStatusChange] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    instance({
      url: "/tutor/courseList",
      method: "POST",
      data: { tutorid: userDetails.id },
    }).then((res) => {
      if (res.data.status === 200) {
        setCourseList(res.data.courses);
      } else {
        toastError(res.data.message);
        navigate("/admin/dashboard");
      }
    });
    // const fetchData = async () => {
    //   const userLogin = Cookies.get("userDetails");
    //   const details = JSON.parse(userLogin);
    //   await instance({
    //     url: "/admin/userList",
    //     method: "POST",
    //     data: { token: details.token },
    //   }).then((res) => {
    //     if (res.data.status === 200) {
    //       console.log(res);
    //       const userDetails = res.data.userData;
    //       dispatch(userList(userDetails));
    //     } else {
    //       toastError(res.data.message);
    //       navigate("/admin/dashboard");
    //     }
    //   });
    // };
    // fetchData();
  }, [userDetails.id, navigate]);

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
      <div className=" mx-auto w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Course List
            </p>
            <div className="mt-4 sm:mt-0"></div>
          </div>
        </div>
        <div className=" bg-gray-100 px-4 md:px-10 pb-5">
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
                    <p>Description</p>
                  </th>
                  <th>
                    <p className="pl-16">Contents</p>
                  </th>
                  {/* <th>
                    <p className="pl-16">Date of join</p>
                  </th> */}
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

                {courseList.length === 0 ? (
                  <h1>hi</h1>
                ) : (
                  courseList.map((course) => (
                    <tr
                      key={course._id}
                      className="text-sm leading-none text-gray-600 h-16"
                    >
                      <td className="">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex items-center justify-center">
                            <img
                              src={`/Assets/images/${course.image}`}
                              alt="CoursePic"
                              className="rounded-md"
                            />
                          </div>
                          <div className="pl-2">
                            <p className="text-sm font-medium leading-none text-gray-800">
                              {course.courseName}
                            </p>
                            <p className="text-xs leading-3 text-gray-600 mt-2"></p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-16">
                        <p>{course.description}</p>
                      </td>
                      <td>
                        <p className="pl-16">{course.contents}</p>
                      </td>
                      {/* <td>
                        <p className="pl-16">
                          {new Date(course.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </td> */}
                      <td>
                        <p className="pl-16">
                          {!course.status ? (
                            <div className="bg-red-100 h-8 w-24 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                              <div className="flex items-center">
                                <div className="h-1 w-1 rounded-full bg-red-500 mr-1" />
                                <span className="text-xs text-red-600 font-normal">
                                  Inactive
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
                          <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faPen}
                            color="blue"
                          />
                        </p>
                      </td>
                      <td className="mx-auto">
                        <p className="pl-16">
                          {!course.status ? (
                            <button
                              onClick={() =>
                                handleBlock(course._id, course.status)
                              }
                              className="mx-2 my-2 bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-6 py-2 text-xs"
                            >
                              Activate
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleBlock(course._id, course.status)
                              }
                              className="mx-2 my-2 bg-red-700 transition duration-150 ease-in-out hover:bg-red-600 rounded text-white px-6 py-2 text-xs"
                            >
                              Deactivate
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

export default CourseList;
