const fs = require('fs')
const { split, map, trim, isEqual, parseInt, filter, floor, reduce } = require('lodash')

const part1 = (data) => {
  const results = filter(map(data, (line, index) => {
    const pos = 3 * index - (floor((3 * index) / line.length) * line.length)
    return line[pos]
  }), (char) => isEqual(char, '#'))
  return results.length
}

const getTrees = (data, right, down) => {
  const results = filter(map(data, (line, index) => {
    if (isEqual(index % down, 0)) {
      const posY = index / down
      const posX = right * posY - (floor((right * posY) / line.length) * line.length)
      return line[posX]
    }
    return ''
  }), (char) => isEqual(char, '#'))
  return results.length
}

const part2 = (data) => {
  const trees = [ getTrees(data, 1, 1), getTrees(data, 3, 1), getTrees(data, 5, 1), getTrees(data, 7, 1), getTrees(data, 1, 2) ]
  return reduce(trees, (acc, val) => acc * val)
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\n/g)
  const trees2 = part2(input)
  console.log(trees2)
})