import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import PostList from "../components/PostList";

function mypage() {
  const [posts, setPosts] = useState([]);
  const [uid, setUid] = useState(null);

  const fetchPosts = async () => {
    const uid = await localStorage.getItem("uid");

    axios
      .get(`${process.env.HOST}/api/posts${uid ? `?uid=${uid}` : ""}`)
      .then((response) => {
        setUid(uid);
        setPosts(response.data.posts);
      })
      .catch((error) => {
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
