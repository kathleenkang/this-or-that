import React from "react";

function about() {
  return (
    <>
      <div className="text-2xl font-bold mt-5 mb-8 text-green-600">
        What is [ THIS OR THAT ] ?
      </div>

      <div
        className="text-lg leading-8 text-justify"
        style={{ wordBreak: "keep-all" }}
      >
        <span className="font-bold pr-1">This or That [디오댓]</span>은
        결정장애를 가진 사람들을 위한{" "}
        <span className="pr-1">&quot;소셜 투표 플랫폼&quot;</span>
        입니다. <br />
        밸런스 게임부터 소개팅룩 조언까지⁠—
        <br />
        무엇이든 고민이 될 때, 익명으로 커뮤니티 유저들의 투표를 받아보세요!
        <br />
        다른 유저들의 포스트에 투표하는 재미도 쏠쏠해요 :) <br />
        <br />
        이게 나아 저게 나아?
        <br />
        골라줘! 👍
      </div>

      <div className="text-2xl font-bold text-green-600 mt-10 mb-1">
        Contact Us
      </div>

      <div
        className="text-lg leading-10 text-justify"
        style={{ wordBreak: "keep-all" }}
      >
        coded.by.kat@gmail.com
      </div>
    </>
  );
}

export default about;
