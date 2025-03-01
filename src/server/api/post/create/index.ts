import { defineEventHandler, readBody, createError, getHeader } from "h3"
import prisma from "~/server/utils/prisma"
import {CreatePostSchema} from './post.schema'



export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = CreatePostSchema.safeParse(body)
    if (!validatedData.success) {
      throw createError({ statusCode: 400, message: "Invalid input" })
    }

 // check post already exist
    

    const existingPost = await prisma.post.findUnique({
      where: { slug: validatedData.data.slug }
    })
    if (existingPost) {
      throw createError({ statusCode: 400, statusMessage: "Post with this slug already exists" })
    }

    const post = await prisma.post.create({
      data: {
        ...validatedData.data,
    }
    })
    
    
    return { success: true, post }
  } catch (error) {
    console.error("Error occurred:", error) 
    return createError({
      
      statusCode: 500,

      statusMessage: "Internal Server Error",
    })
  }
})
