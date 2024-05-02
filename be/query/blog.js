// SQL query to get a blog post by its ID
const getBlogByIdQuery = `SELECT * FROM posts WHERE id = $1`;

// SQL query to get all blog posts by user ID
const getBlogsByUserIdQuery = `SELECT * FROM posts WHERE userId = $1`;

// SQL query to get all blog posts
const getAllBlogsQuery = `SELECT * FROM posts`;

// SQL query to create a new blog post
const createBlogQuery = `
  INSERT INTO "posts" 
  (title, body, userId) 
  VALUES ($1, $2, $3) 
  RETURNING *
`;

// SQL query to update a blog post by its ID and user ID
const updateBlogByIdQuery = `
  UPDATE "posts"
  SET title = $1,
      body = $2,
      image = $3
  WHERE id = $4 AND userId = $5
  RETURNING *
`;

// SQL query to delete a blog post by its ID
const deleteBlogByIdQuery = `
  DELETE FROM "posts"
  WHERE id = $1
  RETURNING *
`;

// SQL query to delete a blog post by its title
const deleteBlogByTitleQuery = `
  DELETE FROM "posts"
  WHERE title = $1
  RETURNING *
`;

// Export all SQL queries for use in other modules
module.exports = {
  getBlogByIdQuery,
  getBlogsByUserIdQuery,
  getAllBlogsQuery,
  createBlogQuery,
  updateBlogByIdQuery,
  deleteBlogByIdQuery,
  deleteBlogByTitleQuery,
};
