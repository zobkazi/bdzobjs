
import { defineEventHandler, getQuery } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { slug } = query;

    if (!slug) {
      throw new Error('Slug is required');
    }

    const post = await prisma.post.findUnique({
      where: { slug: String(slug) },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return { success: true, post };
  } catch (error) {
    if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      // Handle non-Error objects
      return { success: false, error: 'An unknown error occurred' };
    }  

});
