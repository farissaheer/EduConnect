import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import instance from "../../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";

function UserProfileEdit() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [preview, setPreview] = useState(false);

  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    setImage(userDetails.image);
    setName(userDetails.name);
    setEmail(userDetails.email);
  }, [userDetails.image, userDetails.name, userDetails.email]);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(true);
  };

  const handleEdit = () => {
    let data = { id: userDetails.id, name, email };
    const method = "POST";
    let url, obj;
    if (preview) {
      data = { ...data, image };
      url = "/user/editProfile";
      obj = {
        url,
        method,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    } else {
      url = "/user/editProfileOnly";
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
  return (
    <div className="p-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
          <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
              Profile
            </p>
            <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={16}
                height={16}
              >
                <path
                  className="heroicon-ui"
                  d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <div className="mx-auto xl:mx-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-cover bg-center bg-no-repeat relative bottom-0 mb-4 mt-8 shadow flex items-center justify-center">
              {userDetails.image && !preview ? (
                <img
                  src={
                    image
                      ? `/Assets/images/${image}`
                      : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirAGMK51c3DAmKfbKLUmxs9iibyXLJRkPPw&usqp=CAU`
                  }
                  alt="profile Pic"
                  className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                />
              ) : (
                <img
                  src={
                    image
                      ? `${URL.createObjectURL(image)}`
                      : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirAGMK51c3DAmKfbKLUmxs9iibyXLJRkPPw&usqp=CAU`
                  }
                  alt="profile Pic"
                  className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                />
              )}
              {/* <img
                src={
                  image
                    ? `${URL.createObjectURL(image)}`
                    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirAGMK51c3DAmKfbKLUmxs9iibyXLJRkPPw&usqp=CAU`
                }
                alt="profile Pic"
                className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
              /> */}
            </div>
          </div>
          <div className="mx-auto xl:mx-0 flex items-center mb-4 justify-center">
            <input type="file" onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded px-4">
        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700"></div>
        <div className="mx-auto pt-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="FirstName"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  placeholder
                />
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="Email"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  placeholder
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="FirstName"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="firstName"
                  required
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  placeholder
                />
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="LastName"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="lastName"
                  required
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  placeholder
                />
              </div>
            </div> */}

            {/* <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
              <label
                htmlFor="City"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                City
              </label>
              <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                <input
                  type="text"
                  id="City"
                  name="city"
                  required
                  className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  placeholder="Los Angeles"
                />
                <div className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-up"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 15 12 9 18 15" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-down"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="container mx-auto w-11/12 xl:w-full">
        <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
          {/* <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">
            Cancel
          </button> */}
          <button
            onClick={handleEdit}
            className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;
