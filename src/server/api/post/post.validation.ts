import z from 'zod'

export const postSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    slug: z.string().min(3, 'Slug must be at least 3 characters long'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    authorId: z.string(),
  });



  export const updatePostSchema = z.object({
    id: z.string(),
    title: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
    published: z.boolean().optional(),
  });