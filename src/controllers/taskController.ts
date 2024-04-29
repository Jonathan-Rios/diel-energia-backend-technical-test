import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { addDays, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns'
import { Task, TaskTags } from '../@types/task'
import { Tag } from '../@types/tag'

export async function getTasks(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getTasksParamsSchema = z.object({
      selector: z.enum(['daily', 'weekly', 'monthly']).optional(),
    })

    const { selector } = getTasksParamsSchema.parse(request.params)
    const today = new Date()

    if (selector === 'monthly') {
      const startOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      )

      let startOfWeekDate = new Date(startOfThisMonth)
      while (startOfWeekDate.getDay() !== 0) {
        startOfWeekDate.setDate(startOfWeekDate.getDate() - 1)
      }

      const formattedMonthlySchedule = []
      let currentDate = new Date(startOfWeekDate)
      while (currentDate < startOfThisMonth) {
        const tasksOfPreviousDay = await knex('tasks')
          .whereBetween('due_at', [
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              0,
              0,
              0,
            ).toISOString(),
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              23,
              59,
              59,
            ).toISOString(),
          ])
          .select(
            'tasks.*',
            'tags.id as tag_id',
            'tags.name as tag_name',
            'tags.color as tag_color',
          )
          .leftJoin('task_tags', 'tasks.id', 'task_tags.task_id')
          .leftJoin('tags', 'task_tags.tag_id', 'tags.id')
          .whereNull('tasks.deleted_at')

        formattedMonthlySchedule.push({
          date: currentDate.toISOString(),
          activities: formatTask(tasksOfPreviousDay as Task[]),
        })

        currentDate.setDate(currentDate.getDate() + 1)
      }

      currentDate = new Date(startOfThisMonth)
      const endOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      )
      while (currentDate <= endOfThisMonth) {
        const startOfDayToday = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          0,
          0,
          0,
        ).toISOString()
        const endOfDayToday = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59,
        ).toISOString()

        const tasksOfDay = await knex('tasks')
          .whereBetween('due_at', [startOfDayToday, endOfDayToday])
          .select(
            'tasks.*',
            'tags.id as tag_id',
            'tags.name as tag_name',
            'tags.color as tag_color',
          )
          .leftJoin('task_tags', 'tasks.id', 'task_tags.task_id')
          .leftJoin('tags', 'task_tags.tag_id', 'tags.id')
          .whereNull('tasks.deleted_at')

        formattedMonthlySchedule.push({
          date: currentDate.toISOString(),
          activities: formatTask(tasksOfDay),
        })

        currentDate.setDate(currentDate.getDate() + 1)
      }

      while (formattedMonthlySchedule.length < 35) {
        const tasksOfNextDay = await knex('tasks')
          .whereBetween('due_at', [
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              0,
              0,
              0,
            ).toISOString(),
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              23,
              59,
              59,
            ).toISOString(),
          ])
          .select(
            'tasks.*',
            'tags.id as tag_id',
            'tags.name as tag_name',
            'tags.color as tag_color',
          )
          .leftJoin('task_tags', 'tasks.id', 'task_tags.task_id')
          .leftJoin('tags', 'task_tags.tag_id', 'tags.id')
          .whereNull('tasks.deleted_at')

        formattedMonthlySchedule.push({
          date: currentDate.toISOString(),
          activities: formatTask(tasksOfNextDay),
        })

        currentDate.setDate(currentDate.getDate() + 1)
      }

      return { schedules: formattedMonthlySchedule }
    }

    if (selector === 'weekly') {
      const formattedTasksOfWeek: any[] = []

      const startOfWeekDate = startOfWeek(today)
      const endOfWeekDate = endOfWeek(today)

      for (let i = 0; i < 7; i++) {
        const currentDate = addDays(startOfWeekDate, i)

        const startOfDayToday = startOfDay(currentDate).toISOString()
        const endOfDayToday = endOfDay(currentDate).toISOString()

        const tasksOfDay = await knex('tasks')
          .whereBetween('due_at', [startOfDayToday, endOfDayToday])
          .select(
            'tasks.*',
            'tags.id as tag_id',
            'tags.name as tag_name',
            'tags.color as tag_color',
          )
          .leftJoin('task_tags', 'tasks.id', 'task_tags.task_id')
          .leftJoin('tags', 'task_tags.tag_id', 'tags.id')
          .whereNull('tasks.deleted_at')

        const formattedTasksOfDay = formatTask(tasksOfDay)

        const hours = Array.from(
          { length: 24 },
          (_, index) => index.toString().padStart(2, '0') + ':00',
        )

        const hourActivities = hours.map((hour) => ({
          hour: hour,
          activities: [] as TaskTags[],
        }))

        formattedTasksOfDay.forEach((task) => {
          const dueDate = new Date(task.dueAt)
          const hourIndex = dueDate.getHours()
          hourActivities[hourIndex].activities.push(task)
        })

        formattedTasksOfWeek.push({
          date: currentDate,
          hours: hourActivities,
        })
      }

      return { schedules: formattedTasksOfWeek }
    }

    const startOfDayToday = startOfDay(today).toISOString()
    const endOfDayToday = endOfDay(today).toISOString()

    const tasksOfDay = await knex('tasks')
      .whereBetween('due_at', [startOfDayToday, endOfDayToday])
      .select(
        'tasks.*',
        'tags.id as tag_id',
        'tags.name as tag_name',
        'tags.color as tag_color',
      )
      .leftJoin('task_tags', 'tasks.id', 'task_tags.task_id')
      .leftJoin('tags', 'task_tags.tag_id', 'tags.id')
      .whereNull('tasks.deleted_at')

    const formattedTasksOfDay = formatTask(tasksOfDay)

    const hours = Array.from(
      { length: 24 },
      (_, index) => index.toString().padStart(2, '0') + ':00',
    )

    const hourActivities = hours.map((hour) => ({
      hour: hour,
      activities: [] as typeof formattedTasksOfDay,
    }))

    formattedTasksOfDay.forEach((task) => {
      const dueDate = new Date(task.dueAt)
      const hourIndex = dueDate.getHours()
      hourActivities[hourIndex].activities.push(task)
    })

    return { schedules: hourActivities }
  } catch (error) {
    console.log(error)
    reply.status(400).send()
  }
}

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createTasksBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      dueAt: z.string(),
      durationMinutes: z.number(),
      tags: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          color: z.string(),
        }),
      ),
    })

    const { title, description, dueAt, durationMinutes, tags } =
      createTasksBodySchema.parse(request.body)

    const taskId = randomUUID()
    await knex('tasks').insert({
      id: taskId,
      title,
      description,
      due_at: dueAt,
      duration_minutes: durationMinutes,
    })

    const tagIds: string[] = await Promise.all(
      tags.map(async (tag: Tag) => {
        const [existingTag] = await knex('tags')
          .where({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })
          .select('id')

        if (existingTag) {
          return existingTag.id
        } else {
          await knex('tags').insert({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })
          return tag.id
        }
      }),
    )

    await Promise.all(
      tagIds.map(async (tagId) => {
        await knex('task_tags').insert({
          task_id: taskId,
          tag_id: tagId,
        })
      }),
    )

    reply.status(201).send({ message: 'Tarefa criada com sucesso' })
  } catch (error: unknown) {
    console.log(error)
    reply.status(400).send()
  }
}

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  const editTasksParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = editTasksParamsSchema.parse(request.params)

  const editTasksBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueAt: z.string().optional(),
    durationMinutes: z.number().optional(),
    tags: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          color: z.string(),
        }),
      )
      .optional(),
  })

  const { title, description, dueAt, durationMinutes, tags } =
    editTasksBodySchema.parse(request.body)

  const updateData: Record<string, any> = {}

  if (title !== undefined) {
    updateData.title = title
  }

  if (description !== undefined) {
    updateData.description = description
  }

  if (dueAt !== undefined) {
    updateData.due_at = dueAt
  }

  if (durationMinutes !== undefined) {
    updateData.duration_minutes = durationMinutes
  }

  updateData.updated_at = knex.fn.now()

  await knex('tasks').where({ id }).update(updateData)

  if (tags) {
    const tagIds: string[] = await Promise.all(
      tags.map(async (tag: Tag) => {
        const [existingTag] = await knex('tags')
          .where({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })
          .select('id')

        if (existingTag) {
          return existingTag.id
        } else {
          await knex('tags').insert({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })
          return tag.id
        }
      }),
    )

    await knex('task_tags').where({ task_id: id }).del()

    await Promise.all(
      tagIds.map(async (tagId) => {
        await knex('task_tags').insert({
          task_id: id,
          tag_id: tagId,
        })
      }),
    )
  }

  reply.status(200).send({ message: 'Tarefa atualizada com sucesso' })
}

