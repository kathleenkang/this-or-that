import React, { useEffect, useState } from "react";
import axios from "axios";
import OptionBoxDisplay from "./OptionBoxDisplay";
import Link from "next/link";
import PostMenuButton from "./PostMenuButton";
import { useRouter } from "next/router";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Post, Vote } from "../types/global";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { getOrCreateUid } from "../lib/utils";

type Props = {
  post: Post;
  isNew: boolean;
};

function Post({ post, isNew }: Props) {
  const [myPost, setMyPost] = useState(post);
  const [successMsg, setSuccessMsg] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const voteByUser = myPost.votes.find((vote: Vote) => vote.uid == userId);
  const selectedIndex = voteByUser ? voteByUser.selectedIndex : null;

  const voteRequest = (action: string, index?: number) => {
    console.log(userId);

    axios
      .patch(`/api/posts/${myPost._id}/vote`, {
        selectedIndex: index,
        uid: userId,
        action: action,
      })
      .then((response) => {
        setMyPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const vote = (index: number) => {
    voteRequest("vote", index);
  };

  const unvote = () => {
    voteRequest("unvote");
  };

  const router = useRouter();

  const [modalOpen, setModalOpen] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const renderModal = () => {
    return (
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
            포스트를 삭제하시겠습니까?
          </Typography>

          <div>
            <button
              className="block bg-red-500 text-white w-20 h-10 mx-auto my-6 rounded-md italic tracking-widest"
              onClick={(e) => {
                e.preventDefault();
                axios.delete(`/api/posts/${myPost._id}`).then((response) => {
                  console.log(response);
                  if (router.asPath == "/") {
                    window.location.reload();
                  } else {
                    router.push("/");
                  }
                });
              }}
            >
              YES!
            </button>

            <a
              className="block text-center underline underline-offset-2 text-green-500"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              아뇨, 그대로 둘래요!
            </a>
          </div>
        </Box>
      </Modal>
    );
  };

  const editPost = () => {
    router.push(`/posts/${myPost._id}/edit`);
  };

  useEffect(() => {
    setUserId(getOrCreateUid());
  }, []);

  const sameUser = userId == myPost.uid;

  const [disabled, setDisabled] = useState(false);

  const renderTags = () => {
    return myPost.tags.map((tag: string, i: number) => (
      <Link href={`/?tag=${tag}`} key={`tag-${post._id}-${i}`}>
        <a className="inline-block mr-2.5 mb-1 bg-gray-100	text-gray-500 px-3 py-1 rounded-full cursor-pointer whitespace-nowrap">
          <span className="pr-0.5">#</span>
          {tag}
        </a>
      </Link>
    ));
  };

  const renderMenuButton = (menuButton: ReactJSXElement, i: number) => {
    if (sameUser || i == 0) {
      return (
        <div
          className="w-8 align-middle flex justify-center"
          key={`menu-btn-${post.uid}-${i}`}
        >
          {menuButton}
        </div>
      );
    }
  };

  return (
    <div className="mx-auto">
      <div className="md:w-full">
        <div className="mb-4 md:mb-6">
          <div className="flex">
            <div className="text-3xl font-bold pr-2.5 italic">Q.</div>

            <Link href={`/posts/${myPost._id}`}>
              <a
                className="text-xl font-medium pt-2 leading-6 md:pt-1 md:leading-8 md:font-semibold"
                style={{ wordBreak: "keep-all" }}
              >
                {myPost.title}
              </a>
            </Link>
          </div>

          <div className="mt-4 md:hidden">{renderTags()}</div>
        </div>

        <div className="md:flex items-stretch">
          <OptionBoxDisplay
            label={"this"}
            onClick={
              !sameUser
                ? () => {
                    if (selectedIndex == 0) {
                      unvote();
                      return;
                    }
                    vote(0);
                  }
                : undefined
            }
            post={myPost}
            index={0}
            selectedIndex={selectedIndex}
            sameUser={sameUser}
          />

          <div className="text-3xl font-bold m-4 justify-center tracking-wider italic text-green-600 flex items-center md:m-5">
            or
          </div>

          <OptionBoxDisplay
            label={"that"}
            onClick={
              !sameUser
                ? () => {
                    if (selectedIndex == 1) {
                      unvote();
                      return;
                    }
                    vote(1);
                  }
                : undefined
            }
            post={myPost}
            index={1}
            selectedIndex={selectedIndex}
            sameUser={sameUser}
          />
        </div>

        <div className="flex justify-end mt-6 align-center md:justify-between relative">
          <div className="hidden text-center md:block">{renderTags()}</div>
          <div className="flex items-center">
            {successMsg ? (
              <span className="mr-2 text-orange-500 text-sm">
                링크 복사 완료!
              </span>
            ) : null}

            {[
              <PostMenuButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  navigator.clipboard
                    .writeText(`${process.env.HOST}/posts/${myPost._id}`)
                    .then(() => {
                      setSuccessMsg(true);
                      setTimeout(() => {
                        setSuccessMsg(false);
                      }, 1200);
                    });
                }}
                icon={"🔗"}
                text={"공유"}
                isNew={isNew}
                key="share-btn"
              />,

              <PostMenuButton
                onClick={editPost}
                icon={"🔧"}
                text={"수정"}
                isNew={false}
                key="edit-btn"
              />,
              <PostMenuButton
                onClick={() => {
                  setModalOpen(true);
                }}
                icon={"🗑"}
                text={"삭제"}
                isNew={false}
                key="delete-btn"
              />,
            ].map(renderMenuButton)}
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
}

export default Post;
