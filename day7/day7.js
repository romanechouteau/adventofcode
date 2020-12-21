const fs = require('fs')
const { split, trim, isArray, map, compact, isUndefined, isEqual, parseInt, filter, some, find, isEmpty, uniqBy, flatten, get } = require('lodash')

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
  const bags = filter(rules, rule => some(rule.innerBags, bag => isEqual(bag.type, myBag)))
  const bags = findOuter()
  let innerBags = bags
  while (!isEmpty(innerBags)) {
    innerBags = findOuter(rules, innerBags)
    bags.push(...innerBags)
  }
  return uniqBy(bags, 'outerBag').length
}

const findInner = (rules, bags) => {

}

const part2 = (data) => {
  const myBag = 'shiny gold'
  const rules = getRules(data)
  const bags = get(find(rules, rule => isEqual(rule.outerBag, myBag)), 'innerBags')
  console.log(bags)
  const inner = map(bags, bag => {
    return get(find(rules, rule => isEqual(rule.outerBag, bag.type)), 'innerBags')
  })
  console.log(inner)
  // let innerBags = bags
  // while (!isEmpty(innerBags)) {
  //   innerBags = findOuter(rules, innerBags)
  //   bags.push(...innerBags)
  // }
  // return uniqBy(bags, 'outerBag').length
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = split(trim(data), /\n/g)
  const bags = part1(input)
  // console.log(bags)
  // const sumBags = part2(input)
  // console.log(sumBags)
})