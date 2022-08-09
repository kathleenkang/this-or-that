import PostList from "../components/PostList";

export default function Home({ posts, tag }) {
  return (
    <>
      {tag ? (
        <h1 className="text-2xl font-bold mb-8 text-green-600">
          <span className="pr-0.5">#</span>
          {tag}
        </h1>
      ) : null}
      <PostList posts={posts} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `${process.env.HOST}/api/posts${query.tag ? `?tag=${query.tag}` : ""}`
  );
  const data = await res.json();

  return {
    props: {
      posts: data.posts,
      tag: query.tag ? query.tag : null,
    }, // will be passed to the page component as props
  };
}
