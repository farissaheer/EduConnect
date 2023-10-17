import React, { useState } from "react";
import { toastError, toastSuccess } from "../toast";
import { validatePasswordLength, validatePhone } from "../../Utils/Validation";
import { useNavigate } from "react-router-dom";
import instance from "../API/axiosInstance";

function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requestOTP, setRequestOTP] = useState(true);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [reset, setReset] = useState(false);

  const navigate = useNavigate();

  const handleRequest = async () => {
    if (!phoneNumber) {
      toastError("Please Enter the Phone Number");
      return;
    }
    if (!validatePhone(phoneNumber)) {
      toastError("Enter 10 digit Phone Number");
      return;
    }
    await instance({
      url: "/user/resetPasswordOTP",
      method: "POST",
      data: { phoneNumber },
    }).then((res) => {
      if (res.data.status === 200) {
        toastSuccess(res.data.message);
        setRequestOTP(false);
        setVerifyOTP(true);
      } else {
        toastError(res.data.message);
      }
    });
  };

  const handleVerify = async () => {
    if (!OTP) {
      toastError("Enter the OTP");
      return;
    }
    if (!verifyOTP) {
      toastError("OTP must be 4 digits");
      return;
    }
    await instance({
      url: "/user/checkOTP",
      method: "POST",
      data: { phoneNumber, OTP },
    }).then((res) => {
      if (res.data.status === 200) {
        toastSuccess(res.data.message);
        setVerifyOTP(false);
        setReset(true);
      } else {
        toastError(res.data.message);
      }
    });
  };

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toastError("Please Fill all fields");
      return;
    }
    if (!validatePasswordLength(password)) {
      toastError("Password length must be atleast 6");
      return;
    }
    if (password !== confirmPassword) {
      toastError("Passwords don't match");
      return;
    }
    await instance({
      url: "/user/resetPassword",
      method: "POST",
      data: { phoneNumber, password },
    }).then((res) => {
      if (res.data.status === 200) {
        toastSuccess(res.data.message);
        navigate("/login");
      } else {
        toastError(res.data.message);
      }
    });
  };

  // const [value, setValue] = useState("Sample");
  // const button = async () => {
  //   await instance({
  //     url: "/test",
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       setValue(res.data.message);
  //     })
  //     .catch((error) => console.log(error));
  // };
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
              Reset Password
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

            {verifyOTP && (
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

            {reset && (
              <>
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <button
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-600 border rounded hover:bg-blue-700 py-4 w-full"
                    onClick={handleSubmit}
                  >
                    Reset Password
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

export default ForgotPassword;
