import { defineEventHandler, getRouterParam } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) throw new Error('Project ID is required');

    await prisma.project.delete({
      where: { id },
    });

    return { success: true, message: 'Project deleted successfully' };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Delete failed' };
  }
});
