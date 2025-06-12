import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import {
  DiaryEntrySchema,
  NewDiaryEntrySchema,
} from '../model/diary'
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} from '../controller/diary'

const app = new OpenAPIHono()

const listRoute = createRoute({
  method: 'get',
  path: '/diary',
  responses: {
    200: {
      description: '日記一覧',
      content: {
        'application/json': {
          schema: DiaryEntrySchema.array(),
        },
      },
    },
  },
})

app.openapi(listRoute, (c) => {
  return c.json(getAllEntries(), 200)
})

// 追加
const createRouteDef = createRoute({
  method: 'post',
  path: '/diary',
  request: {
    body: {
      content: {
        'application/json': {
          schema: NewDiaryEntrySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: {
        'application/json': {
          schema: DiaryEntrySchema,
        },
      },
    },
  },
})

app.openapi(createRouteDef, async (c) => {
  const data = c.req.valid('json')
  const entry = createEntry(data)
  return c.json(entry, 201)
})

// 詳細取得
const idParamSchema = z.object({
  id: z
    .string()
    .openapi({ param: { name: 'id', in: 'path' }, example: '1' }),
})

const detailRoute = createRoute({
  method: 'get',
  path: '/diary/{id}',
  request: {
    params: idParamSchema,
  },
  responses: {
    200: {
      description: '詳細',
      content: {
        'application/json': {
          schema: DiaryEntrySchema,
        },
      },
    },
    404: { description: '存在しないID' },
  },
})

app.openapi(detailRoute, (c) => {
  const { id } = c.req.valid('param')
  const entry = getEntryById(Number(id))
  if (!entry) return c.text('Not Found', 404)
  return c.json(entry, 200)
})

// 更新
const updateRouteDef = createRoute({
  method: 'put',
  path: '/diary/{id}',
  request: {
    params: idParamSchema,
    body: {
      content: {
        'application/json': {
          schema: NewDiaryEntrySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: '更新完了',
      content: {
        'application/json': {
          schema: DiaryEntrySchema,
        },
      },
    },
    404: { description: '存在しないID' },
  },
})

app.openapi(updateRouteDef, async (c) => {
  const { id } = c.req.valid('param')
  const data = c.req.valid('json')
  const entry = updateEntry(Number(id), data)
  if (!entry) return c.text('Not Found', 404)
  return c.json(entry, 200)
})

// 削除
const deleteRouteDef = createRoute({
  method: 'delete',
  path: '/diary/{id}',
  request: {
    params: idParamSchema,
  },
  responses: {
    204: { description: '削除完了' },
    404: { description: '存在しないID' },
  },
})

app.openapi(deleteRouteDef, (c) => {
  const { id } = c.req.valid('param')
  const ok = deleteEntry(Number(id))
  if (!ok) return c.text('Not Found', 404)
  return c.body(null, 204)
})

export default app 