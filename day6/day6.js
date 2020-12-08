const fs = require('fs')
const { split, trim, replace, map, uniq, reduce, intersection } = require('lodash')

const part1 = (data) => reduce(map(data, answers => uniq(split(replace(answers, /\n/g, ''), '')).length), (acc, val) => acc + val)

const part2 = (data) => (
  reduce(map(data, group => intersection(...map(split(group, /\n/g), answer => split(answer, ''))).length), (acc, val) => acc + val)
)

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\s{2,}/g)
  const sum1 = part1(input)
  console.log(sum1)
  const sum2 = part2(input)
  console.log(sum2)
})