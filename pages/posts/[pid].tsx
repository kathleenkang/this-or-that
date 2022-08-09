import Post from "../../components/Post";

type showPostProps = {
  post: {};
  isNew: boolean;
};

// export default function ShowPost({ post, isNew }) {
export default function ShowPost({ post, isNew }: showPostProps) {
  return (
    <div>
      <Post post={post} isNew={isNew} />
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  const res = await fetch(`${process.env.HOST}/api/posts/${params.pid}`);
  const data = await res.json();

  return {
    props: {
      post: data.post,
      isNew: query.isNew ? query.isNew : false,
    },
  };
}
