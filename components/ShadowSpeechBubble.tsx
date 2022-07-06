import React from "react";
// import "./styles/ShadowSpeechBubble.module.css";

// function ShadowSpeechBubble(speech) {
function ShadowSpeechBubble() {
  const css = `
      .speechbubble {margin: 0px auto;
      padding: 8px 13px;
      // color: #f97316;
      color: rgb(75 85 99);
      font-size: 16px;
      font-weight: 500;
      position: relative;
      width: 150px;
      text-align: center;
      background-color: #fff;
      border-radius: 30px;
      box-shadow: 0px 0px 7px #FFA500;
      margin-bottom: 30px
    }

      .speechbubble:after {
        background-color: #fff;
        // box-shadow: -1px -1px 5px 0px #FFA500;
        box-shadow: -2px 2px 2px 0px #ffcf8e;
        content: "";
        display: block;
        width: 15px;
        height: 15px;
        position: absolute;
            top: -10%;
            left: 46%;
        // transform:             rotate( 45deg );
        //     -moz-transform:    rotate( 45deg );
        //     -ms-transform:     rotate( 45deg );
        //     -o-transform:      rotate( 45deg );
        //     -webkit-transform: rotate( 45deg );

        transform:             rotate( 135deg );
        -moz-transform:    rotate( 135deg );
        -ms-transform:     rotate( 135deg );
        -o-transform:      rotate( 135deg );
        -webkit-transform: rotate( 135deg );
    }
  `;

  return (
    <div className="speechbubble">
      <style>{css}</style>
      {/* {speech} */}
      포스트를 공유해 투표를 받아보세요
    </div>
  );
}

export default ShadowSpeechBubble;

// <div className="speechbubble">
