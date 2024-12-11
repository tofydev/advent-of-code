import { readFile } from './lib/fs'

const a = performance.now()
////////////////////////////////////////////////////////////////////////////////
// CONFIG

type Stash = Record<string, number>

interface ChallengeConditions {
  filename: string
  nBlinks: number
}

const Challenge = {
  officialPart1: {
    filename: 'official.txt',
    nBlinks: 25,
  },
  officialPart2: {
    filename: 'official.txt',
    nBlinks: 150,
  },
  example: {
    filename: 'example.txt',
    nBlinks: 6,
  },
  debug: {
    filename: 'debug.txt',
    nBlinks: 5,
  },
} as const satisfies Record<string, ChallengeConditions>

////////////////////////////////////////////////////////////////////////////////
// UTIL

function trimLeadingZeroes(value: string): string {
  for (let i = 0; i < value.length; i++) {
    if (value.charAt(i) !== '0') {
      return value.slice(i)
    }
  }
  return '0'
}

function countStones(stash: Stash): number {
  return Object.values(stash).reduce((sum, count) => sum + count)
}

function identify(stash: Stash): string {
  return JSON.stringify(stash)
}

////////////////////////////////////////////////////////////////////////////////
// LOGIC

function parseInput(input: string): Stash {
  return input
    .trim()
    .split(' ')
    .reduce((acc: Stash, value) => {
      acc[value] = (acc[value] ?? 0) + 1
      return acc
    }, {})
}

async function solve(
  { filename, nBlinks }: ChallengeConditions,
  log: boolean
): Promise<number> {
  const initialStash = parseInput(await readFile({ day: 11, filename }))
  const stash = await handleStash(initialStash, nBlinks, 0)
  return countStones(stash)
}

// const cache: Record<string, Record<number, Stash>> = {}
const cache: {
  [value: string]:
    | {
        [nBlinksRemaining: number]: Promise<Stash> | undefined
      }
    | undefined
} = {}
async function handleStash(
  initialStash: Stash,
  blinksRemaining: number,
  blinksDone: number
): Promise<Stash> {
  if (blinksRemaining === 0) {
    return initialStash
  } else {
    const id = identify(initialStash)
    const idCache = (cache[id] ||= {})
    const cachedValuePromise = await idCache[blinksRemaining]
    if (cachedValuePromise) {
      return cachedValuePromise
    } else {
      const stash: Stash = {}
      for (const [initialValue, count] of Object.entries(initialStash)) {
        for (const value of handleStone(initialValue)) {
          stash[value] = (stash[value] ?? 0) + count
        }
      }
      return await (idCache[blinksRemaining] = new Promise((resolve) =>
        resolve(handleStash(stash, blinksRemaining - 1, blinksDone + 1))
      ))
    }
  }
}

function handleStone(value: string): string[] {
  const nDigits = value.length
  const hasEvenDigits = value.length % 2 === 0

  if (value === '0') {
    return ['1']
  } else if (hasEvenDigits) {
    const halfDigits = nDigits / 2
    const stoneA = value.slice(0, halfDigits)
    const stoneB = trimLeadingZeroes(value.slice(halfDigits))
    return [stoneA, stoneB]
  } else {
    return [(Number(value) * 2024).toString()]
  }
}

////////////////////////////////////////////////////////////////////////////////
// EXECUTION

const solution = await solve(Challenge.officialPart2, true)

////////////////////////////////////////////////////////////////////////////////
const c = performance.now()

console.log(
  `Total time taken including reading the file: ${(c - a).toFixed(3)}ms`
)
// console.log(`Total time taken after reading the file: ${(c - b).toFixed(3)}ms`)
console.log('Solution:', solution)