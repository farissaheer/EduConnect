import React from "react";

import NavBar from "../../Components/UserComponents/NavBar";
import UserHome from "../../Components/UserComponents/UserHome";
import Footer from "../../Components/UserComponents/Footer";
// import Card from "../../Components/UserComponents/Card";
import CourseList from "../../Components/UserComponents/CourseList";

function HomePage() {
  return (
    <>
      <NavBar />
      <UserHome />
      <div className="text-center pt-5 bg-gray-100">
        <span className="text-2xl text-blue-900 font-bold">Available Courses</span>
      </div>
      {/* <div className="w-full  mx-auto p-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 ">
        <Card />
        <Card />
        <Card />
        <Card />
      </div> */}
      <CourseList/>
      <Footer />
    </>
  );
}

export default HomePage;
