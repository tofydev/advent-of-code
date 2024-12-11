import { HeightsGrid } from './heights-grid'

export type Vec2 = readonly [number, number]

export function findStartLocs({ heights }: HeightsGrid): Set<Vec2> {
  // console.time('Find start locations')
  const locs = new Set<Vec2>()
  for (const [iRow, heightsRow] of heights.entries()) {
    for (const [iCol, height] of heightsRow.entries()) {
      if (height === 0) {
        locs.add([iRow, iCol])
      }
    }
  }
  // console.timeEnd('Find start locations')
  return locs
}

export function printStartLocs(
  startLocs: Set<Vec2>,
  { nCols, nRows }: HeightsGrid
): void {
  const grid = Array.from({ length: nRows }).map(() =>
    Array.from({ length: nCols }).fill('.')
  )
  for (const loc of startLocs) {
    const [row, col] = loc
    grid[row][col] = 'X'
  }
  console.log('Start locations:\n')
  console.log(grid.map((row) => '  ' + row.join('')).join('\n'), '\n')
}
