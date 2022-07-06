import PostForm from "../../../components/PostForm";

export default function EditPost({ post }) {
  return (
    // <div className="max-w-7xl w-10/12 m-auto">
    <PostForm post={post} />
    // </div>
  );
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

// export async function getServerSideProps({ params, query }) {
//   const res = await fetch(`http://localhost:3000/api/posts/${params.pid}`);
//   const data = await res.json();

//   return {
//     props: {
//       post: data.post,
//       tag: query.tag ? query.tag : null,
//     },
//   };
// }
