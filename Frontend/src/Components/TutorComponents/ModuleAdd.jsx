import React, { useEffect, useState } from "react";

import instance from "../../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";
import { useSelector } from "react-redux";

function ModuleAdd() {
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [courseid, setCourseID] = useState("");
  const [video, setVideo] = useState(null);
  const [courseList, setCourseList] = useState([]);

  const user = useSelector((state) => state.user);

  const handleVideo = (e) => {
    const selectedFile = e.target.files[0];
    setVideo(selectedFile);
  };

  useEffect(() => {
    instance({
      url: "/tutor/courseList",
      method: "POST",
      data: { tutorid: user.id },
    }).then((res) => {
      if (res.data.status === 200) {
        setCourseID(res.data.courses[0]._id);
        setCourseList(res.data.courses);
      } else {
        toastError(res.data.message);
        // navigate("/admin/dashboard");
      }
    });
  }, [user.id]);

  const handleSubmit = () => {
    const data = {
      moduleName,
      description,
      courseid,
      video,
      tutorid: user.id,
    };
    instance({
      url: "/tutor/moduleAdd",
      method: "POST",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
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

  return (
    <>
      <section className="max-w-2xl p-6 mx-auto bg-teal-500 rounded-md shadow-md dark:bg-gray-800 mt-10">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Create Module
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Module Name
              </label>
              <input
                id="username"
                type="text"
                placeholder="Module Name"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
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
                placeholder="Module Description"
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
                <label className="block text-sm font-medium text-white">
                  Module Video
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
                        <span className="px-4">Upload Video</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          accept="video/*"
                          onChange={handleVideo}
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      {/* <p className="pl-1 text-white">MP4, JPG</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="password"
                >
                  Course
                </label>
                <select
                  value={courseid}
                  onChange={(e) => setCourseID(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark-text-gray-300 dark-border-gray-600 focus-border-blue-500 dark-focus-border-blue-500 focus-outline-none focus-ring"
                >
                  {courseList.length === 0 ? (
                    <option value={1}>No Course</option>
                  ) : (
                    courseList.map((course) => (
                      <option value={course._id}>{course.courseName}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover-bg-pink-700 focus-outline-none focus-bg-gray-600"
            >
              Add module
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ModuleAdd;
