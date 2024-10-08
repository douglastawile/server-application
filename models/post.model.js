import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      minlength: [4, "Title should not be less than 4 letters."],
      maxlength: [100, "Title should not be more than 100 letters."],
    },
    content: {
      type: String,
      required: [true, "Conte0nt is required."],
      trim: true,
      minlength: [4, "Content should not be less than 4 letters."],
      maxlength: [2000, "Content should not be more than 2000 letters."],
    },
    author: {
      type: String,
      required: [true, "Author is required."],
      trim: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
