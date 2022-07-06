import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  if (req.method == "PATCH") {
    const pid = req.query.pid;
    const uid = req.body.uid;

    try {
      const post = await Post.findOne({
        _id: pid,
      });
      const voteByOthers = post.votes.filter((vote) => vote.uid != uid);
      if (req.body.action == "vote") {
        post.votes = [...voteByOthers, req.body];
      } else if (req.body.action == "unvote") {
        post.votes = voteByOthers;
      }
      post.save();

      res.status(201).json({ success: true, post: post });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
