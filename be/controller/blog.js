const { createBlog, getPosts } = require("../service/blog");
const { validateInput } = require("../util");

exports.CreatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!validateInput(title, "length", 3, 100)) {
      throw new BadRequest("Your title must be between 3 and 30 characters.");
    }
    const userId = req.user.id;

    const values = [title, body, userId];
    const post = await createBlog(values);

    return res.status(post.statusCode).json({
      message: post.message,
      data: post.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAllPosts = async (req, res) => {
  try {
    const posts = await getPosts();
    return res.status(posts.statusCode).json({
      message: posts.message,
      data: posts.data,
    });
  } catch (error) {
    next(error);
  }
};
