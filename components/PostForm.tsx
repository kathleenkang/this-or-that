import React, { useState } from "react";
import OptionBoxInput from "../components/OptionBoxInput";
import axios from "axios";
import { useRouter } from "next/router";
import UploadButton from "../components/UploadButton";

import ObjectID from "bson-objectid";
import Tags from "./Tags";

function PostForm({ post }) {
  const router = useRouter();

  const [type, setType] = useState(post ? post.type : "image");
  const [title, setTitle] = useState(post ? post.title : "");
  const [options, setOptions] = useState<
    {
      imageUrl: string | null;
      caption: string | null;
    }[]
  >(
    post
      ? post.options
      : [
          {
            imageUrl: null,
            caption: null,
          },
          {
            imageUrl: null,
            caption: null,
          },
        ]
  );
  const [tags, setTags] = useState(post && post.tags ? post.tags : []);

  const [itemsAlert, setItemsAlert] = useState(false);
  const [imageItemsAlert, setImageItemsAlert] = useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);

  const [letterCount, setLetterCount] = React.useState(0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOptionsChange = (
    index: number,
    attribute: string,
    newValue: string
  ) => {
    let newOptions = [...options];
    newOptions[index][attribute] = newValue;
    setOptions(newOptions);
    if (newOptions[0]["imageUrl"] && newOptions[1]["imageUrl"]) {
      setImageItemsAlert(false);
    }
  };

  const getOrCreateUid = () => {
    let uid = localStorage.getItem("uid");
    if (uid) {
      return uid;
    }

    uid = ObjectID();
    localStorage.setItem("uid", uid);

    return uid;
  };

  const submitPost = (submitType) => {
    const body = {
      title: title && title.trim().length !== 0 ? title : "골라줘!",
      type: submitType,
      options:
        submitType == "image"
          ? options
          : options.map((option) => {
              return { caption: option.caption };
            }),
      tags: tags,
      uid: getOrCreateUid(),
    };

    if (post) {
      axios
        .patch(`/api/posts/${post._id}`, body)
        .then(function (response) {
          console.log(response);
          router.push(`/posts/${response.data.post._id}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("/api/posts", body)
        .then(function (response) {
          console.log(response);
          router.push(`/posts/${response.data.post._id}?isNew=true`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleSwitch = () => {
    setType(type == "image" ? "text" : "image");
  };

  const handleSubmit = () => {
    if (
      type == "text" &&
      (!options[0].caption || !options[1].caption)
      // type == "text" &&
      // (options[0].caption == null || options[1].caption == null)
    ) {
      setItemsAlert(true);
      return;
    } else if (
      type == "image" &&
      !options[0].imageUrl &&
      !options[1].imageUrl &&
      (!options[0].caption || !options[1].caption)
    ) {
      setItemsAlert(true);
    } else if (
      type == "image" &&
      !options[0].imageUrl &&
      !options[1].imageUrl
    ) {
      setModalOpen(true);
    } else if (
      type == "image" &&
      (!options[0].imageUrl || !options[1].imageUrl)
    ) {
      setImageItemsAlert(true);
      return;
    } else {
      submitPost(type);
    }
  };

  return (
    <>
      <div>
        <div className="pb-1.5 flex justify-between">
          <div>
            <span className="text-3xl font-bold pr-2.5 italic">Q.</span>
            <span className="text-xl font-semibold">뭘 골라줄까?</span>
          </div>
          {/* {titleAlert ? (
            <span className="ml-9 text-red-500 font-medium">
              * 질문을 입력하세요
            </span>
          ) : null} */}
          <span className="flex items-end text-gray-400">
            {letterCount}/100
          </span>
        </div>

        <textarea
          className="w-full border-2 px-3 py-2 border-gray-400 rounded-lg text-ellipsis focus:outline-green-600 resize-none"
          id="question"
          maxLength={100}
          // onChange={(e) => setLetterCount(e.target.value.length)}
          onChange={(e) => {
            setLetterCount(e.target.value.length);
            handleTitleChange(e);
          }}
          defaultValue={title}
          placeholder={`ex) ${
            type == "image"
              ? "오늘 착장에 어느 신발이 더 잘 어울려? / 셀카 골라줘! / 이거 어떤 색으로 살까?"
              : "저녁 뭐 먹지? / 이러이러한 일이 있었는데 나 얘한테 고백할까 말까?"
          }`}
          // onChange={handleTitleChange}
          // onChange={async (e) => {
          //   e.preventDefault();

          //   if (title == "null") {
          //     Swal.fire("", "내용을 입력해주세요", "question");
          //     return;
          //   }

          //   handleTitleChange;
          // }}
        ></textarea>
      </div>

      <div className="grid justify-items-end pb-0.5">
        <div className="grid justify-items-end pr-0.5">
          <button
            onClick={handleSwitch}
            className="text-green-600 font-bold underline underline-offset-4 pt-5 pb-6"
          >
            {`${
              type == "image" ? "이미지 없이 작성하기" : "이미지 추가하기"
            } ➔`}
          </button>
        </div>
      </div>

      <div className="md:flex w-full">
        <OptionBoxInput
          index={0}
          options={options}
          handleOptionsChange={handleOptionsChange}
          type={type}
        />
        <div className="text-3xl font-bold m-5 text-center tracking-wider italic text-green-600 md:flex items-center">
          or
        </div>
        <OptionBoxInput
          index={1}
          options={options}
          handleOptionsChange={handleOptionsChange}
          type={type}
        />
      </div>

      <div className="my-10">
        <Tags tags={tags} setTags={setTags} />
      </div>

      {/* submit button */}
      <div className="flex justify-end pb-4 items-center">
        {itemsAlert ? (
          <span
            className="text-red-500 font-medium mr-3 flex items-center"
            style={{ wordBreak: "keep-all" }}
          >
            * 두 가지 옵션을 모두 입력해주세요
          </span>
        ) : null}

        {imageItemsAlert ? (
          <span
            className="text-red-500 font-medium mr-3 flex items-center"
            style={{ wordBreak: "keep-all" }}
          >
            * 두 가지 이미지를 모두 업로드해주세요
          </span>
        ) : null}

        {/* <button
          onClick={handleSubmit}
          className="w-20 h-10 text-center px-4 py-1 rounded-full bg-green-600 text-white font-bold"
        >
          Done
        </button> */}

        <UploadButton
          handleSubmit={handleSubmit}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPost={submitPost}
        />
      </div>
    </>
  );
}

export default PostForm;
