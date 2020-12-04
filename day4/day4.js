const fs = require('fs')
const { split, map, trim, filter, difference, isEqual, sortBy, isEmpty, keys, some, isArray, parseInt } = require('lodash')

const expected = {
  byr: (val) => {
    if (/\d{4}/g.test(val)) {
      let date = /\d{4}/g.exec(val)
      date = isArray(date) ? parseInt(date[0]) : 0
      return date >= 1920 && date <= 2002
    }
    return false
  },
  iyr: (val) => {
    if (/\d{4}/g.test(val)) {
      let date = /\d{4}/g.exec(val)
      date = isArray(date) ? parseInt(date[0]) : 0
      return date >= 2010 && date <= 2020
    }
    return false
  },
  eyr: (val) => {
    if (/\d{4}/g.test(val)) {
      let date = /\d{4}/g.exec(val)
      date = isArray(date) ? parseInt(date[0]) : 0
      return date >= 2020 && date <= 2030
    }
    return false
  },
  hgt: (val) => {
    const text = /(\d+)(cm|in)/g.exec(val)
    const size = isArray(text) ? parseInt(text[1]) : 0
    const unit = isArray(text) ? text[2] : null
    if (isEqual(unit, 'cm')) {
      return size >= 150 && size <= 193
    }
    if (isEqual(unit, 'in')) {
      return size >= 59 && size <= 76
    }
    return false
  },
  hcl: (val) => /^#[0-9a-f]{6}$/gi.test(val),
  ecl: (val) => isEqual(val, 'amb') || isEqual(val, 'blu') || isEqual(val, 'brn') || isEqual(val, 'gry') || isEqual(val, 'grn') || isEqual(val, 'hzl') || isEqual(val, 'oth'),
  pid: (val) => /^[0-9]{9}$/gi.test(val),
  cid: () => true
}
const optional = sortBy(['cid'])

const part1 = (data) => {
  const results = filter(data, (line, index) => {
    const fields = map(split(line, /\s/g), (val) => trim(split(val, ':')[0]))
    const missing = difference(keys(expected), fields)
    return isEmpty(missing) || isEqual(sortBy(missing), optional)
  })
  return results.length
}

const part2 = (data) => {
  const results = filter(data, (line, index) => {
    const fields = map(filter(split(line, /\s/g), (val) => {
      const field =  trim(split(val, ':')[0])
      const value = trim(split(val, ':')[1])
      if (some(optional, (val) => isEqual(val, field))) {
        return true
      }
      return expected[field](value)
    }), (val) => trim(split(val, ':')[0]))
    const missing = difference(keys(expected), fields)
    return isEmpty(missing) || isEqual(sortBy(missing), optional)
  })
  return results.length
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\s{2,}/g)
  const passports = part1(input)
  console.log(passports)
  const passports2 = part2(input)
  console.log(passports2)
})