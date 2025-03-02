import { defineEventHandler, getRouterParam } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) throw new Error('Project ID is required');

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) throw new Error('Project not found');

    return { success: true, project };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Invalid request' };
  }
});
