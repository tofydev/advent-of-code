import { readFile } from './lib/fs'

const a = performance.now()
////////////////////////////////////////////////////////////////////////////////
// CONFIG

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
    nBlinks: 75,
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

function printStones(title: string, stones: string[]) {
  console.log(`${title}:`)
  console.log(fmtStones(stones))
  // console.log(stones.length)
  console.log()
}

function fmtStones(stones: string[]) {
  return stones.join(' ')
}

////////////////////////////////////////////////////////////////////////////////
// LOGIC

async function solve({ filename, nBlinks }: ChallengeConditions, log: boolean) {
  const initialStones = parseInput(await readFile({ day: 11, filename }))
  const stones = blinkTimes(nBlinks, initialStones, log)

  return stones.length
}

function parseInput(input: string): string[] {
  return input.trim().split(' ')
}

function blinkTimes(nBlinks: number, stones: string[], log: boolean): string[] {
  log && printStones('Initial arrangement', stones)

  for (let iBlink = 0; iBlink < nBlinks; iBlink++) {
    stones = blink(stones)
    log &&
      printStones(`After ${iBlink + 1} blink${iBlink === 2 ? '' : 's'}`, stones)
  }

  return stones
}

function blink(stones: string[]): string[] {
  return stones.flatMap(handleStone)
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

const solution = await solve(Challenge.debug, true)

////////////////////////////////////////////////////////////////////////////////
const c = performance.now()

console.log(
  `Total time taken including reading the file: ${(c - a).toFixed(3)}ms`
)
// console.log(`Total time taken after reading the file: ${(c - b).toFixed(3)}ms`)
console.log('Solution:', solution)
