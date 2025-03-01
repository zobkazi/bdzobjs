import { defineEventHandler, readBody, createError } from 'h3'
import prisma from '~/server/utils/prisma'
import { z } from 'zod'

const TagCreateSchema = z.object({
  name: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  try {
    // Read the body of the request
    const body = await readBody(event)

    // Validate input data using the TagCreateSchema
    const validatedData = TagCreateSchema.safeParse(body)

    if (!validatedData.success) {
      throw createError({
        statusCode: 400,
        message: 'Invalid input data',
      })
    }

    const { name } = validatedData.data

    // Check if tag already exists
    const existingTag = await prisma.tag.findUnique({
      where: { name },
    })

    if (existingTag) {
      throw createError({
        statusCode: 400,
        message: `Tag with name '${name}' already exists`,
      })
    }

    // Create a new tag in the database
    const tag = await prisma.tag.create({
      data: { name },
    })

    // Return the created tag as the response
    return { success: true, tag }
  } catch (error) {
    console.error('Tag creation error:', error)
    return createError({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }
})
