export interface User {
  id: string
  email: string
  full_name: string
  birth_date: string
  created_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description: string
  category: 'professional' | 'financial' | 'health' | 'spiritual' | 'relationships' | 'personal'
  status: 'active' | 'completed' | 'archived'
  target_date?: string
  progress: number
  created_at: string
}

export interface Dream {
  id: string
  user_id: string
  title: string
  description: string
  estimated_cost?: number
  target_date?: string
  status: 'dreaming' | 'planning' | 'in_progress' | 'achieved'
  created_at: string
}

export interface Activity {
  id: string
  user_id: string
  title: string
  description: string
  category: 'learning' | 'recreation' | 'development' | 'routine'
  frequency?: string
  created_at: string
}

export interface FinancialRecord {
  id: string
  user_id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  category: string
  read: boolean
  created_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  theme: 'light' | 'dark' | 'system'
  accent_color: string
  background_image?: string
  icon_style: 'rounded' | 'sharp' | 'minimal'
  notifications_enabled: boolean
}
