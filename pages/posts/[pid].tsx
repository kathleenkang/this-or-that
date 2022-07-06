import Post from "../../components/Post";

export default function ShowPost({ post, isNew }) {
  return (
    // <div className="max-w-7xl w-10/12 m-auto">
    <div>
      <Post post={post} isNew={isNew} />
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  const res = await fetch(`http://localhost:3000/api/posts/${params.pid}`);
  const data = await res.json();

  return {
    props: {
      post: data.post,
      isNew: query.isNew ? query.isNew : null,
    },
  };
}
