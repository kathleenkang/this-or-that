import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import PostList from "../components/PostList";

function mypage() {
  const [posts, setPosts] = useState([]);
  const [uid, setUid] = useState(null);

  // const getOrCreateUid = () => {
  //   let uid = localStorage.getItem("uid");
  //   if (uid) {
  //     setUserId(uid);
  //     return;
  //   }

  //   uid = ObjectID();
  //   localStorage.setItem("uid", uid);
  //   setUserId(uid);
  //   return;
  // };

  const fetchPosts = async () => {
    const uid = await localStorage.getItem("uid");

    axios
      .get(`${process.env.HOST}/api/posts${uid ? `?uid=${uid}` : ""}`)
      .then((response) => {
        setUid(uid);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        alert(`${process.env.HOST}/api/posts${uid ? `?uid=${uid}` : ""}`);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="text-2xl font-bold mt-5 mb-8 text-green-600">
        나의 포스트
      </div>
      {uid}
      <PostList posts={posts} />
    </>
  );
}

export default mypage;
