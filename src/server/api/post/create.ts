import { defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import prisma from '~/server/utils/prisma';

const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  authorId: z.string(),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = postSchema.parse(body);

    const newPost = await prisma.post.create({
      data: validatedData,
    });

    return { success: true, post: newPost };
  } catch (error) {
    return { success: false, error: error instanceof z.ZodError };
  }
});
