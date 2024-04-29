import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { generateTasksForToday } from '../utils/generate'
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '../controllers/taskController'

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/list/:selector?', getTasks)
  app.patch('/:id', updateTask)
  app.delete('/:id', deleteTask)
  app.get('/:id', getTaskById)
  app.post('/', createTask)

  app.post('/generate', async (request, reply) => {
    generateTasksForToday()
  })
}
