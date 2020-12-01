const fs = require('fs')
const { split, map, parseInt, some, filter, reduce, isEqual } = require('lodash')

const max = 2020

const getTwoRecords = (input) => {
  const results = filter(input, (number1) => some(input, (number2) => isEqual(number1 + number2, max)))
  const total = reduce(results, (acc, val) => acc * val)
  return { results, total }
}

const getThreeRecords = (input) => {
  const results = filter(input, (number1) => some(input, (number2) => some(input, (number3) => isEqual(number1 + number2 + number3, max))))
  const total = reduce(results, (acc, val) => acc * val)
  return { results, total }
}

const getRecords = (input, count) => {
  const isSummable = (input, numbers) => some(input, (number) => (
    numbers.length >= count - 1 ? isEqual(reduce(numbers, (acc, val) => acc + val) + number, max) : isSummable(input, [...numbers, number])
  ))

  const results = filter(input, (number) => isSummable(input, [number]))
  const total = reduce(results, (acc, val) => acc * val)
  return { results, total }
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = map(split(data, /\n/g), (val) => parseInt(val))
  // const two = getTwoRecords(input)
  // const three = getThreeRecords(input)
  const records = getRecords(input, 3)
  console.log(records)
})