import { findStartLocs } from './find-start-locs'
import { toHeightsGrid } from './heights-grid'
import { toPathsGrid } from './paths-grid'
import {
  countTrailheadsEndLocations,
  countTrailheadsUniquePathsTotal,
  trackTrailHeads,
} from './track-trailheads'

export function solve(input: string) {
  const heightsGrid = toHeightsGrid(input)
  // printHeightsGrid(heightsGrid)

  const pathsGrid = toPathsGrid(heightsGrid)
  // printPathsGrid(pathsGrid)

  const startLocs = findStartLocs(heightsGrid)
  // printStartLocs(startLocs, heightsGrid)

  const trailheads = trackTrailHeads(startLocs, pathsGrid)
  // printTrailHeads(trailheads, heightsGrid)

  const trailheadsEndLocationCount = countTrailheadsEndLocations(trailheads)
  const trailheadsUniquePathsTotal = countTrailheadsUniquePathsTotal(trailheads)

  return { trailheadsEndLocationCount, trailheadsUniquePathsTotal }
}
