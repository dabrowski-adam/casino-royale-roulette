import React, { Component } from 'react'

import Roulette from 'casino-royale-roulette'

export default class App extends Component {
  render () {
    const props = {
      player: {
        money: 1337,
        achievements: [{}],
      },
      update: () => { window.alert('UPDATE'); },
      close: () => { window.alert('CLOSE'); },
    }

    return (
      <div>
        <Roulette {...props} />
      </div>
    )
  }
}
