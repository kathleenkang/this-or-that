import { GetServerSidePropsContext } from "next";
import PostList from "../components/PostList";
import { Post } from "../types/global";

type Props = {
  posts: Post[];
  tag: string;
};

export default function Home({ posts, tag }: Props) {
  return (
    <>
      {tag ? (
        <h1 className="text-2xl font-bold mb-8 text-green-600">
          <span className="pr-0.5">#</span>
          {tag}
        </h1>
      ) : null}
      <PostList posts={posts} tag={tag} />
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const res = await fetch(
    `${process.env.HOST}/api/posts?cursor=0${
      query.tag ? `&tag=${query.tag}` : ""
    }`
  );
  const data = await res.json();

  return {
    props: {
      posts: data.posts,
      tag: query.tag ? query.tag : null,
    }, // will be passed to the page component as props
  };
}
