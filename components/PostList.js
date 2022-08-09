import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function PostList({ posts }) {
  // post들이 load 되는 동안은 blank 보여줌
  if (!posts) {
    return;
  }

  const renderPost = (post, i) => {
    return (
      <div
        key={`post-${i}-${post._id}`}
        className="border-b-2 border-black-900 pt-8 pb-8 first:pt-0 last:border-none"
      >
        <Post post={post} />
      </div>
    );
  };

  return (
    <div className="post-list">{posts.slice(0).reverse().map(renderPost)}</div>
  );
}
