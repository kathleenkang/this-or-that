import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UploadButton({
  handleSubmit,
  modalOpen,
  setModalOpen,
  submitPost,
}) {
  return (
    <div>
      <button
        className="w-20 h-10 text-center px-4 py-1 rounded-full bg-green-600 text-white font-bold tracking-wide"
        onClick={handleSubmit}
      >
        Done
      </button>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
          >
            이미지 없이 업로드하시겠습니까?
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            OK를 누르면 바로 포스트가 생성됩니다.
          </Typography> */}
          <div className="">
            <button
              className="block bg-green-600 text-white w-20 h-10 mx-auto my-6 rounded-md italic tracking-widest"
              onClick={() => {
                submitPost("text");
              }}
            >
              YES!
            </button>

            <a
              className="block text-center underline underline-offset-2 text-orange-500"
              // onClick={setModalOpen(false)}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              아뇨, 이미지 추가할래요
            </a>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
