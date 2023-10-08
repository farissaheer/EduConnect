import React from "react";

function Card() {
  return (
    <>
      <div className="card p-5">
        <img
          alt=""
          src="/Assets/Courses.jpeg"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="rounded-3xl"
        />
        <div className="">
          <span className="text-1xl font-bold">Complete Python Course</span>
        </div>
      </div>
    </>
  );
}

export default Card;
