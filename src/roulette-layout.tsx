/**
 * @class RouletteLayout
 */

import * as React from 'react'

import IRoulette from './roulette'
import EuropeanRoulette from './european-roulette'
import AmericanRoulette from './american-roulette';
// import AmericanRoulette from './american-roulette'

export type Props = {
  onSpin: (money: number) => void,
  money: number,
}

type Field = {
  number: number,
  color: "RED" | "BLACK",
}

type State = {
  selectedNumbers: Field[], // TODO: Make a field type
  selectedRoulette: IRoulette,
  simultaneousSpins: number,
}

export default class RouletteLayout extends React.Component<Props, State> {
  state = {
    selectedNumbers: [],
    selectedRoulette: new EuropeanRoulette(),
    simultaneousSpins: 1,
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

  render() {
    return (
      <div>
        {this.renderToggle()}
      </div>
    )
  }
}
