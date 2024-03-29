import React, { useEffect, useState } from "react";
import ShadowSpeechBubble from "./ShadowSpeechBubble";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: string;
  text: string;
  isNew: boolean;
};

export default function PostMenuButton({ onClick, icon, text, isNew }: Props) {
  const [hovered, setHovered] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  useEffect(() => {
    if (isNew) {
      setShowSpeechBubble(true);
    }
  }, []);

  return (
    <>
      <button
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
        {hovered ? (
          <span className="text-sm leading-7">{text}</span>
        ) : (
          <span className="text-xl">{icon}</span>
        )}
      </button>

      {showSpeechBubble ? (
        <div
          style={{
            position: "absolute",
            bottom: "-110px",
          }}
        >
          <ShadowSpeechBubble />
        </div>
      ) : null}
    </>
  );
}
