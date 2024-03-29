import { array, number, object, string, z } from "zod";

const PhotoSchema = z.object({
  id: number(),
  url: string(),
  alt: string(),
  width: number(),
  height: number(),
  photographer: string().nullable(),
  src: object({
    original: string(),
    large: string(),
    medium: string(),
    small: string(),
  }),
});

const PageSchema = z.object({
  page: number(),
  per_page: number(),
  prev_page: string().optional(),
  next_page: string().optional(),
  total_results: number(),
});

export const PhotoResultSchema = PageSchema.extend({
  photos: array(PhotoSchema),
});

const ImageSchema = z.object({
  filename: string(),
});

export type DbImage = z.infer<typeof ImageSchema>;
export type Photo = z.infer<typeof PhotoSchema>;
export type ImageResults = z.infer<typeof PhotoResultSchema>;

const ImageRowSchema = z.object({
  id: number().optional(),
  filename: string(),
  created_at: string().datetime().optional(),
  post_id: string(),
});

export type ImageRow = z.infer<typeof ImageRowSchema>;

const PublicProfileSchema = z.object({
  username: z.string(),
  name: z.string(),
  imageURL: z.string().nullable(),
  image_filename: z.string().nullable(),
  post_count: number(),
});

export type Profile = z.infer<typeof PublicProfileSchema>;

const PostSchema = z.object({
  id: z.string(),
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  likes_count: z.number(),
  imageURLs: array(z.string()),
  owner: PublicProfileSchema,
  has_liked: z.boolean(),
});

export type Post = z.infer<typeof PostSchema>;

const postDbSchema = z.object({
  post_id: string(),
  created_at: string().datetime().optional(),
  description: string(),
  likes_count: number(),
  username: string(),
});

export type PostRow = z.infer<typeof postDbSchema>;

const postPageSchema = z.object({
  posts: array(PostSchema),
  nextCursor: number().optional()
})

export type PostPage = z.infer<typeof postPageSchema>;
