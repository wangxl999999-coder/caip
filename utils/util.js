const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const generateOrderNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = formatNumber(now.getMonth() + 1)
  const day = formatNumber(now.getDate())
  const hour = formatNumber(now.getHours())
  const minute = formatNumber(now.getMinutes())
  const second = formatNumber(now.getSeconds())
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `${year}${month}${day}${hour}${minute}${second}${random}`
}

const calculateSum = numbers => {
  return numbers.reduce((sum, num) => sum + num, 0)
}

const calculateSpan = numbers => {
  const sorted = [...numbers].sort((a, b) => a - b)
  return sorted[sorted.length - 1] - sorted[0]
}

const calculateOddEven = numbers => {
  let odd = 0
  let even = 0
  numbers.forEach(num => {
    if (num % 2 === 0) {
      even++
    } else {
      odd++
    }
  })
  return `${odd}:${even}`
}

const checkWin = (betNumbers, resultNumbers) => {
  const redMatch = betNumbers.red.filter(num => resultNumbers.red.includes(num)).length
  const blueMatch = betNumbers.blue === resultNumbers.blue ? 1 : 0
  
  let level = 0
  let prize = 0
  
  if (redMatch === 6 && blueMatch === 1) {
    level = 1
    prize = 5000000
  } else if (redMatch === 6 && blueMatch === 0) {
    level = 2
    prize = 200000
  } else if (redMatch === 5 && blueMatch === 1) {
    level = 3
    prize = 3000
  } else if ((redMatch === 5 && blueMatch === 0) || (redMatch === 4 && blueMatch === 1)) {
    level = 4
    prize = 200
  } else if ((redMatch === 4 && blueMatch === 0) || (redMatch === 3 && blueMatch === 1)) {
    level = 5
    prize = 10
  } else if ((redMatch === 2 && blueMatch === 1) || (redMatch === 1 && blueMatch === 1) || (redMatch === 0 && blueMatch === 1)) {
    level = 6
    prize = 5
  }
  
  return { level, prize, redMatch, blueMatch }
}

module.exports = {
  formatTime,
  generateOrderNo,
  calculateSum,
  calculateSpan,
  calculateOddEven,
  checkWin
}