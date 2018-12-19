import IRoulette from './roulette'

export default class AmericanRoulette implements IRoulette {
  Bet(_numbers: number[], _money: number) {
    return 42
  }
}
