import { defineEventHandler, getQuery } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    // Extract query parameters
    const { page = 1, limit = 10, search = '', techStack = '', startDate, endDate } = getQuery(event);

    // Parse page and limit as integers
    const pageInt = parseInt(page as string);
    const limitInt = parseInt(limit as string);

    // Calculate offset for pagination
    const skip = (pageInt - 1) * limitInt;

    // Build the filter conditions
    const whereConditions: any = {};

    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (techStack) {
      whereConditions.techStack = { has: techStack };
    }

    if (startDate && endDate) {
      whereConditions.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    // Fetch the projects with pagination, filters, and search
    const [projects, totalCount] = await prisma.$transaction([
      prisma.project.findMany({
        where: whereConditions,
        skip,
        take: limitInt,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count({ where: whereConditions }), // Count the total number of projects
    ]);

    return {
      success: true,
      projects,
      totalCount,
      totalPages: Math.ceil(totalCount / limitInt),
      currentPage: pageInt,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch projects' };
  }
});
