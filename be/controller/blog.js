const {
  createBlog,
  getPosts,
  deletePost,
  getPost,
  getPostsByUserId,
  updatePost,
} = require("../service/blog");
const { validateInput } = require("../util");

exports.CreatePost = async (req, res, next) => {
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
      statusCode: post.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAllPosts = async (req, res, next) => {
  try {
    const posts = await getPosts();
    return res.status(posts.statusCode).json({
      message: posts.message,
      data: posts.data,
      statusCode: posts.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await getPost(postId);
    return res.status(post.statusCode).json({
      message: post.message,
      data: post.data,
      statusCode: post.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAllPostsByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const posts = await getPostsByUserId(userId);
    return res.status(posts.statusCode).json({
      message: posts.message,
      data: posts.data,
      statusCode: posts.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.UpdatePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const { title, body } = req.body;

    const values = [title, body, postId, userId];

    const modifyPost = await updatePost(values);
    return res.status(modifyPost.statusCode).json({
      message: modifyPost.message,
      data: modifyPost.data,
      statusCode: modifyPost.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.DeletePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const removePost = await deletePost(userId, postId);

    return res.status(removePost.statusCode).json({
      message: removePost.message,
      statusCode: removePost.statusCode,
    });
  } catch (error) {
    next(error);
  }
};
