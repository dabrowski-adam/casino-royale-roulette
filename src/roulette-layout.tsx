/**
 * @class RouletteLayout
 */

import * as React from 'react'

import IRoulette, { Field } from './roulette'
import EuropeanRoulette from './european-roulette'
import AmericanRoulette from './american-roulette'

export type Props = {
  onSpin: (money: number) => void,
  money: number,
}

type State = {
  selectedNumbers: number[],
  selectedRoulette: IRoulette,
  simultaneousSpins: number,
}

export default class RouletteLayout extends React.Component<Props, State> {
  state = {
    selectedNumbers: [0], // TODO: Remove this default
    selectedRoulette: new EuropeanRoulette(),
    simultaneousSpins: 1,
  }

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedNumbers: [Number.parseInt(e.target.value)] })
  }

  handleBet = () => {
    const { money, onSpin } = this.props
    const { selectedNumbers, selectedRoulette } = this.state

    const bet = money * 0.1
    const result = selectedRoulette.Bet(selectedNumbers, bet) // TODO: Choosing bet amount
    onSpin(money - bet + result)
  }

  toggleRoulette = () => {
    const { selectedRoulette } = this.state
    if (selectedRoulette instanceof EuropeanRoulette) {
      this.setState({ selectedRoulette: new AmericanRoulette() })
    } else {
      this.setState({ selectedRoulette: new EuropeanRoulette() })
    }
  }

  renderToggle = () => {
    const { selectedRoulette } = this.state
    if (selectedRoulette instanceof EuropeanRoulette) {
      return <button onClick={this.toggleRoulette}>European Variant</button>
    } else {
      return <button onClick={this.toggleRoulette}>American Variant</button>
    }
  }

  renderField = (field: Field) =>
    <option value={field.number} key={field.number}>
      {field.number}
    </option>

  renderTrack = (fields: Field[]) =>
    <select onChange={this.handleChange}>
      {fields.map(field => this.renderField(field))}
    </select>

  render() {
    const { selectedRoulette } = this.state

    return (
      <div>
        {this.renderToggle()}
        {this.renderTrack(selectedRoulette.fields)}
        <button onClick={this.handleBet}>Bet</button>
      </div>
    )
  }
}
