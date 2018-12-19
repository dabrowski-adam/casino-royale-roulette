/**
 * @class Roulette
 */

import * as React from 'react'
import * as PropTypes from 'prop-types'

import styles from './styles.css'
import PlayerData from './player-data'
import IRoulette from './roulette'
import EuropeanRoulette from './european-roulette'
// import AmericanRoulette from './american-roulette'

export type Props = {
  player: PlayerData,
  update: (player: PlayerData) => void,
  close: () => void,
}

type State = {
  selectedNumbers: number[], // TODO: Make a field type
  selectedRoulette: IRoulette,
  simultaneousSpins: number,
}

export default class Roulette extends React.Component<Props, State> {
  state = {
    selectedNumbers: [],
    selectedRoulette: new EuropeanRoulette(), // TODO: Add a default Roulette
    simultaneousSpins: 1,
  }

  render() {
    const { player, close } = this.props

    return (
      <div className={styles.test}>
        <h1>Roulette</h1>
        <p>Balance: €{player.money}</p>
        <p>Achievements: {player.achievements.length}</p>
        <button onClick={close}>✖ CLOSE</button>
      </div>
    )
  }

  // We do not need those propTypes
  // but they will be helpful to consumers of our component
  // who use JavaScript and do not see our types.
  static propTypes = {
    player: PropTypes.shape({
      money: PropTypes.number,
      achievements: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOf(['FIRST_GAME', 'TEN_GAMES_WON', 'HAT_TRICK']),
        name: PropTypes.string,
        description: PropTypes.string,
        current: PropTypes.number,
        target: PropTypes.number,
      })),
    }),
    update: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  }
}
