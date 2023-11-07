import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userDetails = useSelector((state) => state.user);

  return (
    <div className="p-12 bg-white dark:bg-gray-800">
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
            <div className="w-48 h-48 rounded-full bg-cover bg-center bg-no-repeat relative bottom-0 mt-8 -mb-10 shadow flex items-center justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirAGMK51c3DAmKfbKLUmxs9iibyXLJRkPPw&usqp=CAU"
                alt=""
                className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
              />
              <div className="absolute bg-black opacity-10 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
              {/* <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-edit"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                  <line x1={16} y1={5} x2={19} y2={8} />
                </svg>
                <p className="text-xs text-gray-100">Edit Picture</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5"></div>
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
                {userDetails.name}
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="Email"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                >
                  Email
                </label>
                <div className="flex">
                  {userDetails.email}
                  {/* <div className="pl-6 flex justify-between items-center pt-1 text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                              0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                        stroke="currentColor"
                        strokeWidth="0.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="currentColor"
                      />
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="FirstName"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                >
                  Phone Number
                </label>
                {userDetails.phoneNumber}
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="LastName"
                  className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                >
                  Type
                </label>
                {userDetails.userType.charAt(0).toUpperCase() +
                  userDetails.userType.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
