import React, { useState } from "react";
import Image from "next/image";
import uploadIcon from "../public/images/upload_icon.png";
import { useS3Upload } from "next-s3-upload";
import ImageResize from "image-resize";

function PictureUpload({ index, handleOptionsChange, imageUrl }) {
  let { uploadToS3 } = useS3Upload();
  // const imageResize = new ImageResize({
  //   // format: "jpg",
  //   width: 1000,
  // });

  // const dataURLtoFile = (dataurl, filename) => {
  //   var arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], filename, { type: mime });
  // };

  const [isImg, setIsImg] = useState(true);

  // function safariStream(blob) {
  //   let position = 0;

  //   return new ReadableStream({
  //     pull: function (controller) {
  //       const chunk = blob.slice(
  //         position,
  //         Math.min(
  //           blob.size,
  //           position + Math.max(controller.desiredSize, 512 * 1024)
  //         )
  //       );
  //       return chunk.arrayBuffer().then(function (buffer) {
  //         const uint8array = new Uint8Array(buffer);
  //         const bytesRead = uint8array.byteLength;

  //         position += bytesRead;
  //         controller.enqueue(uint8array);

  //         if (position >= blob.size) controller.close();
  //       });
  //     },
  //   });
  // }

  const handleChange = async (e) => {
    console.log(e);

    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // console.log(file);
    // console.log(Blob.prototype.stream ? file : safariStream(file));

    // 각 옵션 박스당 한 번씩만 메세지 뜸
    // if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) alert("not an image");

    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      setIsImg(false);
      return;
    }

    setIsImg(true);

    // try {
    //   const res = await imageResize.play(file);
    //   const adjustedFile = dataURLtoFile(
    //     res,
    //     // `${file.name.split(".").slice(0, -1).join(".")}.jpg`
    //     file.name
    //   );
    //   reader.onloadend = async () => {
    //     let { url } = await uploadToS3(adjustedFile);
    //     handleOptionsChange(index, "imageUrl", url);
    //   };
    //   reader.readAsDataURL(adjustedFile);
    // } catch (e) {
    //   console.error(e);
    // }

    try {
      reader.onloadend = async () => {
        let { url } = await uploadToS3(
          Blob.prototype.stream ? file : safariStream(file)
        );
        handleOptionsChange(index, "imageUrl", url);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
    }
  };

  const renderWarning = () => {
    if (isImg) {
      return;
    }

    return (
      <div className="text-sm text-red-500">
        <div className="pb-0.5">
          * <span className="font-bold">이미지 파일</span>을 업로드해주세요
        </div>
        <div>
          ( <span className="font-bold">jpg / jpeg / png / gif</span> )
        </div>
      </div>
    );
  };

  return imageUrl ? (
    <div className="text-center text-gray-500 mb-3 grow flex">
      <div className="overflow-hidden flex flex-col grow items-center">
        <img src={imageUrl} className="max-h-96 m-auto" />
        {/* <label className="hover:cursor-pointer"> */}
        <label className="relative">
          <input
            type="file"
            onChange={handleChange}
            // className="opacity-100 absolute overflow-clip left-0 top-0 w-full h-full text-7xl"
            // className="opacity-100 absolute overflow-hidden left-0 top-0 text-7xl"
            // className="opacity-0 absolute left-0 top-0"
            // className="opacity-50 absolute bottom-[-8px] left-[-115px] text-lg hover:cursor-pointer"
            // className="opacity-50 absolute bottom-[-6px] left-[-230px] text-lg hover:cursor-pointer"
            className="opacity-0 absolute bottom-[7px] left-[-170px] text-lg hover:cursor-pointer"
          />
          <div className="text-orange-500 font-medium underline underline-offset-2 my-3">
            이미지 변경하기
          </div>
        </label>
        {renderWarning()}
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500 mb-3 grow flex flex-col justify-between">
      <div className="relative overflow-hidden flex flex-col justify-center items-center grow">
        <label className="relative">
          {/* <div className="hover:cursor-pointer"> */}
          <div>
            <div className="w-14 m-auto pb-1 opacity-50">
              <Image src={uploadIcon} />
            </div>

            <div className="text-sm text-center text-gray-500 pb-2">
              Upload Image
            </div>
          </div>

          {renderWarning()}

          <input
            type="file"
            onChange={handleChange}
            // className="opacity-100 absolute overflow-clip left-0 top-0 w-full h-full"
            // className="opacity-50 absolute left-0 top-0 text-8xl"
            className="opacity-0 absolute left-[-215px] top-[-10px] text-8xl"
          />
        </label>
      </div>
    </div>
  );
}

export default PictureUpload;
