// SQL query to get a blog post by its ID
const getBlogByIdQuery = `SELECT * FROM post WHERE id = $1`;

// SQL query to get all blog post by user ID
const getBlogsByUserIdQuery = `SELECT * FROM post WHERE userId = $1`;

// SQL query to get all blog post
const getAllBlogsQuery = `SELECT * FROM post`;

// SQL query to create a new blog post
const createBlogQuery = `
  INSERT INTO "post" 
  (title, body, userId) 
  VALUES ($1, $2, $3) 
  RETURNING *
`;

// SQL query to update a blog post by its ID and user ID
const updateBlogByIdQuery = `
  UPDATE "post"
  SET title = $1,
      body = $2
  WHERE id = $3 AND userId = $4
  RETURNING *
`;

// SQL query to delete a blog post by its ID
const deleteBlogByIdQuery = `
  DELETE FROM "post"
  WHERE id = $1
  RETURNING *
`;

// SQL query to delete a blog post by its title
const deleteBlogByTitleQuery = `
  DELETE FROM "post"
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
