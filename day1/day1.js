const fs = require('fs')
const { split, map, parseInt, some, filter, reduce, isEqual } = require('lodash')

const max = 2020

const getTwoRecords = (input) => {
  const results = filter(input, (number1) => some(input, (number2) => isEqual(number1 + number2, max)))
  const total = reduce(results, (acc, val) => acc * val)
  console.log(results)
  console.log(total)
}

const getThreeRecords = (input) => {
  const results = filter(input, (number1) => some(input, (number2) => some(input, (number3) => isEqual(number1 + number2 + number3, max))))
  const total = reduce(results, (acc, val) => acc * val)
  console.log(results)
  console.log(total)
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = map(split(data, /\n/g), (val) => parseInt(val))
  getTwoRecords(input)
  getThreeRecords(input)
})