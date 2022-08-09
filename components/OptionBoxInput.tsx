import React, { useState } from "react";
import PictureUpload from "./PictureUpload";

type OptionBoxInputTypes = {
  type: string;
  index: number;
  options: {
    imageUrl: string | null;
    caption: string | null;
  }[];
  // handleOptionsChange: React.ChangeEvent<HTMLInputElement>;
  handleOptionsChange: (
    index: number,
    attribute: string,
    newValue: string
  ) => void;
};

function OptionBoxInput({
  type,
  index,
  options,
  handleOptionsChange,
}: OptionBoxInputTypes) {
  const PlaceholderOptions = () => {
    if (type == "image" && index == 0) return "스니커즈";
    else if (type == "image" && index == 1) return "로퍼";
    else if (type == "text" && index == 0) return "짜장면";
    else return "짬뽕";
  };

  return (
    <div className="bg-gray-200 w-full p-4 pb-2.5 rounded-xl grow flex flex-col justify-between md:w-11">
      <div className="text-3xl font-bold italic mb-3 text-green-600">
        {index == 0 ? "this" : "that"}
      </div>

      {type == "image" ? (
        <PictureUpload
          index={index}
          handleOptionsChange={handleOptionsChange}
          imageUrl={options[index]["imageUrl"]}
        />
      ) : null}
      <div>
        <div className="flex justify-between mb-2">
          <div
            className={`font-medium italic ${
              type == "image" ? "block" : "hidden"
            }`}
          >
            이미지 캡션
          </div>
          {type == "image" ? (
            <div className="text-gray-500">(선택사항)</div>
          ) : null}
        </div>

        <textarea
          id="img-caption"
          className={`px-3 py-2 border-gray-400 rounded-lg w-full focus:outline-green-600 resize-none ${
            type == "image" ? "h-10" : "h-24"
          } md:${type == "image" ? "h-10" : "h-48"}`}
          placeholder={`ex) ${PlaceholderOptions()}`}
          defaultValue={options[index]["caption"]}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleOptionsChange(index, "caption", e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default OptionBoxInput;
