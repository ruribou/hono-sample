import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import diaryApp from './src/routes/diary'

const app = new OpenAPIHono()

app.route('/api', diaryApp)

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Diary API',
    version: '1.0.0',
  },
})

app.get('/', swaggerUI({ url: '/doc' }))

export default app
