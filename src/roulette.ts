export type Field = {
  number: number,
  color: 'RED' | 'BLACK' | 'GREEN',
}

export interface IRoulette {
  fields: Field[],
  Bet: (numbers: number[], money: number) => number,
}

export default IRoulette
