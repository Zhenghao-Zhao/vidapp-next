export type AssortedPost = {
  description: string;
  likes_count: string;
  Images: string[];
};

export type Pages = {
  [key: string | number]: AssortedPost[];
};