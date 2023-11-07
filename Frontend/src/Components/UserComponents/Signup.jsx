import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { toastSuccess, toastError } from "../toast";
import instance from "../../API/axiosInstance";
import {
  validateEmail,
  validatePasswordLength,
  validatePhone,
} from "../../Utils/Validation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [userType, setUserType] = useState("student");
  const [qualification, setQualification] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [requestOTP, setrequestOTP] = useState(true);
  const [verifiedOTP, setVerifiedOTP] = useState(false);
  const [accountDetails, setAccountDetails] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!name || !email || !phoneNumber || !password || !Cpassword) {
        toastError("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        toastError("Please enter a valid email address.");
        return;
      }

      if (!validatePhone(phoneNumber)) {
        toastError("Please enter 10 digits phone number.");
        return;
      }

      if (!validatePasswordLength(password)) {
        toastError("Password must be at least 6 characters.");
        return;
      }

      if (password !== Cpassword) {
        toastError("Passwords do not match.");
        return;
      }
      const data = {
        name,
        email,
        phoneNumber,
        password,
        userType,
      };

      axios
        .post("/user/userSignUP", data)
        .then((response) => {
          if (response.data.status === 200) {
            toastSuccess(response.data.message);
            if (userType === "student") navigate("/login");
            else {
              setAccountDetails(false);
              setMoreDetails(true);
            }
          } else {
            toastError(response.data.message);
            navigate("/signup");
          }
        })
        .catch((err) => console.log(err.message));
    } catch (err) {
      toastError(err?.data?.message || err.error);
    }
  };

  const handleRequest = async () => {
    if (!phoneNumber) {
      toastError("Please fill in all fields.");
      return;
    }

    if (!validatePhone(phoneNumber)) {
      toastError("Please enter 10 digits phone number.");
      return;
    }
    axios
      .post("/user/createAccountOTP", { phoneNumber })
      .then((res) => {
        if (res.data.status === 200) {
          toastSuccess(res.data.message);
          setrequestOTP(false);
          setVerifiedOTP(true);
        } else {
          toastError(res.data.message);
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleVerify = async () => {
    if (!OTP) {
      toastError("Please fill in all fields.");
      return;
    }

    if (OTP.length !== 4) {
      toastError("OTP must be 4 digit");
      return;
    }
    axios
      .post("/user/checkOTP", { OTP, phoneNumber })
      .then((res) => {
        if (res.data.status === 200) {
          toastSuccess(res.data.message);
          setVerifiedOTP(false);
          setAccountDetails(true);
        } else {
          toastError(res.data.message);
          navigate("/login");
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const removeQualification = (qualification) => {
    const newQualifications = qualifications.filter(
      (item) => item !== qualification
    );
    setQualifications(newQualifications);
  };

  const addQualification = () => {
    if (qualifications.length >= 5) {
      toastError("Only 5 Qualifications allowed");
      return;
    }
    setQualifications([...qualifications, qualification]);
    setQualification("");
  };

  const removeSkill = (skill) => {
    const newSkills = skills.filter((item) => item !== skill);
    setSkills(newSkills);
  };

  const addSkill = () => {
    if (skills.length >= 5) {
      toastError("Only 5 skills allowed");
      return;
    }
    setSkills([...skills, skill]);
    setSkill("");
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const submitMoreDetails = () => {
    const data = { phoneNumber, qualifications, skills };
    if (!qualifications.length || !skills.length) {
      toastError("Fill atleast one qualification or skill");
      return;
    }
    instance({
      url: "/user/addMoreDetails",
      method: "POST",
      data,
    }).then((res) => {
      if (res.data.status === 200) {
        toastSuccess(res.data.message);
        navigate("/login");
      } else {
        toastError(res.data.message);
        return;
      }
    });
  };

  return (
    <>
      <div className="h-full bg-gradient-to-tl from-green-500 to-blue-300 w-full py-24 px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p
              tabIndex={0}
              aria-label="Login to your account"
              className="text-2xl font-extrabold leading-6 text-gray-800"
            >
              {moreDetails ? (
                <>Provide More Details</>
              ) : (
                <>Create New Account</>
              )}
            </p>
            <p className="text-sm mt-4 font-medium leading-none text-gray-500">
              Already have account?{" "}
              <Link to={"/login"}>
                <span
                  tabIndex={0}
                  role="link"
                  aria-label="Sign up here"
                  className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                >
                  {" "}
                  Login
                </span>
              </Link>
            </p>
            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400  " />
            </div>
            {requestOTP && (
              <>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Phone Number
                  </lable>
                  <input
                    id="phoneNumber"
                    type="number"
                    placeholder="Enter your phone number"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <button
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-600 border rounded hover:bg-blue-700 py-4 w-full"
                    onClick={handleRequest}
                  >
                    Request OTP
                  </button>
                </div>
              </>
            )}

            {verifiedOTP && (
              <>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Enter OTP
                  </lable>
                  <input
                    id="OTP"
                    type="number"
                    placeholder="Enter your 4 digit OTP"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <button
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-600 border rounded hover:bg-blue-700 py-4 w-full"
                    onClick={handleVerify}
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            )}

            {accountDetails && (
              <>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Name
                  </lable>
                  <input
                    aria-labelledby="Name"
                    type="text"
                    placeholder="Enter your name"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Email
                  </lable>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Phone Number
                  </lable>
                  <input
                    id="phoneNumber"
                    type="number"
                    disabled
                    placeholder="Enter your phone number"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={phoneNumber}
                  />
                </div>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Password
                  </lable>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Confirm Password
                  </lable>
                  <input
                    id="cpassword"
                    type="password"
                    placeholder="Confirm password"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={Cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </div>

                <div className="mx-auto pt-8 flex pl-6">
                  <div className="flex items-center">
                    <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                      <input
                        defaultChecked
                        type="radio"
                        name="userType"
                        value="student"
                        onChange={(e) => setUserType(e.target.value)}
                        className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                      />
                      <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
                    </div>
                    <p className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100">
                      Student
                    </p>
                  </div>
                  <div className="flex items-center ml-6">
                    <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                      <input
                        type="radio"
                        name="userType"
                        value="tutor"
                        onChange={(e) => setUserType(e.target.value)}
                        className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                      />
                      <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
                    </div>
                    <p className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100">
                      Tutor
                    </p>
                  </div>
                  <style>
                    {`  .checkbox:checked {
                        border: none;
                    }
                    .checkbox:checked + .check-icon {
                        display: flex;
                    }`}
                  </style>
                </div>

                <div className="mt-8">
                  <button
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-600 border rounded hover:bg-blue-700 py-4 w-full"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}

            {moreDetails && (
              <>
                <div>
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Qualifications
                  </lable>
                  <div>
                    <input
                      aria-labelledby="Name"
                      type="text"
                      placeholder="Enter your qualification"
                      className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-80 pl-3 mt-2 mr-6"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                    <button
                      onClick={addQualification}
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-600 border rounded hover:bg-blue-700 py-3 w-16"
                    >
                      ADD
                    </button>
                  </div>
                  <div className="flex flex-wrap">
                    {qualifications.map((qualification) => {
                      return (
                        <div className="mt-1 flex ml-2 mr-12">
                          <div className="bg-blue-200 h-auto w-24 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                            <div className="flex items-center">
                              <span className="text-md text-center text-blue-600 font-normal">
                                {qualification}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeQualification(qualification)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className=" w-6 h-6 text-red-600"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <lable className="text-sm font-medium leading-none text-gray-800">
                    Skills
                  </lable>
                  <div>
                    <input
                      aria-labelledby="Name"
                      type="text"
                      placeholder="Enter your qualification"
                      className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-80 pl-3 mt-2 mr-6"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                    <button
                      onClick={addSkill}
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-600 border rounded hover:bg-blue-700 py-3 w-16"
                    >
                      ADD
                    </button>
                  </div>
                  <div className="flex flex-wrap">
                    {skills.map((skill) => {
                      return (
                        <div className="mt-1 flex ml-2 mr-12">
                          <div className="bg-blue-200 h-6 w-24 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                            <div className="flex items-center">
                              <span className="text-md text-blue-600 font-normal">
                                {skill}
                              </span>
                            </div>
                          </div>
                          <button onClick={() => removeSkill(skill)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className=" w-6 h-6 text-red-600"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none focus:outline-none bg-gray-300 border rounded hover:bg-gray-500 py-4 w-20"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                  <button
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-600 border rounded hover:bg-blue-700 py-4 w-24"
                    onClick={submitMoreDetails}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
