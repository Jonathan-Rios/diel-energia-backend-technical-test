import fastfy from 'fastify'
import { tasksRoutes } from './routes/tasks'
import cors from '@fastify/cors'
import { tagsRoutes } from './routes/tags'

export const app = fastfy()

app.register(cors, {
  origin: '*',
})

app.register(tasksRoutes, {
  prefix: 'tasks',
})

app.register(tagsRoutes, {
  prefix: 'tags',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