export async function getTaskById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const editTasksParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = editTasksParamsSchema.parse(request.params)

    const formattedTasks = await knex('tasks')
      .where('tasks.id', id)
      .select(
        'tasks.*',
        'tags.id as tag_id',
        'tags.name as tag_name',
        'tags.color as tag_color',
      )
      .leftJoin('task_tags', 'tasks.id', 'task_tags.task_id')
      .leftJoin('tags', 'task_tags.tag_id', 'tags.id')
      .whereNull('tasks.deleted_at')
      .whereNull('task_tags.deleted_at')

    reply.status(200).send({ task: formatTask(formattedTasks)[0] })
  } catch (error: unknown) {
    console.log(error)
    reply.status(400).send()
  }
}

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getTasksParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTasksParamsSchema.parse(request.params)

    await knex('tasks').where({ id }).first().update({
      deleted_at: knex.fn.now(),
    })
    reply.status(200).send({ message: 'Tarefa removida com sucesso' })
  } catch (error) {
    console.log(error)
    reply.status(400).send()
  }
}

function formatTask(tasks: Task[]): TaskTags[] {
  const uniqueTasks: Record<string, TaskTags> = {}

  tasks.forEach((task) => {
    if (!uniqueTasks[task.id]) {
      uniqueTasks[task.id] = {
        id: task.id,
        title: task.title,
        description: task.description,
        dueAt: task.due_at,
        durationMinutes: task.duration_minutes,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        deletedAt: task.deleted_at,
        tags: [],
      }
    }

    if (task.tag_id) {
      uniqueTasks[task.id].tags.push({
        id: task.tag_id,
        name: task.tag_name || '',
        color: task.tag_color || '',
      })
    }
  })

  return Object.values(uniqueTasks)
}
