import { Knex } from 'knex'
import { Task } from './tasks'
import { Tag } from './tags'

declare module 'knex/types/tables' {
  export interface Tables {
    tasks: Task
    tags: Tag
  }
}
