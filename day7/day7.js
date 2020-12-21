const fs = require('fs')
const { split, trim, isArray, map, compact, isUndefined, isEqual, parseInt, filter, some, find, isEmpty, uniqBy, flatten, get, reduce } = require('lodash')
const util = require('util')

const getRules = (data) => (
  compact(map(data, rule => {
    const arr = split(rule, 'contain')
    let outerBag = /(.+)bags/gi.exec(arr[0])
    if (!isArray(outerBag) || isUndefined(arr[1])) {
      return 0
    }
    outerBag = trim(outerBag[1])
    if (isEqual(trim(arr[1]), 'no other bags')) {
      return { outerBag, innerBags: [] }
    }
    const innerBags = compact(map(split(arr[1], ','), inner => {
      const regex = /(\d+)\s(.+)\sbags?/gi.exec(inner)
      if (!isArray(regex)) {
        return 0
      }
      const number = parseInt(regex[1])
      const type = trim(regex[2])
      return { type, number }
    }))
    return { outerBag, innerBags }
  }))
)

const findOuter = (rules, bags) => (
  flatten(compact(map(bags, bag => {
    return filter(rules, rule => some(rule.innerBags, inner => isEqual(inner.type, bag.outerBag)))
  })))
)

const part1 = (data) => {
  const myBag = 'shiny gold'
  const rules = getRules(data)
  const bags = findOuter(rules, [{ outerBag: 'shiny gold' }])
  let outerBags = bags
  while (!isEmpty(outerBags)) {
    outerBags = findOuter(rules, outerBags)
    bags.push(...outerBags)
  }
  return uniqBy(bags, 'outerBag').length
}

const findInner = (rules, bags) => {
  return flatten(map(bags, bag => {
    return map(
      filter(rules, rule => isEqual(rule.outerBag, bag.type)),
      ruleBag => {
        return { type: bag.type, number: bag.number, inner: findInner(rules, get(ruleBag, 'innerBags')) }
      }
    )
  }))
}

const countBags = (bags) => reduce(bags, (acc, bag) =>
  !isEmpty(bag.inner)
  ? acc + bag.number + bag.number * countBags(bag.inner)
  : acc + bag.number, 0)

const part2 = (data) => {
  const myBag = { type: 'shiny gold', number: 1 }
  const rules = getRules(data)
  const bags = findInner(rules, [myBag])
  return countBags(bags) - myBag.number
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\n/g)
  const bags = part1(input)
  console.log(bags)
  const sumBags = part2(input)
  console.log(sumBags)
})