import { defineEventHandler, readBody, createError, getHeader } from "h3"
import prisma from "~/server/utils/prisma"
import { z } from "zod"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  published: z.boolean().optional().default(false),
})

export default defineEventHandler(async (event) => {
  try {
    // const body = await readBody(event)
    // const validatedData = postSchema.parse(body)

    console.log("Request received");
    const body = await readBody(event);
    console.log("Body:", body);
    const validatedData = postSchema.parse(body);
    console.log("Validated Data:", validatedData);

    // Extract and verify JWT from Authorization header
    const authHeader = getHeader(event, "authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]
    let decoded

    try {
      decoded = jwt.verify(token, SECRET_KEY)
      if (!decoded || typeof decoded !== "object" || !decoded.userId) {
        throw new Error("Invalid token payload")
      }
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError)
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid or expired token",
      })
    }

    // Check if post already exists
    const existingPost = await prisma.post.findMany({
      where: { slug: validatedData.slug, content: validatedData.content },
    })

    if (existingPost) {
      throw createError({
        statusCode: 400,
        statusMessage: "Post with this slug already exists",
      })
    }

    // Set authorId from the decoded token
    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        published: validatedData.published,
        authorId: decoded.userId,
      },
    })

    return { success: true, post }
  } catch (error) {
    console.error("Blog creation error:", error)

  }
})

