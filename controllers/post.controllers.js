import Post from "../models/post.model.js";

const postByID = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    req.post = post;
    next();
  } catch (error) {
    console.error(error);
    next(error);
    return res.status(400).json({ error: "Could not retrieve post." });
  }
};

const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newPost = new Post({ title, content, author });

  try {
    await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = req.post;
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.post._id, req.body, {new: true, runValidators: true});
    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.post._id);
    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

export default {
  postByID,
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
