import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import instance from "../../API/axiosInstance";
import { toastError } from "../toast";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    instance({
      url: "/user/courseList",
      method: "get",
    }).then((res) => {
      if (res.data.status === 200) {
        setCourses(res.data.courses);
        return;
      } else {
        toastError(res.data.message);
        return;
      }
    });
  }, []);

  const handleCourse = (id) => {
    navigate(`/coursedetails/${id}`);
  };

  return (
    <>
      <div className="bg-gray-100 ">
        <div className="mx-auto container p-8">
          <div className="flex flex-wrap items-center justify-center">
            {/* Card */}
            {courses
              .reverse()
              .slice(0, 4)
              .map((course) => (
                <>
                  <div
                    onClick={() => handleCourse(course._id)}
                    className="mx-16 w-72 lg:mb-0 mb-8 cursor-pointer"
                  >
                    <div>
                      <img
                        src={`/pictures/${course.image}`}
                        alt="courseimage"
                        className="w-full h-44"
                      />
                    </div>
                    <div className="bg-white">
                      <div className="p-4">
                        <div className="flex items-center">
                          <h2 className="text-lg font-semibold">
                            {course.courseName}
                          </h2>
                          {/* <p className="text-xs text-gray-600 pl-5">4 days ago</p> */}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {course.description}
                        </p>
                        <div className="flex mt-4">
                          <div>
                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                              {course.duration} months
                            </p>
                          </div>
                          <div className="pl-2">
                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                              Lessons: {course.lessons}Nos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <h2 className="text-indigo-700 text-xs font-semibold">
                            {/* Bay Area, San Francisco */}
                          </h2>
                          <h3 className="text-indigo-700 text-xl font-semibold">
                            ₹{course.fees}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            {/* Card Ends */}
          </div>
        </div>
      </div>
    </>
  );
}
