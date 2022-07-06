import React, { useEffect, useState } from "react";
import axios from "axios";
import OptionBoxDisplay from "./OptionBoxDisplay";
import ObjectID from "bson-objectid";
import Link from "next/link";
import PostMenuButton from "./PostMenuButton";
import { useRouter } from "next/router";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Speechbubble from "./speechbubble";

function Post({ post, isNew }) {
  // const [selectedIndex, setSelectedIndex] = useState(null);
  const [myPost, setMyPost] = useState(post);
  const [successMsg, setSuccessMsg] = useState(false);
  const [userId, setUserId] = useState(null);

  const voteByUser = myPost.votes.find((vote) => vote.uid == userId);
  const selectedIndex = voteByUser ? voteByUser.selectedIndex : null;

  const getOrCreateUid = () => {
    let uid = localStorage.getItem("uid");
    if (uid) {
      setUserId(uid);
      return;
    }

    uid = ObjectID();
    localStorage.setItem("uid", uid);
    setUserId(uid);
    return;
  };

  const voteRequest = (action, index) => {
    axios
      .patch(`/api/posts/${myPost._id}/vote`, {
        selectedIndex: index,
        uid: userId,
        action: action,
      })
      .then((response) => {
        setMyPost(response.data.post);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const vote = (index) => {
    console.log("vote!", index);
    voteRequest("vote", index);
  };

  const unvote = () => {
    voteRequest("unvote");
  };

  const router = useRouter();

  // const deletePost = (e) => {
  //   e.preventDefault();
  //   axios.delete(`/api/posts/${myPost._id}`).then((response) => {
  //     console.log(response);
  //     console.log("deleted!");
  //     // router.push("/");
  //     // window.location.reload();
  //     if (router.asPath == "/") {
  //       window.location.reload();
  //     } else {
  //       router.push("/");
  //     }
  //   });
  // };

  const [modalOpen, setModalOpen] = React.useState(false);

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
    getOrCreateUid();
  }, []);

  const sameUser = userId == myPost.uid;

  const [disabled, setDisabled] = useState(false);

  // if (sameUser) {
  //   setDisabled(true);
  // }

  // const onClick = (index) => {
  //   if (selectedIndex == index) {
  //     unvote();
  //     return;
  //   }

  //   vote(index);
  // };

  const renderTags = () => {
    return myPost.tags.map((tag, i) => (
      <Link
        // onClick={filterPost}
        href={`/?tag=${tag}`}
        key={`tag-${post._id}-${i}`}
      >
        <a className="inline-block mr-3 mb-1 bg-gray-100	text-gray-500 px-3 py-1 rounded-full cursor-pointer whitespace-nowrap">
          <span className="pr-0.5">#</span>
          {tag}
        </a>
      </Link>
    ));
  };

  const renderMenuButton = (menuButton, i) => {
    if (sameUser || i == 0) {
      return (
        <div
          className="w-8 align-middle flex justify-center"
          key={`menu-btn-${post._uid}-${i}`}
        >
          {menuButton}
        </div>
      );
    }
  };

  // const SpeechBubble = (text) => {
  //   const css = `
  //   .speechbubble {margin: 0px auto;
  //   padding: 7px 10px;
  //   // color: #f97316;
  //   color: #22c55e;
  //   font-size: 16px;
  //   font-weight: 500;
  //   position: relative;
  //   width: 160px;
  //   text-align: center;
  //   background-color: #fff;
  //   border: 8px solid #FFA500;
  //   // border: 8px solid #22c55e;
  //   // border: 8px solid #f97316;
  //   border-radius: 30px;
  //   // box-shadow: 1px 1px 4px #888;
  // }

  //   .speechbubble:before {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 50%;
  //     width: 0;
  //     height: 0;
  //     border: 20px solid transparent;
  //     border-bottom-color: #FFA500;
  //     // border-bottom-color: #22c55e;
  //     // border-bottom-color: #f97316;
  //     border-top: 0;
  //     margin-left: -20px;
  //     margin-top: -20px;
  //   }

  //   .speechbubble:after {
  //     content: '';
  //     position: absolute;
  //     top: 2%;
  //     left: 43%;
  //     width: 0;
  //     height: 0;
  //     border: 20px solid transparent;
  //     border-bottom-color: #fff;
  //     border-top: 0;
  //     margin-left: -10px;
  //     margin-top: -10px;
  //   }`;

  //   return (
  //     // <div
  //     //   style={{
  //     //     margin: "0px auto",
  //     //     padding: "8px 5px",
  //     //     fontSize: "15px",
  //     //     position: "relative",
  //     //     width: "170px",
  //     //     textAlign: "center",
  //     //     backgroundColor: "#fff",
  //     //     border: "5px solid rgb(190, 190, 250)",
  //     //     borderRadius: "30px",
  //     //     boxShadow: "2px 2px 4px #888",
  //     //   }}
  //     // >
  //     <div className="speechbubble">
  //       <style>{css}</style>
  //       {text}
  //     </div>
  //   );
  // };

  return (
    <div className="mx-auto">
      <div className="md:w-full">
        <div className="mb-6 md:mb-7">
          <span className="text-3xl font-bold pr-2.5 italic">Q.</span>

          <Link href={`/posts/${myPost._id}`}>
            <a className="text-xl font-semibold">{myPost.title}</a>
          </Link>
          <div className="mt-5 md:hidden">{renderTags()}</div>
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
                : null
            }
            post={myPost}
            index={0}
            selectedIndex={selectedIndex}
            sameUser={sameUser}
          />

          <div className="text-3xl font-bold m-5 text-center tracking-wider italic text-green-600 flex items-center">
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
                : null
            }
            post={myPost}
            index={1}
            selectedIndex={selectedIndex}
            sameUser={sameUser}
          />
        </div>

        <div className="flex justify-end mt-7 align-center md:justify-between relative">
          {/* <div className="flex justify-end mt-7 md:justify-between relative"> */}
          <div className="hidden text-center md:block">{renderTags()}</div>
          <div className="flex items-center">
            {successMsg ? (
              <span className="mr-2 text-orange-500 text-sm">
                링크 복사 완료!
              </span>
            ) : null}

            {[
              <PostMenuButton
                onClick={(e) => {
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
              />,

              <PostMenuButton onClick={editPost} icon={"🔧"} text={"수정"} />,
              <PostMenuButton
                onClick={() => {
                  setModalOpen(true);
                }}
                icon={"🗑"}
                text={"삭제"}
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
