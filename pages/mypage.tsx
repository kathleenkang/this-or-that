import React from "react";
import MyPosts from "../components/MyPosts";

function mypage() {
  return (
    <>
      <div className="text-2xl font-bold mt-5 mb-8 text-green-600">
        나의 포스트
      </div>

      <MyPosts />
    </>
  );
}

export default mypage;
