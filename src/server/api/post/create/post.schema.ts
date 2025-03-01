import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  content: z.string().min(10),
  ThumbnailUrl: z.string().optional(),
  published: z.boolean().optional().default(false),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
