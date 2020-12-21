const fs = require('fs')
const { split, trim, isEqual, parseInt, map, get, indexOf, filter } = require('lodash')

const runProgram = (data) => {
  const commands = JSON.parse(JSON.stringify(data))
  let acc = 0
  let stop = false
  let index = 0
  while (isEqual(stop, false) && index < commands.length) {
    const command = commands[index]
    if (command.times > 0) {
      stop = true
    } else {
      if (isEqual(get(command, 'operation'), 'acc')) {
        acc += get(command, 'number', 0)
        index += 1
      } else if (isEqual(get(command, 'operation'), 'jmp')) {
        index += get(command, 'number', 0)
      } else if (isEqual(get(command, 'operation'), 'nop')) {
        index += 1
      }
      command.times += 1
    }
  }
  return { acc, stop }
}

const part1 = (data) => {
  const { acc, stop } = runProgram(data)
  return acc
}
const part2 = (data) => {
  let index, acc
  for (let i = 0; i < data.length; i++) {
    if (isEqual(get(data[i], 'operation'), 'jmp') || isEqual(get(data[i], 'operation'), 'nop')) {
      const commands = JSON.parse(JSON.stringify(data))
      commands[i].operation = isEqual(get(commands[i], 'operation'), 'jmp') ? 'nop' : 'jmp'
      const { acc: thisAcc, stop } = runProgram(commands)
      if (isEqual(stop, false)) {
        index = i
        acc = thisAcc
        break
      }
    }
  }
  return acc
}


fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = map(split(trim(data), /\n/g), command => {
    const arr = split(command, ' ')
    const operation = arr[0]
    const number = parseInt(arr[1])
    return { operation, number, times: 0 }
  })
  const acc = part1(input)
  console.log(acc)
  const acc2 = part2(input)
  console.log(acc2)
})