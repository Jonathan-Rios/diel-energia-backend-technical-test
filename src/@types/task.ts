import { Tag } from './tag'

export interface Task {
  id: string
  title: string
  description: string
  due_at: string
  duration_minutes: number
  created_at: string
  updated_at?: string
  deleted_at?: string
  tag_id?: string
  tag_name?: string
  tag_color?: string
}

export interface TaskTags {
  id: string
  title: string
  description: string
  dueAt: string
  durationMinutes: number
  createdAt: string
  updatedAt?: string
  deletedAt?: string
  tags: Tag[]
}
