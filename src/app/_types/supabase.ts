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
      Images: {
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
            foreignKeyName: "public_Images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["post_id"]
          }
        ]
      }
      Likes: {
        Row: {
          created_at: string
          id: number
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["post_id"]
          }
        ]
      }
      Posts: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: number
          likes_count: number | null
          post_id: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: number
          likes_count?: number | null
          post_id: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: number
          likes_count?: number | null
          post_id?: string
        }
        Relationships: []
      }
      Profiles: {
        Row: {
          created_at: string
          id: number
          profile_image_id: number | null
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          profile_image_id?: number | null
          user_id?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          profile_image_id?: number | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Profiles_profile_image_id_fkey"
            columns: ["profile_image_id"]
            isOneToOne: true
            referencedRelation: "Images"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
