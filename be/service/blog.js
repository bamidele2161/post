const { dbPool } = require("../config/dbConnection");
const {
  createBlogQuery,
  getBlogsByUserIdQuery,
  deleteBlogByIdQuery,
  getBlogByIdQuery,
  updateBlogByIdQuery,
  getAllBlogsQuery,
} = require("../query/blog");
const { NotFound } = require("../util/requestError");

const createBlog = async (values) => {
  try {
    const checkUserExistence = await dbPool.query(getBlogsByUserIdQuery, [
      values[2],
    ]);

    if (!checkUserExistence.rowCount === 1) {
      throw new NotFound("User does not exist!");
    }

    const createBlog = await dbPool.query(createBlogQuery, values);

    if (!createBlog) {
      throw new BadRequest("Error occured while creating post");
    }

    return {
      message: "Post created successfully",
      data: createBlog.rows[0],
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const getPosts = async () => {
  try {
    const getAllPost = await dbPool.query(getAllBlogsQuery);

    if (getAllPost.rowCount < 1) {
      throw new NotFound("No record found");
    }
    return {
      message: "Posts fetched successfully",
      data: getAllPost.rows,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};
const getPost = async (postId) => {
  try {
    const post = await dbPool.query(getBlogByIdQuery, [postId]);

    if (post.rowCount < 1) {
      throw new NotFound("No record found");
    }
    return {
      message: "Post fetched successfully",
      data: post.rows,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const getPostsByUserId = async (userId) => {
  try {
    const posts = await dbPool.query(getBlogsByUserIdQuery, [userId]);

    if (posts.rowCount < 1) {
      throw new NotFound("No record found");
    }
    return {
      message: "Posts fetched successfully",
      data: posts.rows,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const updatePost = async (payload) => {
  try {
    const checkUserExistence = await dbPool.query(getBlogsByUserIdQuery, [
      payload[4],
    ]);

    if (!checkUserExistence.rowCount === 1) {
      throw new NotFound("User does not exist");
    }

    const updatePost = await dbPool.query(updateBlogByIdQuery, payload);

    if (!updatePost) {
      throw new BadRequest("Error occured while updating post");
    }

    return {
      message: "Post updated successfully",
      data: updatePost.rows[0],
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const deletePost = async (userId, postId) => {
  try {
    const checkUserExistence = await dbPool.query(getBlogsByUserIdQuery, [
      userId,
    ]);

    if (!checkUserExistence.rowCount === 1) {
      throw new NotFound("User does not exist");
    }

    const deletePost = await dbPool.query(deleteBlogByIdQuery, [postId]);

    if (!deletePost) {
      throw new BadRequest("Error occured while deleting post");
    }
    return {
      message: "Post deleted successfully",
      statusCode: 200,
    };
  } catch (error) {
    throw err;
  }
};
module.exports = {
  createBlog,
  getPosts,
  getPost,
  getPostsByUserId,
  updatePost,
  deletePost,
};
