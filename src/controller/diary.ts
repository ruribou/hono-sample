import { DiaryEntry, NewDiaryEntry } from '../model/diary'

// デモ用のメモリ内データベース
let entries: DiaryEntry[] = [
  {
    id: 1,
    title: '初めての日記',
    content: 'こんにちは、世界！',
    date: new Date().toISOString().slice(0, 10),
  },
]

let nextId = 2

export const getAllEntries = (): DiaryEntry[] => entries

export const getEntryById = (id: number): DiaryEntry | undefined =>
  entries.find((e) => e.id === id)

export const createEntry = (data: NewDiaryEntry): DiaryEntry => {
  const entry: DiaryEntry = { id: nextId++, ...data }
  entries.push(entry)
  return entry
}

export const updateEntry = (
  id: number,
  data: NewDiaryEntry
): DiaryEntry | undefined => {
  const index = entries.findIndex((e) => e.id === id)
  if (index === -1) return undefined
  entries[index] = { ...entries[index], ...data }
  return entries[index]
}

export const deleteEntry = (id: number): boolean => {
  const before = entries.length
  entries = entries.filter((e) => e.id !== id)
  return entries.length < before
} 