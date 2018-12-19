import IRoulette, { Field } from './roulette'

const isBlack = (number: number): boolean => {
  if (number === 0) { return false; }

  if ((number >= 1 && number <= 10) || (number >= 19 && number <= 28)) {
    return number % 2 === 0
  }

  return number % 2 !== 0
}

const getColor = (number: number): ('RED' | 'BLACK' | 'GREEN') => {
  if (number === 0) { return 'GREEN' }

  return isBlack(number) ? 'BLACK' : 'GREEN'
}

export default class AmericanRoulette implements IRoulette {
  fields: Field[];

  constructor() {
    this.fields = [...Array(37).keys()].map(number => ({ number, color: getColor(number) }))
    this.fields = [{ number: 0, color: 'GREEN' }, ...this.fields] // add 00
  }

  Bet(_numbers: number[], _money: number) {
    return 42
  }
}
