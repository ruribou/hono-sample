import { z } from '@hono/zod-openapi'

// 日記エントリー全体のスキーマ
export const DiaryEntrySchema = z
  .object({
    id: z
      .number()
      .int()
      .positive()
      .openapi({ example: 1 }),
    title: z
      .string()
      .min(1)
      .openapi({ example: '今日の出来事' }),
    content: z
      .string()
      .min(1)
      .openapi({ example: 'とても楽しい一日だった。' }),
    date: z
      .string()
      .openapi({ example: '2025-06-12' }),
  })
  .openapi('DiaryEntry')

export const NewDiaryEntrySchema = DiaryEntrySchema.omit({ id: true }).openapi(
  'NewDiaryEntry'
)

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>
export type NewDiaryEntry = z.infer<typeof NewDiaryEntrySchema> 