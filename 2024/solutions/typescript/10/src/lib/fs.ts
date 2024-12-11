import { join as joinPath, resolve } from 'node:path'

export type FileName = 'official.txt' | 'example.txt'

export async function readFile(name: FileName) {
  const relPath = joinPath(__dirname, `../../../../../inputs/10/${name}`)
  const absPath = resolve(relPath)

  const label = `Read file: ${absPath}`

  console.time(label)
  const body = await Bun.file(absPath).text()
  console.timeEnd(label)

  return body
}
