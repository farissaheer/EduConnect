import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import instance from "../../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";
import swalFire from "../../Utils/SweetAlert";

function CourseList() {
  const [statusChange, setStatusChange] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [course, setCourse] = useState(true);
  const [courseid, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState(1);
  const [contents, setContents] = useState("");
  const [duration, setDuration] = useState(1);
  const [fees, setFees] = useState();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);

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
      }
    });
  }, [userDetails.id, statusChange]);

  const handleEdit = (courseid) => {
    setCourse(false);
    const course = courseList.filter((course) => course._id === courseid);
    setCourseID(courseid);
    setCourseName(course[0].courseName);
    setDescription(course[0].description);
    setLessons(course[0].lessons);
    setContents(course[0].contents);
    setDuration(course[0].duration);
    setFees(course[0].fees);
    // setImage(course[0].image);
    console.log(image);
  };

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setPreview(true);
  };

  const handleSubmit = () => {
    let data = {
      courseid,
      courseName,
      description,
      lessons,
      contents,
      duration,
      fees,
    };
    const method = "POST";
    let url, obj;
    if (preview) {
      data = { ...data, image };
      url = "/tutor/editCourse";
      obj = {
        url,
        method,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    } else {
      url = "/tutor/editCourseOnly";
      obj = { url, method, data };
    }
    instance(obj)
      .then((res) => {
        if (res.data.status === 200) {
          toastSuccess(res.data.message);
          return;
        } else {
          toastError(res.data.message);
          return;
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
  };

  // const handleSubmit = () => {
  //   const data = {
  //     courseid,
  //     courseName,
  //     description,
  //     lessons,
  //     contents,
  //     duration,
  //     fees,
  //     image,
  //   };
  //   instance({
  //     url: "/tutor/courseEdit",
  //     method: "post",
  //     data,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         toastSuccess(res.data.message);

  //         return;
  //       } else {
  //         toastError(res.data.message);
  //         return;
  //       }
  //     })
  //     .catch((error) => {
  //       toastError(error.message);
  //     });
  // };

  const handleBlock = async (courseid, activeStatus) => {
    const text = activeStatus
      ? "Deactivate this course"
      : "Activate this course";
    swalFire(text).then(async (result) => {
      if (result.isConfirmed) {
        const userLogin = Cookies.get("userDetails");
        const details = JSON.parse(userLogin);
        instance({
          url: "/tutor/statusChange",
          method: "POST",
          data: { courseid, token: details.token },
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
      {course ? (
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
                      <p className="pl-8">Contents</p>
                    </th>
                    <th>
                      <p className="pl-8">Fees</p>
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
                          <p className="pl-8">{course.contents}</p>
                        </td>
                        <td>
                          <p className="pl-8">₹{course.fees}</p>
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
                              onClick={() => handleEdit(course._id)}
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
      ) : (
        <section className="max-w-2xl p-6 mx-auto bg-cyan-500 rounded-md shadow-md dark:bg-gray-800 mt-20">
          <div
            className="flex items-center text-black mb-4 font-bold hover:text-gray-500 cursor-pointer"
            onClick={() => setCourse(!course)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
            <p className="text-sm pl-2 leading-none">Back</p>
          </div>
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Edit Course
          </h1>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="username"
                >
                  Course Name
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Course Description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="5"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="password"
                  >
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark-text-gray-300 dark-border-gray-600 focus-border-blue-500 dark-focus-border-blue-500 focus-outline-none focus-ring"
                  >
                    <option value={1}>1 month</option>
                    <option value={2}>2 months</option>
                    <option value={3}>3 months</option>
                    <option value={4}>4 months</option>
                  </select>
                </div>

                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="passwordConfirmation"
                  >
                    Total Lessons
                  </label>
                  <input
                    id="lessons"
                    type="number"
                    value={lessons}
                    onChange={(e) => setLessons(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-white dark-text-gray-200"
                  htmlFor="textarea"
                >
                  Contents
                </label>
                <textarea
                  id="textarea"
                  type="textarea"
                  placeholder="Course content"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark-bg-gray-800 dark-text-gray-300 dark-border-gray-600 focus-border-blue-500 dark-focus-border-blue-500 focus-outline-none focus-ring"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Cover Pic
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-white"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover-text-indigo-500 focus-within-outline-none focus-within-ring-2 focus-within-ring-offset-2 focus-within-ring-indigo-500"
                        >
                          <span className="px-4">Upload Image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            accept="image/*"
                            onChange={handleImage}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1 text-white">or drag and drop</p>
                      </div>
                      {/* <p className="text-xs text-white">PNG, JPG</p> */}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Fees
                  </label>
                  <input
                    id="lessons"
                    type="number"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover-bg-pink-700 focus-outline-none focus-bg-gray-600"
              >
                Edit Course
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default CourseList;
