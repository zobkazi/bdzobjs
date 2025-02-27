import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Get request body
  const { username, email, password } = body;

  if (!username || !email || !password) {
    throw createError({ statusCode: 400, message: "All fields are required" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simulated DB (replace with Prisma or MongoDB later)
  const user = { id: Date.now(), username, email, password: hashedPassword };

  return { message: "User registered successfully", user };
});
