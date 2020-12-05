const fs = require('fs')
const { split, trim } = require('lodash')

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\n/g)
})