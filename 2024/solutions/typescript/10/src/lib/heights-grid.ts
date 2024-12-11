export interface HeightsGrid {
  heights: number[][]
  nRows: number
  nCols: number
}

export function toHeightsGrid(raw: string): HeightsGrid {
  // console.time('Convert raw body to simple heightmap')
  const heights = raw
    .trim()
    .split('\n')
    .map((line) => Array.from(line).map((digit) => Number(digit)))
  // console.timeEnd('Convert raw body to simple heightmap')

  return {
    heights,
    nRows: heights.length,
    nCols: heights[0].length,
  }
}

export function printHeightsGrid({ heights, nRows, nCols }: HeightsGrid) {
  console.log(`\nHeightsGrid(width: ${nCols}, height: ${nRows}):\n`)

  for (const row of heights) {
    console.log('  ' + row.join(''))
  }

  console.log()
}
