const fs = require('fs')
const { split, trim, map, forEach, isEqual, floor, ceil, orderBy, flatMap, uniq } = require('lodash')

const rowMultiple = 8

const getBinaryPlace = (code, range) => {
  forEach(code, letter => {
    if (isEqual(letter, 'F') || isEqual(letter, 'L')) {
      range[1] = floor((range[1] - range[0]) / 2) + range[0]
    } else if (isEqual(letter, 'B') || isEqual(letter, 'R')) {
      range[0] = ceil((range[1] - range[0]) / 2) + range[0]
    }
  })
  return range[0]
}

const getSeatIDs = (data) => (
  map(data, (pass) => {
    const row = getBinaryPlace(pass.substring(0,7), [0, 127])
    const column = getBinaryPlace(pass.substring(7), [0, 7])
    return row * rowMultiple + column
  })
)

const part1 = (data) => orderBy(getSeatIDs(data), null, 'desc')[0]

const part2 = (data) => {
  const seatIDs = orderBy(getSeatIDs(data), null, 'asc')
  const emptySeats = uniq(flatMap(seatIDs, (seat, index) => {
    const prevSeat = seatIDs[index - 1]
    const nextSeat = seatIDs[index + 1]
    if (!isEqual(prevSeat, seat - 1) && !isEqual(index, 0)) {
      return [seat - 1]
    }
    if (!isEqual(nextSeat, seat + 1)  && !isEqual(index, seatIDs.length - 1)) {
      return [seat + 1]
    }
    return []
  }))
  return emptySeats[0]
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\n/g)
  const maxId = part1(input)
  console.log(maxId)
  const mySeat = part2(input)
  console.log(mySeat)
})