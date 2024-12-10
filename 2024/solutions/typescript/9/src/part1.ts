import { readInputFile } from './lib/fs'

/*
Solution:
- read file
- fill array representing FS
  ( optimization for later: UTF8Array / Buffer )
- checksum
*/

const a = performance.now()

console.log('Read input file')
const inputBody = await readInputFile()

console.log('Fill virtual filesystem')
let isBlock = true
let id = 0
const data: (number | null)[] = []
for (const char of inputBody) {
  isBlock = !isBlock

  const blockSize = Number(char)

  if (isBlock) {
    id++
  }

  for (let i = 0; i < blockSize; i++) {
    data.push(isBlock ? null : id)
  }
}

console.log('Shift')
let iSrc = data.length - 1
let iDst = 0
while (iSrc > iDst) {
  const src = data[iSrc]
  const dst = data[iDst]

  // Skip until src is not empty
  if (src === null) {
    iSrc--
    continue
  }

  // Skip until dst is empty
  if (dst !== null) {
    iDst++
    continue
  }

  data[iDst] = src
  data[iSrc] = null

  // Optimization
  iDst++
  iSrc--
}

console.log('Calculating checksum')
let checksum = 0
for (let i = 0; i < data.length; i++) {
  const id = data[i]
  if (id === null) {
    break
  }
  // Can this overflow?
  checksum += id * i
}

console.log(checksum)

const b = performance.now()

console.log(b - 1)
