import React, { useEffect, useState } from "react";
import { Post, Vote } from "../types/global";
import { TextAnimation } from "./TextAnimation";

type Props = {
  label: string;
  onClick: (() => void) | undefined;
  post: Post;
  index: number;
  selectedIndex: number | null;
  sameUser: boolean;
};

function OptionBoxDisplay({
  label,
  onClick,
  post,
  index,
  selectedIndex,
  sameUser,
}: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const option = post.options[index];
  const resultDisplay = () => {
    const result = (
      <TextAnimation
        voteCount={
          post.votes.filter((vote: Vote) => vote.selectedIndex == index).length
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

  const linkifyCaption = (caption: string) => {
    return caption.split(" ").map((word: string, i: number) => {
      let expression =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      let regex = new RegExp(expression);
      if (word.match(regex)) {
        return (
          <>
            <a
              href={word}
              target="_blank"
              rel="noreferrer"
              className="nested-link text-gray-500 underline underline-offset-4 hover:text-orange-500"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={(e) => {
                setHovered(false);
              }}
            >
              {`${word}${caption.length == i - 1 ? "" : " "}`}
            </a>
          </>
        );
      }
      return (
        <span key={`${post._id}-${word}-${i}`}>{`${word}${
          caption.length == i - 1 ? "" : " "
        }`}</span>
      );
    });
  };

  const conditions = ["showmore-btn", "nested-link"];

  return (
    <div
      id="optionbox"
      onClick={onClick}
      onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => {
        let div = e.target as HTMLDivElement;
        if (!conditions.some((el) => div.className.includes(el))) {
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
        className={`px-3.5 pt-[18px] pb-[16px] bg-white rounded-lg w-full flex flex-col grow justify-center`}
      >
        {option.imageUrl ? (
          <div className="grow flex">
            <img
              src={option.imageUrl}
              className="max-h-96 m-auto"
              alt="Option Image"
            />
          </div>
        ) : null}
        {option.caption ? (
          <div
            className={`text-xl inline-block w-full text-center ${
              option.imageUrl ? "mt-5 text-gray-500 text-[17px] px-2" : ""
            }`}
            style={
              option.caption.split(" ").filter((word: string) => {
                return word.length > 10;
              }).length == 0
                ? { wordBreak: "keep-all", wordWrap: "normal" }
                : {
                    wordBreak: "break-word",
                    wordWrap: "break-word",
                  }
            }
          >
            {showMore
              ? linkifyCaption(option.caption)
              : linkifyCaption(option.caption.substring(0, 165))}

            {option.caption.length < 165 ? null : (
              <button
                className="showmore-btn text-green-600 block mt-1.5 ml-auto mr-1 hover:text-orange-500"
                onClick={(e) => {
                  setShowMore(!showMore);
                  e.stopPropagation();
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
