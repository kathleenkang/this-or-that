import { isAbsolute } from "path/posix";
import React from "react";

function Speechbubble({ text }) {
  const style = {
    position: "relative",
    background: "#00aabb",
    borderRadius: ".4em",
    width: "150px",

    ":after": {
      content: "",
      position: "absolute",
      top: "0",
      left: "50%",
      width: "0",
      height: "0",
      border: "23px solid transparent",
      borderBottomColor: "#00aabb",
      borderTop: "0",
      marginLeft: "-23px",
      marginTop: "-23px",
    },
  };

  return (
    // <div
    //   style={{
    //     position: "relative",
    //     background: "#00aabb",
    //     borderRadius: ".4em",
    //     width: "150px",

    //     // .speech-bubble:after {
    //     //   content: '';
    //     //   position: absolute;
    //     //   top: 0;
    //     //   left: 50%;
    //     //   width: 0;
    //     //   height: 0;
    //     //   border: 23px solid transparent;
    //     //   border-bottom-color: #00aabb;
    //     //   border-top: 0;
    //     //   margin-left: -23px;
    //     //   margin-top: -23px;
    //     // }
    //   }}
    // >
    //   {text}
    // </div>

    <div>
      <div className="bubblebody" style={style}>
        {text}
      </div>
    </div>
  );
}

export default Speechbubble;
