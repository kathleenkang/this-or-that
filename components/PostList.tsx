import axios from "axios";
import React, { useEffect, useState } from "react";
import { Post as PostType } from "../types/global";
import Post from "./Post";

import Image from "next/image";
import loadingSpinner from "../public/images/inprogress.gif";

type Props = {
  posts: PostType[] | null;
  tag: string;
};

export default function PostList({ posts, tag }: Props) {
  const [cursor, setCursor] = useState<number>(1);
  const [myPosts, setMyPosts] = useState<PostType[]>(posts);
  const [loading, setLoading] = useState<boolean>(false);

  // post들이 load 되는 동안은 blank 보여줌
  // if (!myPosts) {
  //   return null;
  // }

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
    console.log(cursor);

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
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="post-list" onScroll={handleScroll}>
      {myPosts.slice(0).reverse().map(renderPost)}

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
    </div>
  );
}
