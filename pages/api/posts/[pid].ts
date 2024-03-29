import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import { Post as PostType } from "../../../types/global";
import Post from "../../../models/Post";

type Data = {
  success: boolean;
  post?: PostType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pid = req.query.pid;
  await dbConnect();

  if (req.method == "GET") {
    try {
      const post = await Post.findOne({
        _id: pid,
      });
      res.status(200).json({ success: true, post: post });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method == "PATCH") {
    try {
      const post = await Post.findOne({
        _id: pid,
      });
      post.title = req.body.title;
      post.type = req.body.type;
      post.options = req.body.options;
      post.tags = req.body.tags;
      post.save();

      res.status(200).json({ success: true, post: post });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method == "DELETE") {
    try {
      await Post.deleteOne({ _id: pid });
      res.status(204).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
