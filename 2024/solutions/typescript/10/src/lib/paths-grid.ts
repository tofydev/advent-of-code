import { bold, special } from './console'
import { Vec2 } from './find-start-locs'
import { HeightsGrid } from './heights-grid'

export type PathsGrid = PathsRow[]
export type PathsRow = PathsCell[]
export type PathsCell = {
  paths: Set<Vec2>
  start: boolean
  end: boolean
}

export function toPathsGrid({ heights, nRows, nCols }: HeightsGrid): PathsGrid {
  // console.time('Generate paths grid')
  const pathsGrid = heights.map((heightsRow, iRow) =>
    heightsRow.map((height, iCol) => {
      const paths = new Set<Vec2>()
      const nextHeight = height + 1

      if (iRow >= 1) {
        const locRow = iRow - 1
        const locCol = iCol
        const locHeight = heights[locRow][locCol]
        if (locHeight === nextHeight) {
          const loc = [locRow, locCol] as const
          paths.add(loc)
        }
      }
      if (iRow <= nRows - 2) {
        const locRow = iRow + 1
        const locCol = iCol
        const locHeight = heights[locRow][locCol]
        if (locHeight === nextHeight) {
          const loc = [locRow, locCol] as const
          paths.add(loc)
        }
      }
      if (iCol >= 1) {
        const locRow = iRow
        const locCol = iCol - 1
        const locHeight = heights[locRow][locCol]
        if (locHeight === nextHeight) {
          const loc = [locRow, locCol] as const
          paths.add(loc)
        }
      }
      if (iCol <= nCols - 2) {
        const locRow = iRow
        const locCol = iCol + 1
        const locHeight = heights[locRow][locCol]
        if (locHeight === nextHeight) {
          const loc = [locRow, locCol] as const
          paths.add(loc)
        }
      }

      return {
        paths,
        start: height === 0,
        end: height === 9,
      }
    })
  )
  // console.timeEnd('Generate paths grid')

  return pathsGrid
}

export function printPathsGrid(pathsGrid: PathsGrid): void {
  console.log(`PathsGrid:\n`)
  for (const row of pathsGrid) {
    process.stdout.write(`  `)
    for (const { start, end, paths } of row) {
      let str = `${paths.size}`
      if (start) {
        str = bold(str)
      }
      if (end) {
        str = special(str)
      }
      process.stdout.write(str)
    }
    process.stdout.write(`\n`)
  }
  process.stdout.write(`\n`)
}
