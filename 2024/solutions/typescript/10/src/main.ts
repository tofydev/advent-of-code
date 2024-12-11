import { readFile } from './lib/fs'
import { solve } from './lib/solve'

const a = performance.now()
const input = await readFile('official.txt')

const solution = solve(input)
const b = performance.now()

console.log(`Total time taken after reading the file: ${(b - a).toFixed(3)}ms`)
console.log('Solution:', solution)
