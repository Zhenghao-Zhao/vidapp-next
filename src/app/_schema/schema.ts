import { array, number, object, string, z } from "zod";

const PhotoSchema = z.object({
  id: number(),
  url: string(),
  alt: string(),
  width: number(),
  height: number(),
  photographer: string(),
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

export const ImageResultSchema = PageSchema.extend({
  photos: array(PhotoSchema),
});

export type Photo = z.infer<typeof PhotoSchema>;
export type ImageResults = z.infer<typeof ImageResultSchema>;
