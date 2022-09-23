import axios from "axios";
import React, { useEffect, useState } from "react";
import { Post as PostType } from "../types/global";
import Post from "./Post";

import Image from "next/image";
import loadingSpinner from "../public/images/inprogress.gif";
import Link from "next/link";

type Props = {
  posts: PostType[] | null;
  tag?: string;
};

export default function PostList({ posts, tag }: Props) {
  const [cursor, setCursor] = useState<number>(1);
  const [myPosts, setMyPosts] = useState<PostType[] | null>(posts);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const renderPost = (post: PostType, i: number) => {
    return (
      <div
        key={`post-${i}-${post._id}`}
        className="border-b-2 border-black-900 pt-4 pb-5 first:pt-0 last:border-none md:pt-6"
      >
        <Post post={post} isNew={false} />
      </div>
    );
  };

  const handleScroll = () => {
    if (
      hasNextPage === true &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ) {
      fetchPosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cursor]);

  const fetchPosts = () => {
    setLoading(true);
    let url = `${process.env.HOST}/api/posts?cursor=${cursor}`;
    if (tag) {
      url += `tag=${tag}`;
    }

    axios
      .get(url)

      .then((response) => {
        setMyPosts(response.data.posts);
        setCursor(cursor + 1);
        setLoading(false);
        if (
          response.data.posts.find(
            (post: any) => post._id === "62cae2a5932dd8eede9bc626"
          )
        ) {
          setHasNextPage(false);
        }
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="post-list" onScroll={handleScroll}>
      {myPosts && myPosts.slice(0).reverse().map(renderPost)}

      {loading ? (
        <div className="flex justify-center py-4">
          <Image
            src={loadingSpinner}
            width={50}
            height={50}
            alt="LoadingSpinner"
          />
        </div>
      ) : null}

      {hasNextPage ? null : (
        <div className="pt-8 text-center leading-7">
          디오댓의 모든 포스트 섭렵 완료! 🥳
          <br />
          <Link href="/postupload">
            <a className="text-lg font-medium text-green-500 underline underline-offset-4 md:hover:text-orange-500">
              지금 새로운 투표를 올려보세요!
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
