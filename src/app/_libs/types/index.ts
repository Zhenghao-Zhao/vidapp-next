import { array, number, string, z } from "zod";

const ImageRowSchema = z.object({
  id: number().optional(),
  filename: string(),
  created_at: string().datetime().optional(),
  post_uid: string(),
});

export type ImageRow = z.infer<typeof ImageRowSchema>;

const ProfileSchema = z.object({
  uid: z.string(),
  username: z.string(),
  name: z.string(),
  imageURL: z.string().nullable(),
  post_count: number(),
  follower_count: number(),
  following_count: number(),
  has_followed: z.boolean(),
});

export type Profile = z.infer<typeof ProfileSchema>;

const PostSchema = z.object({
  uid: z.string(),
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  comment_count: z.number(),
  likes_count: z.number(),
  imageURLs: array(z.string()),
  owner: z.object({
    username: z.string(),
    name: z.string(),
    uid: z.string(),
    has_followed: z.boolean(),
    imageURL: z.string().nullable(),
    bioURL: z.string(),
  }),
  has_liked: z.boolean(),
  is_owner: z.boolean(),
});

export type Post = z.infer<typeof PostSchema>;

const postDbSchema = z.object({
  uid: string(),
  created_at: string().datetime().optional(),
  description: string(),
  from_uid: string(),
});

export type PostRow = z.infer<typeof postDbSchema>;

const postPageSchema = z.object({
  posts: array(PostSchema),
  nextCursor: number().optional(),
});

export type PostPage = z.infer<typeof postPageSchema>;

const commentSchema = z.object({
  uid: z.string(),
  created_at: string().datetime(),
  comment: z.string(),
  has_liked: z.boolean(),
  likes_count: z.number(),
  from_user: z.object({
    uid: z.string(),
    username: z.string(),
    name: z.string(),
    imageURL: z.string().nullable(),
  }),
});

export type Comment = z.infer<typeof commentSchema>;

const FriendSchema = z.object({
  uid: z.string(),
  username: z.string(),
  name: z.string(),
  imageURL: z.string(),
  has_followed: z.boolean(),
})

export type Friend = z.infer<typeof FriendSchema>;

export type Friendship = 'followers' | 'following';

export type GuideEntryType = {
  name: string;
  url: string;
  icon?: string;
  image?: string;
};

export type GuideSectionType = {
  title: string;
  collapseSize?: number;
  icon?: string;
  entries: GuideEntryType[];
  isEntriesLoading?: boolean;
};

export type DropdownPosition = {
  left: number;
  top: number;
};

export type PaginatedPosts = {
  nextCursor: number | null,
  posts: Post[]
}