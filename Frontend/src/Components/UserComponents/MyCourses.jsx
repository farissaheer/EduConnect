import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import instance from "../../API/axiosInstance";
import { toastError } from "../toast";
import { useSelector } from "react-redux";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  const userDetails = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    instance({
      url: "/user/mycourses",
      method: "POST",
      data: { userid: userDetails.id },
    }).then((res) => {
      if (res.data.status === 200) {
        setCourses(res.data.courses);
        return;
      } else {
        toastError(res.data.message);
        return;
      }
    });
  }, [userDetails.id]);

  const handleCourse = (id) => {
    navigate(`/coursedetails/${id}`);
  };

  return (
    <>
      <div className="">
        <div className="mx-auto -mx-16 container">
          <p className="mb-4 text-3xl font-bold text-gray-800 pt-3">
            My Courses
          </p>
          <div className="grid xl:grid-cols-3 md:grid-cols-2">
            {/* Card */}
            {courses.length === 0 && <p>No courses</p>}
            {courses.length > 0 &&
              courses.reverse().map((course) => (
                <div className="flex items-center justify-center">
                  <div
                    onClick={() => handleCourse(course._id)}
                    className="xl:mx-8 xl:my-8 mx-4 w-72 my-8 cursor-pointer"
                  >
                    <div>
                      <img
                        src={`/Assets/images/${course.courseid.image}`}
                        alt="courseimage"
                        className="rounded-t-xl w-full h-44"
                      />
                    </div>
                    <div className="rounded-b-xl bg-cyan-100">
                      <div className="p-4">
                        <div className="flex items-center">
                          <h2 className="text-lg font-semibold">
                            {course.courseid.courseName}
                          </h2>
                          {/* <p className="text-xs text-gray-600 pl-5">4 days ago</p> */}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {course.courseid.description}
                        </p>
                        <div className="flex mt-4">
                          <div>
                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                              {course.courseid.duration} months
                            </p>
                          </div>
                          <div className="pl-2">
                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                              Lessons: {course.courseid.lessons}Nos
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* Card Ends */}
          </div>
        </div>
      </div>
    </>
  );
}
