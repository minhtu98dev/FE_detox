import React from "react";
// import Feedback from "@/Components/Feedback/Feedback";
import New from "@/Components/New/New";
// import Newspapers from "@/Components/Newspapers/Newspapers";
// import Video from "@/Components/Video/Video";

export default function Media() {
  return (
    <div>
      {/* baner */}
      <div className="relative mb-20">
        <img
          className="h-[160px] md:h-[400px] w-full object-cover"
          src="https://images.pexels.com/photos/7526060/pexels-photo-7526060.jpeg"
          alt=""
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-[16px] md:text-[42px] font-bold text-white">
            Truyền thông
          </h1>
        </div>
      </div>
      <New />
      {/* <Newspapers /> */}
      {/* <Video />
      <Feedback /> */}
    </div>
  );
}
