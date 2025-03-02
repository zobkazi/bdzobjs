import { defineEventHandler, readBody } from 'h3';
import prisma from '~/server/utils/prisma';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  url: z.string().url().optional(),
  image: z.string().url().optional(),
  github: z.string().url().optional(),
  techStack: z.array(z.string()).min(1, 'At least one technology is required'),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = projectSchema.safeParse(body);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.errors,
      };
    }

    // Check if project already exists
    const existingProject = await prisma.project.findFirst({
      where: {
        title: validatedData.data.title,
        description: validatedData.data.description,
      },
    });

    if (existingProject) {
      return {
        success: false,
        message: 'Project already exists',
      };
    }

    // Create new project
    const newProject = await prisma.project.create({
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        url: validatedData.data.url,
        image: validatedData.data.image,
        github: validatedData.data.github,
        techStack: validatedData.data.techStack,
      }
    });

    return {
      success: true,
      project: newProject,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});
