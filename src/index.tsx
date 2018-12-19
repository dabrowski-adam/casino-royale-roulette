/**
 * @class Roulette
 */

import * as React from 'react'
import * as PropTypes from 'prop-types'

import RouletteLayout from './roulette-layout'
import styles from './styles.css'
import PlayerData from './player-data'

export type Props = {
  player: PlayerData,
  update: (player: PlayerData) => void,
  close: () => void,
}

export default class Roulette extends React.Component<Props> {
  handleSpin = (money: number) => {
    const { update, player } = this.props
    update({ ...player, money})
  }

  render() {
    const { player, close } = this.props

    return (
      <div className={styles.test}>
        <h1>Roulette</h1>
        <p>Balance: €{player.money}</p>
        <p>Achievements: {player.achievements.length}</p>
        <button onClick={close}>✖ CLOSE</button>
        <RouletteLayout onSpin={this.handleSpin} money={player.money} />
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
