import { defineEventHandler, readBody, getRouterParam } from 'h3';
import prisma from '~/server/utils/prisma';
import { z } from 'zod';

const projectUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  url: z.string().url().optional(),
  image: z.string().url().optional(),
  github: z.string().url().optional(),
  techStack: z.array(z.string()).min(1).optional(),
});

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) throw new Error('Project ID is required');

    const body = await readBody(event);
    const validatedData = projectUpdateSchema.parse(body);

    const updatedProject = await prisma.project.update({
      where: { id },
      data: validatedData,
    });

    return { success: true, project: updatedProject };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Update failed' };
  }
});
