import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { toastSuccess, toastError } from "../toast";
import {
  validateEmail,
  validatePasswordLength,
  validatePhone,
} from "../../Utils/Validation";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [requestOTP, setrequestOTP] = useState(true);
  const [verifiedOTP, setVerifiedOTP] = useState(false);
  const [accountDetails, setAccountDetails] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!name || !email || !phone || !password || !Cpassword) {
        toastError("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        toastError("Please enter a valid email address.");
        return;
      }

      if (!validatePhone(phone)) {
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
        phoneNumber: phone,
        password,
      };

      axios
        .post("/user/userSignUP", data)
        .then((response) => {
          if (response.data.status === 200) {
            toastSuccess(response.data.message);
            navigate("/login");
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
  // OK
  const handleRequest = async () => {
    if (!phone) {
      toastError("Please fill in all fields.");
      return;
    }

    if (!validatePhone(phone)) {
      console.log("invalid Phone");
      toastError("Please enter 10 digits phone number.");
      return;
    }
    const phoneNumber = phone;
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
      .post("/user/checkOTP", { OTP, phoneNumber: phone })
      .then((res) => {
        if (res.data.status === 200) {
          console.log("otp verified");
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
  // ok

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
              Create New Account
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
                    id="phone"
                    type="number"
                    placeholder="Enter your phone number"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    id="phone"
                    type="number"
                    disabled
                    placeholder="Enter your phone number"
                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
          </div>
        </div>
      </div>
    </>
  );
}
