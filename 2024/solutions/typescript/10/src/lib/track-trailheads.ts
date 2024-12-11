import { Vec2 } from './find-start-locs'
import { HeightsGrid } from './heights-grid'
import { PathsGrid } from './paths-grid'

export interface TrailHead {
  startLoc: Vec2
  endLocator: EndLocator
}

export interface EndLocator {
  endLocDescriptors: Set<string>
  uniquePaths: number
}

export function trackTrailHeads(
  startLocs: Set<Vec2>,
  pathsGrid: PathsGrid
): Set<TrailHead> {
  console.time('Track trailheads')
  const trailHeads: Set<TrailHead> = new Set(
    [...startLocs].map((startLoc) => ({
      startLoc,
      endLocator: trackEndLocs(startLoc, pathsGrid),
    }))
  )
  console.timeEnd('Track trailheads')

  return trailHeads
}

export function trackEndLocs(loc: Vec2, pathsGrid: PathsGrid): EndLocator {
  const [row, col] = loc
  const { paths, end } = pathsGrid[row][col]

  if (end) {
    return {
      endLocDescriptors: new Set([`${row}-${col}`]),
      uniquePaths: 1,
    }
  } else {
    const endLocator: EndLocator = {
      endLocDescriptors: new Set<string>(),
      uniquePaths: 0,
    }
    for (const loc of paths) {
      const { endLocDescriptors, uniquePaths } = trackEndLocs(loc, pathsGrid)
      endLocator.endLocDescriptors =
        endLocator.endLocDescriptors.union(endLocDescriptors)
      endLocator.uniquePaths += uniquePaths
    }
    return endLocator
  }
}

export function printTrailHeads(
  trailHeads: Set<TrailHead>,
  { nRows, nCols }: HeightsGrid
) {
  const grid = Array.from({ length: nRows }).map(() =>
    Array.from({ length: nCols }).fill('.')
  )
  for (const {
    startLoc: [row, col],
    endLocator,
  } of trailHeads) {
    grid[row][col] = endLocator.endLocDescriptors.size
  }
  console.log('Trailheads:\n')
  console.log(grid.map((row) => '  ' + row.join('')).join('\n'), '\n')

  console.log(
    'Trailhead scores:',
    trailHeads
      .values()
      .map(({ endLocator }) => endLocator.endLocDescriptors.size)
      .toArray()
      .join(', ')
  )
}

export function countTrailheadsEndLocations(trailheads: Set<TrailHead>) {
  return trailheads
    .values()
    .reduce(
      (sum, trailhead) => sum + trailhead.endLocator.endLocDescriptors.size,
      0
    )
}

export function countTrailheadsUniquePathsTotal(trailheads: Set<TrailHead>) {
  return trailheads
    .values()
    .reduce((sum, trailhead) => sum + trailhead.endLocator.uniquePaths, 0)
}
