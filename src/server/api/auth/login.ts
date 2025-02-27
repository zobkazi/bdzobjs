import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Change this for production

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({ statusCode: 400, message: "All fields are required" });
  }

  // Simulated user (replace with real DB query)
  const user = {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: "$2a$10$somethinghashed", // Replace with actual hash from DB
  };

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createError({ statusCode: 401, message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return { message: "Login successful", token };
});
