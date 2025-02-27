import { defineEventHandler, getQuery } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { id } = query;

    if (!id) {
      throw new Error('Post ID is required');
    }

    await prisma.post.delete({
      where: { id: String(id) },
    });

    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    // Handle non-Error objects
    return { success: false, error: 'An unknown error occurred' };
  }
});
