import React, { useEffect, useState } from "react";
import { TextAnimation } from "./TextAnimation";

function OptionBoxDisplay({
  label,
  onClick,
  post,
  index,
  selectedIndex,
  sameUser,
}) {
  const [showMore, setShowMore] = useState(false);
  const [hovered, setHovered] = useState(false);

  const option = post.options[index];

  const resultDisplay = () => {
    const result = (
      <TextAnimation
        voteCount={
          post.votes.filter((vote) => vote.selectedIndex == index).length
        }
      />
    );
    if (sameUser) {
      return result;
    } else {
      if (selectedIndex != null) {
        return result;
      }
    }
  };

  return (
    <div
      id="optionbox"
      onClick={onClick}
      onMouseOver={(e) => {
        if (!e.target.className.includes("showmore-btn")) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={`bg-gray-200 w-full p-4 rounded-xl grow flex flex-col justify-between
      ${sameUser ? "hover:cursor-default" : "hover:cursor-pointer"}
      ${
        index == selectedIndex
          ? "ring-green-600 ring-[6px]"
          : hovered && !sameUser
          ? "ring-transparent md:ring-green-500 ring-[6px]"
          : ""
      }
      `}
    >
      <div className="flex justify-between items-stretch mb-3">
        <div
          className={`font-bold italic text-green-600 flex`}
          style={{ fontSize: "30px", lineHeight: "unset" }}
        >
          {label}
        </div>

        {resultDisplay()}
      </div>
      <div
        className={`px-3.5 py-3 bg-white rounded-lg w-full flex flex-col justify-between grow`}
      >
        {option.imageUrl ? (
          <div className="grow flex">
            <img src={option.imageUrl} className="max-h-96 m-auto" />
          </div>
        ) : null}
        {option.caption ? (
          <div
            className={`text-xl inline-block w-full text-center ${
              option.imageUrl ? "mt-3" : ""
            }`}
            style={
              option.caption.split(" ").filter((word) => {
                return word.length > 10;
              }).length == 0
                ? { wordBreak: "keep-all" }
                : {}
            }
          >
            <div className="">
              {showMore
                ? option.caption
                : `${option.caption.substring(0, 165)}`}
            </div>

            {option.caption.length < 165 ? null : (
              <button
                className="showmore-btn text-green-600 block mt-1.5 ml-auto mr-1 hover:text-orange-500"
                onClick={(e) => {
                  e.stopPropagation(setShowMore(!showMore));
                }}
                onMouseEnter={(e) => {
                  setHovered(false);
                }}
              >
                {showMore ? "- Show less" : "+ Show more"}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OptionBoxDisplay;
