import React, {Component} from 'react'
import Instructions from './instructions'
import Game from './game'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficultyLevel: '',
      phase: 'instructions'
    }
  }

  incorporateUpdates() {
    this.setState({

    })
  }

  render() {
    return(
    <div>
      {this.state.phase === "instructions" ?<Instructions></Instructions> : null}
      {this.state.phase === "game" ?<Game></Game>: null}
    </div>
    )
  }
}
