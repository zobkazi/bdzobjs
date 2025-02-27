import { defineEventHandler, getQuery } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get total count of posts
    const totalPosts = await prisma.post.count();

    // Fetch posts with pagination
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Calculate next/previous page links
    const hasNextPage = skip + limit < totalPosts;
    const hasPrevPage = page > 1;

    return {
      success: true,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      nextPage: hasNextPage ? `/api/post/getAll?page=${page + 1}&limit=${limit}` : null,
      prevPage: hasPrevPage ? `/api/post/getAll?page=${page - 1}&limit=${limit}` : null,
      posts,
    };
  } catch (error) {
    if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      // Handle non-Error objects
      return { success: false, error: 'An unknown error occurred' };
    }
});
