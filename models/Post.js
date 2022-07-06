import ObjectID from "bson-objectid";
import mongoose from "mongoose";
import { Schema } from "mongoose";

/* PostSchema will correspond to a collection in your MongoDB database. */
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for this post."],
    // maxlength: [60, "Name cannot be more than 60 characters"],
  },
  type: {
    type: String,
    required: [true, "Please provide a type for this post."],
    enum: ["image", "text"],
  },
  // text: {
  //   type: String,
  //   maxlength: [60, "Name cannot be more than 60 characters"],
  // },
  options: [
    {
      caption: String,
      imageUrl: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  votes: [
    {
      uid: Schema.Types.ObjectId,
      createdAt: { type: Date, default: Date.now },
      selectedIndex: Number,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  uid: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide a uid for this post."],
    default: () => {
      ObjectID();
    },
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
