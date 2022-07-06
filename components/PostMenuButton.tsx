import React, { useState } from "react";
import ShadowSpeechBubble from "./ShadowSpeechBubble";

export default function PostMenuButton({ onClick, icon, text, isNew }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <button
        // onClick={onClick}
        onClick={(e) => {
          onClick(e);
          setHovered(false);
        }}
        onMouseOver={(e) => {
          setHovered(true);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
        }}
      >
        {/* <div
                className={`align-middle h-7 w-14 ${
                  sameUser ? "inline-block" : "hidden"
                }`}
              > */}

        {/* <div className="align-middle"> */}
        {/* <div className="flex align-middle"> */}

        {/* <div className="h-6"> */}
        {hovered ? (
          <span className="text-sm leading-7">{text}</span>
        ) : (
          <span className="text-xl">{icon}</span>
        )}
      </button>

      {isNew ? (
        <div
          style={{
            position: "absolute",
            // bottom: "-77px",
            // bottom: "-100px",
            bottom: "-110px",
          }}
        >
          {/* <ShadowSpeechBubble speech={"포스트를 공유해 투표를 받아보세요"} /> */}
          <ShadowSpeechBubble />
        </div>
      ) : null}
    </>
  );
}
