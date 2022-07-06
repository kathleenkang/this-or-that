const express = require("express");
const multer = require("multer");
const app = express();

// const upload = multer({ dest: "uploads/" });

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

// const upload = multer({ storage: fileStorageEngine });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

app.listen(4000, () => console.log("listening on port 4000"));

// app.post("/images", upload.single("image"), function (req, res, next) {
//   const file = req.file;
//   console.log(file);
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// });
