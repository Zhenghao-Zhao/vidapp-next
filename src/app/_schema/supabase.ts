export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string
          created_at: string
          from_uid: string
          id: number
          likes_count: number
          post_uid: string
          uid: string
        }
        Insert: {
          comment: string
          created_at?: string
          from_uid: string
          id?: number
          likes_count?: number
          post_uid: string
          uid?: string
        }
        Update: {
          comment?: string
          created_at?: string
          from_uid?: string
          id?: number
          likes_count?: number
          post_uid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_comments_from_uid_fkey"
            columns: ["from_uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "public_comments_post_id_fkey"
            columns: ["post_uid"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["uid"]
          },
        ]
      }
      followers: {
        Row: {
          created_at: string
          follower_uid: string
          id: number
          owner_uid: string
        }
        Insert: {
          created_at?: string
          follower_uid: string
          id?: number
          owner_uid?: string
        }
        Update: {
          created_at?: string
          follower_uid?: string
          id?: number
          owner_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_followers_follower_uid_fkey"
            columns: ["follower_uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "public_followers_owner_uid_fkey"
            columns: ["owner_uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string
          filename: string
          id: number
          post_uid: string | null
        }
        Insert: {
          created_at?: string
          filename: string
          id?: number
          post_uid?: string | null
        }
        Update: {
          created_at?: string
          filename?: string
          id?: number
          post_uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_images_post_id_fkey"
            columns: ["post_uid"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["uid"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          from_uid: string
          id: number
          post_uid: string
        }
        Insert: {
          created_at?: string
          from_uid?: string
          id?: number
          post_uid: string
        }
        Update: {
          created_at?: string
          from_uid?: string
          id?: number
          post_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_likes_from_uid_fkey"
            columns: ["from_uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "public_likes_post_id_fkey"
            columns: ["post_uid"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["uid"]
          },
        ]
      }
      posts: {
        Row: {
          created_at: string
          description: string | null
          from_uid: string
          id: number
          uid: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          from_uid?: string
          id?: number
          uid: string
        }
        Update: {
          created_at?: string
          description?: string | null
          from_uid?: string
          id?: number
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_from_uid_fkey"
            columns: ["from_uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: number
          image_filename: string | null
          name: string
          uid: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_filename?: string | null
          name: string
          uid?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          image_filename?: string | null
          name?: string
          uid?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_user_id_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_paginated_post_comments: {
        Args: {
          arg_post_uid: string
          arg_from_uid: string
          arg_from: number
          arg_limit: number
        }
        Returns: {
          ret_created_at: string
          ret_username: string
          ret_name: string
          ret_profile_image: string
          ret_profile_uid: string
          ret_comment: string
          ret_comment_uid: string
        }[]
      }
      get_paginated_user_followers: {
        Args: {
          arg_uid: string
          arg_from: number
          arg_limit: number
        }
        Returns: {
          ret_username: string
          ret_name: string
          ret_profile_image: string
        }[]
      }
      get_paginated_user_following: {
        Args: {
          arg_uid: string
          arg_from: number
          arg_limit: number
        }
        Returns: {
          ret_uid: string
          ret_username: string
          ret_name: string
          ret_profile_image: string
        }[]
      }
      get_paginated_user_posts: {
        Args: {
          arg_uid: string
          arg_from_uid: string
          arg_from: number
          arg_limit: number
        }
        Returns: {
          ret_uid: string
          ret_created_at: string
          ret_description: string
          ret_username: string
          ret_name: string
          ret_profile_image: string
          ret_likes_count: number
          ret_has_liked: boolean
          ret_post_images: string[]
        }[]
      }
      get_test_comments: {
        Args: {
          arg_from_uid: string
        }
        Returns: {
          rtn_id: number
          rtn_from_uid: string
          rtn_created_at: string
        }[]
      }
      get_user_profile: {
        Args: {
          arg_username: string
          arg_from_uid: string
        }
        Returns: {
          ret_username: string
          ret_name: string
          ret_profile_image: string
          ret_uid: string
          ret_follower_count: number
          ret_following_count: number
          ret_post_count: number
          ret_has_followed: boolean
        }[]
      }
      query_following: {
        Args: {
          arg_uid: string
          arg_query: string
        }
        Returns: {
          ret_uid: string
          ret_username: string
          ret_name: string
          ret_profile_image: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
