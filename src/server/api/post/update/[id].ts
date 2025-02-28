// src/server/api/post/update/[id].ts
import { defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import prisma from '~/server/utils/prisma';

const updatePostSchema = z.object({
  id: z.string(),
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  published: z.boolean().optional(),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = updatePostSchema.parse(body);

    const { id, ...updateData } = validatedData;

    if (Object.keys(updateData).length === 0) {
      return { success: false, error: 'No fields to update provided.' };
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return { success: true, post: updatedPost };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(err => err.message).join(', ') };
    }

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: 'An unknown error occurred' };
  }
});
