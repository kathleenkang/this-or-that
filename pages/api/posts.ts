import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import { Post as PostType } from "../../types/global";
import Post from "../../models/Post";

type Data = {
  success: boolean;
  posts?: PostType[];
  post?: PostType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method == "GET") {
    try {
      const posts = await Post.find(
        req.query.uid
          ? { uid: req.query.uid }
          : req.query.tag
          ? { tags: req.query.tag }
          : {}
      )
        .sort({ _id: -1 })
        .limit(10 * (parseInt(req.query.cursor as string) + 1));
      res.status(200).json({ success: true, posts: posts.reverse() });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method == "POST") {
    try {
      const post = await Post.create(
        req.body
      ); /* create a new model in the database */
      res.status(201).json({ success: true, post: post });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
