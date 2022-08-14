import { GetServerSidePropsContext } from "next";
import Post from "../../components/Post";
import { Post as PostType } from "../../types/global";

type Props = {
  post: PostType;
  isNew: boolean;
};

export default function ShowPost({ post, isNew }: Props) {
  return (
    <div>
      <Post post={post} isNew={isNew} />
    </div>
  );
}

export async function getServerSideProps({
  params,
  query,
}: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.HOST}/api/posts/${params!.pid}`);
  const data = await res.json();

  return {
    props: {
      post: data.post,
      isNew: query.isNew ? query.isNew : false,
    },
  };
}
