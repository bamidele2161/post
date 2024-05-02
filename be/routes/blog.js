const express = require("express");
const router = express.Router();
const {
  CreatePost,
  GetAllPosts,
  DeletePost,
  UpdatePost,
  GetAPost,
  GetAllPostsByUserId,
} = require("../controller/blog");

router.get("/r", (req, res) => {
  console.log("test");
  return res.status(200).json({
    message: "testing route",
  });
});

router.post("/", CreatePost);
router.get("/", GetAllPosts);
router.get("/user", authMiddleware, GetAllPostsByUserId);
router.get("/:postId", GetAPost);
router.put("/:postId", authMiddleware, UpdatePost);
router.delete("/:postId", authMiddleware, DeletePost);

module.exports = router;
