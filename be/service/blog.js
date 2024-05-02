const { dbPool } = require("../config/dbConnection");
const { createBlogQuery, getBlogsByUserIdQuery } = require("../query/blog");

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
    const getAllPost = await connectionPool.query(getBlogs);

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
module.exports = {
  createBlog,
  getPosts,
};
