import React, { useEffect, useState } from "react";
import { Post as PostType } from "../types/global";
import Post from "./Post";

type Props = {
  posts: PostType[] | null;
};

export default function PostList({ posts }: Props) {
  // post들이 load 되는 동안은 blank 보여줌
  if (!posts) {
    return null;
  }

  const renderPost = (post: PostType, i: number) => {
    return (
      <div
        key={`post-${i}-${post._id}`}
        className="border-b-2 border-black-900 pt-8 pb-8 first:pt-0 last:border-none"
      >
        <Post post={post} isNew={false} />
      </div>
    );
  };

  return (
    <div className="post-list">{posts.slice(0).reverse().map(renderPost)}</div>
  );
}
