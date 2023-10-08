import React from "react";

import NavBar from "../Components/UserComponents/NavBar";
import UserHome from "../Components/UserComponents/UserHome";
import Footer from "../Components/UserComponents/Footer";
import Card from "../Components/UserComponents/Card";

function HomePage() {
  return (
    <>
      <NavBar />
      <UserHome />
      <div className="text-center">
        <span className="text-2xl font-bold">Courses</span>
      </div>
      <div className="w-full  mx-auto p-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 ">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
