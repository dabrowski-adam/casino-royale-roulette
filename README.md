# casino-royale-roulette

> The Roulette component for the Casino Royale project.

[![NPM](https://img.shields.io/npm/v/casino-royale-roulette.svg)](https://www.npmjs.com/package/casino-royale-roulette) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save casino-royale-roulette
```

## Usage

```tsx
import * as React from 'react'

import Roulette from 'casino-royale-roulette'

class Example extends React.Component {
  render () {
    const props = {
      player: {
        money: 1337,
        achievements: [{}],
      },
      update: (player) => { window.alert(`UPDATE :: €${player.money}`) },
      close: () => { window.alert('CLOSE') },
    }

    return (
      <div>
        <Roulette {...props} />
      </div>
    )
  }
}
```

## License

MIT © [dabrowski-adam](https://github.com/dabrowski-adam)
