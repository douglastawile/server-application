import express from "express";
import postControllers from "../controllers/post.controllers.js";

const router = express.Router();

router.get("/", postControllers.getAllPosts);

router.post("/create", postControllers.createPost);

router
  .route("/:postId")
  .get(postControllers.getSinglePost)
  .put(postControllers.updatePost)
  .delete(postControllers.deletePost);

router.param("postId", postControllers.postByID);

export default router
