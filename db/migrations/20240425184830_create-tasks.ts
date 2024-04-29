import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.text('description').notNullable()
    table.timestamp('due_at').notNullable()
    table.integer('duration_minutes').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at')
    table.timestamp('deleted_at')
  })

  await knex.schema.createTable('tags', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable().unique()
    table.text('color').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at')
    table.timestamp('deleted_at')
  })

  await knex.schema.createTable('task_tags', (table) => {
    table.uuid('task_id').references('id').inTable('tasks').onDelete('CASCADE')
    table.uuid('tag_id').references('id').inTable('tags').onDelete('CASCADE')
    table.primary(['task_id', 'tag_id'])
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at')
    table.timestamp('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('task_tags')
  await knex.schema.dropTableIfExists('tags')
  await knex.schema.dropTableIfExists('tasks')
}
