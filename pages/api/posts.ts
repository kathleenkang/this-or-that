import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Post from "../../models/Post";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method == "GET") {
    try {
      console.log(req.query.uid);

      const posts = await Post.find(
        req.query.uid
          ? { uid: req.query.uid }
          : req.query.tag
          ? { tags: req.query.tag }
          : {}
      );
      res.status(201).json({ success: true, posts: posts });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method == "POST") {
    console.log(req.body);
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
