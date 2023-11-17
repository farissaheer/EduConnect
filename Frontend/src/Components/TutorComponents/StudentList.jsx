import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import instance from "../../API/axiosInstance";
import { toastError } from "../toast";

function StudentList() {
  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    instance({
      url: "/tutor/studentList",
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
  }, [userDetails.id, navigate]);

  return (
    <>
      <div className=" mx-auto w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Student List
            </p>
            <div className="mt-4 sm:mt-0"></div>
          </div>
        </div>
        <div className=" bg-gray-100 px-4 md:px-10 pb-5">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                <tr className="text-sm leading-none text-gray-600 h-16">
                  <th className="pt-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 flex items-center justify-center"></div>
                      <div className="pl-2">
                        <p className="text-sm font-medium leading-none text-gray-800">Name</p>
                        <p className="text-xs leading-3 text-gray-600 mt-2"></p>
                      </div>
                    </div>
                  </th>
                  <th className="-pl-16">
                    <p>Email</p>
                  </th>
                  <th>
                    <p className="-pl-16">Course</p>
                  </th>
                  <th>
                    <p className="-pl-16">Date of join</p>
                  </th>

                  <th>
                    <p className="-pl-8">Fee Paid</p>
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
                      <td className="pt-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex items-center justify-center">
                            <img
                              src={
                                course.userid.image
                                  ? `/Assets/images/${course.userid.image}`
                                  : "/Assets/profile.jpg"
                              }
                              alt="CoursePic"
                              className="rounded-md"
                            />
                          </div>
                          <div className="pl-2">
                            <p className="text-sm font-medium leading-none text-gray-800">
                              {course.userid.name}
                            </p>
                            <p className="text-xs leading-3 text-gray-600 mt-2"></p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-16">
                        <p>{course.userid.email}</p>
                      </td>
                      <td>
                        <p className="pl-16">{course.courseid.courseName}</p>
                      </td>
                      <td>
                        <p className="pl-16">
                          {new Date(course.purchaseDate).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </td>

                      <td className="mx-auto">
                        <p className="pl-16">₹{course.fees}</p>
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

export default StudentList;
