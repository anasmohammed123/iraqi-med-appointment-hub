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
      appointments: {
        Row: {
          appointment_date: string
          consultation_type: string | null
          created_at: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string | null
          status: string | null
        }
        Insert: {
          appointment_date: string
          consultation_type?: string | null
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          status?: string | null
        }
        Update: {
          appointment_date?: string
          consultation_type?: string | null
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          count: number | null
          id: string
          name: string
          name_ar: string
        }
        Insert: {
          count?: number | null
          id?: string
          name: string
          name_ar: string
        }
        Update: {
          count?: number | null
          id?: string
          name?: string
          name_ar?: string
        }
        Relationships: []
      }
      cosmetic_center_images: {
        Row: {
          center_id: string | null
          id: string
          image_url: string
        }
        Insert: {
          center_id?: string | null
          id?: string
          image_url: string
        }
        Update: {
          center_id?: string | null
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "cosmetic_center_images_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "cosmetic_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      cosmetic_centers: {
        Row: {
          address: string | null
          address_ar: string | null
          city_id: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          email: string | null
          id: string
          name: string
          name_ar: string
          phone: string | null
          rating: number | null
          website: string | null
        }
        Insert: {
          address?: string | null
          address_ar?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          email?: string | null
          id?: string
          name: string
          name_ar: string
          phone?: string | null
          rating?: number | null
          website?: string | null
        }
        Update: {
          address?: string | null
          address_ar?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          email?: string | null
          id?: string
          name?: string
          name_ar?: string
          phone?: string | null
          rating?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cosmetic_centers_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_consultation_types: {
        Row: {
          doctor_id: string | null
          id: string
          type: string
        }
        Insert: {
          doctor_id?: string | null
          id?: string
          type: string
        }
        Update: {
          doctor_id?: string | null
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_consultation_types_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_education: {
        Row: {
          degree: string
          doctor_id: string | null
          id: string
          institution: string
          year: number | null
        }
        Insert: {
          degree: string
          doctor_id?: string | null
          id?: string
          institution: string
          year?: number | null
        }
        Update: {
          degree?: string
          doctor_id?: string | null
          id?: string
          institution?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "doctor_education_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_languages: {
        Row: {
          doctor_id: string | null
          id: string
          language: string
        }
        Insert: {
          doctor_id?: string | null
          id?: string
          language: string
        }
        Update: {
          doctor_id?: string | null
          id?: string
          language?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_languages_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          address: string | null
          address_ar: string | null
          available_days: string[] | null
          bio: string | null
          bio_ar: string | null
          city_id: string | null
          created_at: string | null
          email: string | null
          experience: number | null
          hospital_id: string | null
          id: string
          image: string | null
          name: string
          name_ar: string
          phone: string | null
          price: number | null
          rating: number | null
          review_count: number | null
          specialty_id: string | null
        }
        Insert: {
          address?: string | null
          address_ar?: string | null
          available_days?: string[] | null
          bio?: string | null
          bio_ar?: string | null
          city_id?: string | null
          created_at?: string | null
          email?: string | null
          experience?: number | null
          hospital_id?: string | null
          id?: string
          image?: string | null
          name: string
          name_ar: string
          phone?: string | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          specialty_id?: string | null
        }
        Update: {
          address?: string | null
          address_ar?: string | null
          available_days?: string[] | null
          bio?: string | null
          bio_ar?: string | null
          city_id?: string | null
          created_at?: string | null
          email?: string | null
          experience?: number | null
          hospital_id?: string | null
          id?: string
          image?: string | null
          name?: string
          name_ar?: string
          phone?: string | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          specialty_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctors_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      home_service_requests: {
        Row: {
          address: string
          created_at: string | null
          id: string
          notes: string | null
          schedule_date: string
          service_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: string
          notes?: string | null
          schedule_date: string
          service_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          schedule_date?: string
          service_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "home_service_requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "home_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "home_service_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      home_services: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          duration: string | null
          id: string
          image: string | null
          name: string
          name_ar: string
          price: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          duration?: string | null
          id?: string
          image?: string | null
          name: string
          name_ar: string
          price?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          duration?: string | null
          id?: string
          image?: string | null
          name?: string
          name_ar?: string
          price?: number | null
        }
        Relationships: []
      }
      hospital_images: {
        Row: {
          hospital_id: string | null
          id: string
          image_url: string
        }
        Insert: {
          hospital_id?: string | null
          id?: string
          image_url: string
        }
        Update: {
          hospital_id?: string | null
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_images_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string | null
          address_ar: string | null
          city_id: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          email: string | null
          id: string
          name: string
          name_ar: string
          phone: string | null
          rating: number | null
          website: string | null
        }
        Insert: {
          address?: string | null
          address_ar?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          email?: string | null
          id?: string
          name: string
          name_ar: string
          phone?: string | null
          rating?: number | null
          website?: string | null
        }
        Update: {
          address?: string | null
          address_ar?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          email?: string | null
          id?: string
          name?: string
          name_ar?: string
          phone?: string | null
          rating?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospitals_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          dosage: string | null
          id: string
          image: string | null
          in_stock: boolean | null
          manufacturer: string | null
          name: string
          name_ar: string
          price: number | null
          requires_prescription: boolean | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          dosage?: string | null
          id?: string
          image?: string | null
          in_stock?: boolean | null
          manufacturer?: string | null
          name: string
          name_ar: string
          price?: number | null
          requires_prescription?: boolean | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          dosage?: string | null
          id?: string
          image?: string | null
          in_stock?: boolean | null
          manufacturer?: string | null
          name?: string
          name_ar?: string
          price?: number | null
          requires_prescription?: boolean | null
        }
        Relationships: []
      }
      pharmacy_requests: {
        Row: {
          address: string
          created_at: string | null
          id: string
          medicine_name: string
          notes: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: string
          medicine_name: string
          notes?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: string
          medicine_name?: string
          notes?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_items: {
        Row: {
          dosage: string | null
          id: string
          instructions: string | null
          medication_id: string | null
          prescription_id: string | null
          quantity: number | null
        }
        Insert: {
          dosage?: string | null
          id?: string
          instructions?: string | null
          medication_id?: string | null
          prescription_id?: string | null
          quantity?: number | null
        }
        Update: {
          dosage?: string | null
          id?: string
          instructions?: string | null
          medication_id?: string | null
          prescription_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prescription_items_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescription_items_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          doctor_id: string | null
          id: string
          image_url: string | null
          notes: string | null
          patient_id: string | null
          prescription_date: string | null
          status: string | null
        }
        Insert: {
          doctor_id?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          patient_id?: string | null
          prescription_date?: string | null
          status?: string | null
        }
        Update: {
          doctor_id?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          patient_id?: string | null
          prescription_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city_id: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          city_id?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          city_id?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      promos: {
        Row: {
          code: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          discount_percentage: number | null
          end_date: string | null
          id: string
          image: string | null
          is_active: boolean | null
          start_date: string | null
          title: string
          title_ar: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          start_date?: string | null
          title: string
          title_ar: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          start_date?: string | null
          title?: string
          title_ar?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          cosmetic_center_id: string | null
          created_at: string | null
          doctor_id: string | null
          hospital_id: string | null
          id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          cosmetic_center_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          hospital_id?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          cosmetic_center_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          hospital_id?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_cosmetic_center_id_fkey"
            columns: ["cosmetic_center_id"]
            isOneToOne: false
            referencedRelation: "cosmetic_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      specialties: {
        Row: {
          count: number | null
          icon: string | null
          id: string
          name: string
          name_ar: string
        }
        Insert: {
          count?: number | null
          icon?: string | null
          id?: string
          name: string
          name_ar: string
        }
        Update: {
          count?: number | null
          icon?: string | null
          id?: string
          name?: string
          name_ar?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
