import PostForm from "../../../components/PostForm";

export default function EditPost({ post }) {
  return <PostForm post={post} />;
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.HOST}/api/posts/${params.pid}`);
  const data = await res.json();

  return {
    props: {
      post: data.post,
    },
  };
}
