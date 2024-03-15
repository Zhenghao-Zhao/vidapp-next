import { Post } from "@/app/_schema";

export type Pages = {
  [key: string | number]: Post[];
};