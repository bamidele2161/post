const {
  createBlog,
  getPosts,
  deletePost,
  getPost,
} = require("../service/blog");
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

exports.GetAPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await getPost(postId);
    return res.status(post.statusCode).json({
      message: post.message,
      data: post.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAllPostsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await getPost(userId);
    return res.status(posts.statusCode).json({
      message: posts.message,
      data: posts.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.UpdatePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const { title, body, image } = req.body;

    const values = [title, body, image, postId, userId];

    const modifyPost = await updatePost(values);
    return res.status(modifyPost.statusCode).json({
      message: modifyPost.message,
      data: modifyPost.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured!",
    });
  }
};

exports.DeletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const removePost = await deletePost(userId, postId);

    return res.status(removePost.statusCode).json({
      message: removePost.message,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured!",
    });
  }
};
