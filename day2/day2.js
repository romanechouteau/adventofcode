const fs = require('fs')
const { split, map, trim, isEqual, parseInt, filter } = require('lodash')

const part1 = (data) => {
  const results = filter(data, (line) => {
    const arr = split(line, ':')
    const [ min, max, letter ] = split(trim(arr[0]), /[-\s]/g)
    const letters = filter(split(trim(arr[1]), ''), char => isEqual(char, letter))
    return parseInt(min) <= letters.length && parseInt(max) >= letters.length
  })
  return results.length
}

const part2 = (data) => {
  const results = filter(data, (line) => {
    const arr = split(line, ':')
    const [ pos1, pos2, letter ] = split(trim(arr[0]), /[-\s]/g)
    const letters = split(trim(arr[1]), '')
    const letter1 = isEqual(letters[parseInt(pos1) - 1], letter)
    const letter2 = isEqual(letters[parseInt(pos2) - 1], letter)
    return !isEqual(letter1, letter2)
  })
  return results.length
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\n/g)
  const valid1 = part1(input)
  console.log(valid1)
  const valid2 = part2(input)
  console.log(valid2)
})