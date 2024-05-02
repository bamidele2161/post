const express = require("express");
const router = express.Router();
const { CreatePost, GetAllPosts } = require("../controller/blog");

router.get("/r", (req, res) => {
  console.log("test");
  return res.status(200).json({
    message: "testing route",
  });
});

router.post("/", CreatePost);
router.get("/", GetAllPosts);

module.exports = router;
