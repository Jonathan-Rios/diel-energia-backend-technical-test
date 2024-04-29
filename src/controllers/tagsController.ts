import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function getTags(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tags = await knex('tags').whereNull('deleted_at').select()

    reply.status(200).send({ tags })
  } catch (error: unknown) {
    console.log(error)
    reply.status(400).send()
  }
}

export async function createTag(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createTagBodySchema = z.object({
      name: z.string(),
      color: z.string(),
    })

    const { name, color } = createTagBodySchema.parse(request.body)

    await knex('tags').insert({
      id: randomUUID(),
      name,
      color,
    })

    reply.status(201).send({ message: 'Tag criada com sucesso' })
  } catch (error: unknown) {
    console.log(error)
    reply.status(400).send()
  }
}

export async function updateTag(request: FastifyRequest, reply: FastifyReply) {
  const editTagParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = editTagParamsSchema.parse(request.params)

  const editTagBodySchema = z.object({
    name: z.string().optional(),
    color: z.string().optional(),
  })

  const { name, color } = editTagBodySchema.parse(request.body)

  const updateData: Record<string, any> = {}

  if (name !== undefined) {
    updateData.name = name
  }

  if (name !== undefined) {
    updateData.color = color
  }

  updateData.updated_at = knex.fn.now()

  await knex('tags').where({ id }).update(updateData)

  reply.status(200).send({ message: 'Tag atualizada com sucesso' })
}

export async function deleteTag(request: FastifyRequest, reply: FastifyReply) {
  try {
    const deleteTagParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteTagParamsSchema.parse(request.params)

    await knex('tags').where({ id }).update({
      deleted_at: knex.fn.now(),
    })

    reply.status(200).send({ message: 'Tag removida com sucesso' })
  } catch (error) {
    console.log(error)
    reply.status(400).send()
  }
}
