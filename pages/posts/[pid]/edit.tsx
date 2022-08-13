import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PostForm from "../../../components/PostForm";
import { Post } from "../../../types/global";

type Props = {
  post: Post;
};

export default function EditPost({ post }: Props) {
  return <PostForm post={post} />;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.HOST}/api/posts/${params!.pid}`);
  const data = await res.json();

  return {
    props: {
      post: data.post,
    },
  };
}
