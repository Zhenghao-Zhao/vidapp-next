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
      followers: {
        Row: {
          created_at: string
          follower_username: string
          id: number
          owner_username: string
        }
        Insert: {
          created_at?: string
          follower_username: string
          id?: number
          owner_username: string
        }
        Update: {
          created_at?: string
          follower_username?: string
          id?: number
          owner_username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_followers_follower_username_fkey"
            columns: ["follower_username"]
            isOneToOne: false
            referencedRelation: "profile_view"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "public_followers_follower_username_fkey"
            columns: ["follower_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "public_followers_owner_username_fkey"
            columns: ["owner_username"]
            isOneToOne: false
            referencedRelation: "profile_view"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "public_followers_owner_username_fkey"
            columns: ["owner_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string
          filename: string
          id: number
          post_id: string | null
        }
        Insert: {
          created_at?: string
          filename: string
          id?: number
          post_id?: string | null
        }
        Update: {
          created_at?: string
          filename?: string
          id?: number
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          from_username: string
          id: number
          post_id: string
        }
        Insert: {
          created_at?: string
          from_username: string
          id?: number
          post_id: string
        }
        Update: {
          created_at?: string
          from_username?: string
          id?: number
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_likes_from_username_fkey"
            columns: ["from_username"]
            isOneToOne: false
            referencedRelation: "profile_view"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "public_likes_from_username_fkey"
            columns: ["from_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "public_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      posts: {
        Row: {
          created_at: string
          description: string | null
          id: number
          post_id: string
          username: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          post_id: string
          username: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          post_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_username_fkey"
            columns: ["username"]
            isOneToOne: false
            referencedRelation: "profile_view"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "public_posts_username_fkey"
            columns: ["username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: number
          image_filename: string | null
          name: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_filename?: string | null
          name: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          image_filename?: string | null
          name?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      profile_view: {
        Row: {
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_paginated_user_posts: {
        Args: {
          arg_username: string
          arg_from: number
          arg_to: number
        }
        Returns: {
          ret_post_id: string
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
      get_user_profile: {
        Args: {
          arg_username: string
        }
        Returns: Record<string, unknown>
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
