import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import diaryApp from './src/routes/diary'

const app = new OpenAPIHono()

app.get('/', (c) => c.text('Hello Hono!'))

// /api 配下に日記 API をマウント
app.route('/api', diaryApp)

// OpenAPI ドキュメント (JSON)
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Diary API',
    version: '1.0.0',
  },
})

// Swagger UI
app.get('/docs', swaggerUI({ url: '/doc' }))

export default app
