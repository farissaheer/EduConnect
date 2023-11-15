import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastError } from "../toast";
import instance from "../../API/axiosInstance";

function Cart() {
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(0);

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
  return (
    <div
      className="flex lg:flex-row flex-col justify-center items-center"
      id="cart"
    >
      <div
        className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-8 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
        id="scroll"
      >
        <p className="mb-12 text-5xl font-black leading-10 text-gray-800 pt-3">
          Cart
        </p>
        {courses.map((course) => (
          <div className="md:flex items-center py-4 border-y border-gray-200">
            <div className="w-1/4">
              <img
                src={`/Assets/images/${course.courseid.image}`}
                alt="courseimage"
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="md:pl-3 md:w-3/4">
              <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4"></p>
              <div className="flex items-center justify-between w-full pt-1">
                <p className="text-base font-black leading-none text-gray-800">
                  {course.courseid.courseName}
                </p>
              </div>
              <p className="text-xs leading-3 text-gray-600 pt-2">
                Lessons: {course.courseid.lessons} Nos
              </p>
              <p className="text-xs leading-3 text-gray-600 py-4">
                Contents: {course.courseid.contents}
              </p>
              <p className="w-96 text-xs leading-3 text-gray-600">
                {/* Composition: 100% calf leather */}
              </p>
              <div className="flex items-center justify-between pt-5 pr-6">
                <div className="flex items-center">
                  {/* <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                            Add to favorites
                          </p>
                          <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                            Remove
                          </p> */}
                </div>
                <p className="text-base font-black leading-none text-gray-800">
                  ₹{course.courseid.fees}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="xl:w-1/2 lg:w-1/3 xl:w-1/4 w-full bg-gray-100 lg:-mt-20">
        <div className="flex flex-col px-14 py-20 justify-between">
          <div>
            <p className="text-4xl font-black leading-9 text-gray-800">
              Summary
            </p>
            <div className="flex items-center justify-between pt-16">
              <p className="text-base leading-none text-gray-800">Subtotal</p>
              <p className="text-base leading-none text-gray-800">₹{total}</p>
            </div>
            {/* <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800">Shipping</p>
              <p className="text-base leading-none text-gray-800">₹0</p>
            </div> */}
          </div>
          <div>
            <div className="flex items-center pb-6 justify-between lg:pt-12 pt-20">
              <p className="text-2xl leading-normal text-gray-800">Total</p>
              <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                ₹{total}
              </p>
            </div>
            <button
              onClick={() => navigate("/test")}
              className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
