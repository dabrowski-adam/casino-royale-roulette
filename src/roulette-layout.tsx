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
  bet: number,
}

export default class RouletteLayout extends React.Component<Props, State> {
  state = {
    selectedNumbers: [],
    selectedRoulette: new EuropeanRoulette(),
    simultaneousSpins: 1,
    bet: 0,
  }

  selectField = (field: Field) => {
    const { selectedNumbers } = this.state
    const isSelected = selectedNumbers.some(n => n === field.number)
    if (isSelected) {
        this.setState({ selectedNumbers: selectedNumbers.filter(n => n !== field.number)})
    } else {
        this.setState({ selectedNumbers: [...selectedNumbers, field.number] })
    }
  }

  handleSpinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { money } = this.props
    const { bet } = this.state
    const simultaneousSpins = Number.parseInt(e.target.value)

    if (simultaneousSpins * bet > money) {
      this.setState({ simultaneousSpins: Math.floor(money / bet) })
    } else {
      this.setState({ simultaneousSpins })
    }

  }

  handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { money } = this.props
    const { simultaneousSpins } = this.state
    const bet = Number.parseInt(e.target.value)

    if (simultaneousSpins * bet < money) {
      this.setState({ bet })
    } else {
      this.setState({ bet: Math.floor(money / simultaneousSpins) })
    }
  }

  handleBet = () => {
    const { money, onSpin } = this.props
    const { bet, selectedNumbers, selectedRoulette, simultaneousSpins } = this.state

    if (bet > money) {
      window.alert('You do not have enough money.')
      return
    }

    if (selectedNumbers.length === 0) {
      window.alert(`You haven't selected any fields.`)
      return
    }

    const result = [...Array(simultaneousSpins).keys()].reduce(total => total + selectedRoulette.Bet(selectedNumbers, bet), 0)
    onSpin(money - (simultaneousSpins * bet) + result)
  }

  toggleRoulette = () => {
    const { selectedRoulette } = this.state
    if (selectedRoulette instanceof EuropeanRoulette) {
      this.setState({ selectedRoulette: new AmericanRoulette(), selectedNumbers: [] })
    } else {
      this.setState({ selectedRoulette: new EuropeanRoulette(), selectedNumbers: [] })
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

  renderField = (field: Field) => {
    const { selectedNumbers } = this.state
    const isSelected = selectedNumbers.some(n => n === field.number)

    return (
      <td onClick={() => this.selectField(field)} style={{ background: field.color, color: 'white', textAlign: 'center' }}>
        {
          isSelected
            ? <div style={{ fontSize: '0.75em' }}>⬤</div>
            : field.number == -1 ? '00' : field.number
        }
      </td>
    )
  }

  renderTrack = (fields: Field[]) => {
    const { selectedRoulette } = this.state
    if (selectedRoulette instanceof EuropeanRoulette) {
      return (
        <table>
          <tr>
            {this.renderField(fields[0])}
          </tr>
          {[...Array(Math.floor((fields.length - 1) / 3)).keys()].map(n =>
            <tr key={n}>
              {this.renderField(fields[n * 3 + 1])}
              {this.renderField(fields[n * 3 + 2])}
              {this.renderField(fields[n * 3 + 3])}
            </tr>
          )}
        </table>
      )
    } else {
      return (
        <table>
          <tr>
            {this.renderField(fields[1])}
            {this.renderField(fields[0])}
          </tr>
          {[...Array(Math.floor((fields.length - 2) / 3)).keys()].map(n =>
            <tr key={n}>
              {this.renderField(fields[n * 3 + 2])}
              {this.renderField(fields[n * 3 + 3])}
              {this.renderField(fields[n * 3 + 4])}
            </tr>
          )}
        </table>
      )
    }
  }

  render() {
    const { selectedRoulette, bet, simultaneousSpins } = this.state

    return (
      <div>
        {this.renderToggle()}
        {this.renderTrack(selectedRoulette.fields)}
        <div style={{ fontSize: 12 }}>
          <input type="number" onChange={this.handleSpinChange} value={simultaneousSpins} /> simultaneous spins
        </div>
        <input type="number" onChange={this.handleBetChange} value={bet} />
        <button onClick={this.handleBet}>Bet</button>
      </div>
    )
  }
}
