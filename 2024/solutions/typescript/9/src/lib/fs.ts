import { join as joinPath } from 'node:path'

export async function readInputFile() {
  const filePath = joinPath(__dirname, '../../../../../inputs/9/input.txt')
  return await Bun.file(filePath).text()
}
