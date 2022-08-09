import React, { useState } from "react";
import Image from "next/image";
import uploadIcon from "../public/images/upload_icon.png";
import { useS3Upload } from "next-s3-upload";

type PictureUploadProps = {
  index: number;
  // handleOptionsChange;
  handleOptionsChange: any;
  imageUrl: string;
};

function PictureUpload({
  index,
  handleOptionsChange,
  imageUrl,
}: PictureUploadProps) {
  let { uploadToS3 } = useS3Upload();

  const [isImg, setIsImg] = useState(true);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);

    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      setIsImg(false);
      return;
    }

    setIsImg(true);

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
        <label className="relative">
          <input
            type="file"
            onChange={handleChange}
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
            className="opacity-0 absolute left-[-215px] top-[-10px] text-8xl"
          />
        </label>
      </div>
    </div>
  );
}

export default PictureUpload;
