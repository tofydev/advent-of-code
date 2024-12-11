import { join as joinPath, resolve } from 'node:path'

export async function readFile({
  day,
  filename,
}: {
  day: number
  filename: string
}) {
  const relPath = joinPath(
    __dirname,
    `../../../../../inputs/${day}/${filename}`
  )
  const absPath = resolve(relPath)

  const label = `Read file: ${absPath}`

  console.time(label)
  const body = await Bun.file(absPath).text()
  console.timeEnd(label)

  return body
}
