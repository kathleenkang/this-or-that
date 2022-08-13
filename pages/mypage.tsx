import axios from "axios";
import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import Link from "next/link";
import { Post } from "../types/global";

function mypage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [uid, setUid] = useState<string | null>(null);

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

      {posts && posts.length == 0 ? (
        <div>
          <div className="text-xl leading-10 mt-14 mb-40 md:text-center md:mt-40">
            <div>아직 내가 올린 포스트가 없어요.</div>
            <div>
              지금{" "}
              <Link href="/postupload">
                <a className="font-medium text-green-500 underline underline-offset-2 md:hover:text-orange-500">
                  첫 투표를 만들어보세요!
                </a>
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-2 font-medium text-orange-500">
              * 혹시 예전에 올렸던 포스트가 안 보이시나요?
            </div>
            <div className="text-gray-500" style={{ wordBreak: "keep-all" }}>
              동일 브라우저에서 올린 포스트가 맞는지 확인해주세요.{" "}
              <br className="hidden md:block" />
              유저의 편의를 위해 로그인을 하지 않아도 사이트를 자유롭게 이용할
              수 있게 만든 <br className="hidden md:block" />
              디오댓에서는 각 브라우저를 하나의 아이디처럼 사용하고 있습니다.
            </div>
          </div>
        </div>
      ) : (
        <PostList posts={posts} />
      )}
    </>
  );
}

export default mypage;
