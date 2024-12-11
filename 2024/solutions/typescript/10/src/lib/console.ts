const ESC = '\u001B'
const RESET = ESC + `[0m`
const BOLD = ESC + '[1m'

export function bold(str: string) {
  return `${BOLD}${str}${RESET}`
}

export function special(str: string) {
  return `${ESC}[30;47m${str}${RESET}`
}
