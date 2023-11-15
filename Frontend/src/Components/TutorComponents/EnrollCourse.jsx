import React, { useState } from "react";

import instance from "../../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";
import { useSelector } from "react-redux";

function EnrollCourse() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState(1);
  const [contents, setContents] = useState("");
  const [duration, setDuration] = useState(1);
  const [fees, setFees] = useState();
  const [image, setImage] = useState(null);
  // const [video, setVideo] = useState(null);

  const user = useSelector((state) => state.user);

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  // const handleVideo = (e) => {
  //   setVideo(e.target.files[0]);
  // };

  const handleSubmit = () => {
    const data = {
      courseName,
      description,
      lessons,
      contents,
      duration,
      fees,
      image,
      tutorid: user.id,
    };
    instance({
      url: "/tutor/courseAdd",
      method: "post",
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
      <section className="max-w-2xl p-6 mx-auto bg-teal-500 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Enroll Course
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

            {/* <div>
              <label className="text-white dark:text-gray-200" htmlFor="range">
                Range
              </label>
              <input
                id="range"
                type="range"
                className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark-text-gray-300 dark-border-gray-600 focus-border-blue-500 dark-focus-border-blue-500 focus-outline-none focus-ring"
              />
            </div> */}

            {/* <div>
              <label className="text-white dark:text-gray-200" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark-text-gray-300 dark-border-gray-600 focus-border-blue-500 dark-focus-border-blue-500 focus-outline-none focus-ring"
              />
            </div> */}

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
                {/* <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="mx-auto h-12 w-12 text-white"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
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
                      <p className="pl-1 text-white">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white">PNG, JPG</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover-bg-pink-700 focus-outline-none focus-bg-gray-600"
            >
              Add Course
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EnrollCourse;
