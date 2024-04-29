import { FastifyInstance } from 'fastify'

import {
  createTag,
  deleteTag,
  getTags,
  updateTag,
} from '../controllers/tagsController'

export async function tagsRoutes(app: FastifyInstance) {
  app.get('/', getTags)
  app.patch('/:id', updateTag)
  app.delete('/:id', deleteTag)
  app.post('/', createTag)
}
