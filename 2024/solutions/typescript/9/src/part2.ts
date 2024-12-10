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
// Bruteforce method (failed)
for (let iSrc = data.length - 1; iSrc > 0; iSrc--) {
  const src = data[iSrc]
  let srcSize = 1
  let id: number
  if (src !== null) {
    id = src
    while (--iSrc > 0) {
      const idX = data[iSrc]
      if (idX === id) {
        srcSize++
      } else {
        break
      }
    }

    for (let iDst = 0; iDst < data.length; iDst++) {
      const dst = data[iDst]
      if (dst === null) {
        const iDstStart = iDst
        let dstSize = 1
        while (++iDst < data.length && data[iDst] === null && dstSize++) {}
        if (dstSize >= srcSize) {
          for (let i = 0; i < srcSize; i++) {
            data[iDstStart + i] = id
          }
          for (let i = 0; i < srcSize; i++) {
            data[iSrc + i] = null
          }
        }
      }
    }
  }
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
