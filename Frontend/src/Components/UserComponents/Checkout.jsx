import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import instance from "../../API/axiosInstance";
import { toastError, toastSuccess } from "../toast";

export default function Checkout() {
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    instance({
      url: "/user/loadCart",
      method: "post",
      data: { userid: userDetails.id },
    }).then((res) => {
      if (res.data.status === 200) {
        const courses = res.data.cartData.courses;
        setCourses(courses);
        setCount(courses.length);
        const total = courses.reduce(
          (acc, course) => acc + course.courseid.fees,
          0
        );
        setTotal(total);
        return;
      } else {
        toastError(res.data.message);
        return;
      }
    });
  }, [userDetails.id]);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_Ee1ie9vXC3WyGk",
      amount: data.amount,
      currency: data.currency,
      name: "React",
      description: "Test Transaction",
      // image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const userid = userDetails.id;
          const url = "/user/UserPaymentVerify";
          const { data } = await instance({
            url,
            method: "POST",
            data: { response, userid },
          });
          toastSuccess(data.message);

          // const bookId = data.detail;
          navigate(`/`);
        } catch (error) {
          toastError(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    // Initialize Razorpay outside of the window.onload function
    const rzp1 = new window.Razorpay(options);
    console.log(rzp1)
    rzp1.open();
  };

  const handlePayNow = async () => {
    try {
      const url = "/user/userPaymentOrders";
      const { data } = await instance({
        url,
        method: "POST",
        data: { amount: total },
      });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="overflow-y-hidden">
      <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
          <div className="flex w-full md:-mt-64 flex-col justify-start items-start">
            <div className>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Check out
              </p>
            </div>
            <div className="mt-2 mb-6">
              <p
                onClick={() => navigate("/user/cart")}
                className="text-base leading-4 cursor-pointer underline  hover:text-gray-800 text-gray-600"
              >
                Back to my Cart
              </p>
            </div>

            {courses.map((course) => (
              <div className="flex items-center py-4 border-y border-gray-200">
                <div className="w-1/6">
                  <img
                    src={`/Assets/images/${course.courseid.image}`}
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="pl-3 w-3/4 -mt-4">
                  <div className="flex items-center justify-between w-full pt-1">
                    <p className="text-base font-black leading-none text-gray-800">
                      {course.courseid.courseName}
                    </p>
                    <p className="text-base font-black leading-none text-gray-800">
                      ₹{course.courseid.fees}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-start items-start bg-gray-100 w-full p-6 md:p-14">
            <div>
              <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                Order Summary
              </h1>
            </div>
            <div className="flex mt-7 flex-col items-end w-full space-y-6">
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total items</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  {count}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  ₹{total}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Sub total </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  ₹{total}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center mt-32">
              <p className="text-xl font-semibold leading-4 text-gray-800">
                Estimated Total{" "}
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-800">
                ₹{total}
              </p>
            </div>
            <button
              onClick={handlePayNow}
              className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800"
            >
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
