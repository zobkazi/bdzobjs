import { defineEventHandler, getRouterParam } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    // Get post ID from the route parameters
    const id = getRouterParam(event, 'id');

    if (!id) {
      return { success: false, error: 'Post ID is required' };
    }

    // Fetch the post by ID
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return { success: false, error: 'Post not found' };
    }

    return { success: true, post };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
});
