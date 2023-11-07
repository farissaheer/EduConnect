import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../API/axiosInstance";
import { toastError } from "../toast";
import { useSelector } from "react-redux";

function Cart() {
  const [show, setShow] = useState(true);
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    instance({
      url: "/user/loadCart",
      method: "post",
      data: { userid: userDetails.id },
    }).then((res) => {
      if (res.data.status === 200) {
        setCourses(res.data.cartData.courses);
        setTotal(res.data.cartData.total);
        return;
      } else {
        toastError(res.data.message);
        return;
      }
    });
  }, [userDetails.id]);

  return (
    <>
      <div>
        <div className="flex items-center justify-center py-8">
          <button
            onClick={() => setShow(!show)}
            className="py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Open Modal
          </button>
        </div>
        {show && (
          <div
            className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
            id="chec-div"
          >
            <div
              className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
              id="checkout"
            >
              <div className="flex md:flex-row flex-col justify-end" id="cart">
                <div
                  className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                  id="scroll"
                >
                  <div
                    className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                    onClick={handleClick}
                  >
                    <img
                      className="rounded h-12 w-32 object-cover"
                      src="/Assets/EduConnectLogo.png"
                      alt="logo"
                    />
                  </div>
                  <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                    Cart
                  </p>
                  {courses.map((course) => (
                    <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                      <div className="w-1/4">
                        <img
                          src={`/pictures/${course.courseid.image}`}
                          alt=""
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
                          <div className="flex itemms-center">
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
                <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                  <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                    <div>
                      <p className="text-4xl font-black leading-9 text-gray-800">
                        Summary
                      </p>
                      <div className="flex items-center justify-between pt-16">
                        <p className="text-base leading-none text-gray-800">
                          Subtotal
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          ₹{total}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <p className="text-base leading-none text-gray-800">
                          Shipping
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          ₹0
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <p className="text-base leading-none text-gray-800">
                          {/* Tax */}
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          {/* $35 */}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                        <p className="text-2xl leading-normal text-gray-800">
                          Total
                        </p>
                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                          ₹{total}
                        </p>
                      </div>
                      <button
                        onClick={() => setShow(!show)}
                        className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}

export default Cart;
