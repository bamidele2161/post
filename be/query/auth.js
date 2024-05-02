// SQL query to check if a user with a specific email exists
const checkUserByEmailQuery = `SELECT * FROM users WHERE email = $1`;

// SQL query to check if a user with a specific reset code and email exists
const checkUserByResetCodeQuery = `SELECT * FROM users WHERE ressetcode = $1 AND email = $2`;

// SQL query to check if a user with a specific ID exists
const checkUserByIdQuery = `SELECT * FROM users WHERE id = $1`;

// SQL query to create a new user
const createUserQuery = `
  INSERT INTO "users" (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4)
  RETURNING *
`;

// SQL query to update user's reset code and password by ID
const updateUserCodeByIdQuery = `
  UPDATE "users"
  SET ressetcode = null,
  password = $1
  WHERE id = $2 
  RETURNING *
`;

// SQL query to update user's reset code by ID
const updateUserResetCodeByIdQuery = `
  UPDATE "users"
  SET ressetcode = $1
  WHERE id = $2 
  RETURNING *
`;

// SQL query to delete a user by email
const deleteUserByEmailQuery = `
  DELETE FROM "users"
  WHERE email = $1
  RETURNING *
`;

// Export all SQL queries for use in other modules
module.exports = {
  checkUserByEmailQuery,
  checkUserByResetCodeQuery,
  checkUserByIdQuery,
  createUserQuery,
  updateUserCodeByIdQuery,
  updateUserResetCodeByIdQuery,
  deleteUserByEmailQuery,
};
