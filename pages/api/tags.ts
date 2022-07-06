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
      const tags = await Post.distinct("tags");
      res.status(201).json({ success: true, tags: tags });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
