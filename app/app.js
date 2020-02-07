import React, {Component} from 'react'
import Instructions from './instructions'
import Game from './game'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfDigits: 0,
      phase: 'instructions'
    }
    this.incorporateUpdates = this.incorporateUpdates.bind(this)
  }

  async incorporateUpdates(numberOfDigits) {
    //incorporating updates from instructions page
    await this.setState({
      numberOfDigits
    })
    this.setState({
      phase: "game"
    })
  }

  render() {
    return(
    <div>
      {this.state.phase === "instructions" ?<Instructions incorporateUpdates={this.incorporateUpdates}></Instructions> : null}
      {this.state.phase === "game" ?<Game numberOfDigits={this.state.numberOfDigits}></Game>: null}
    </div>
    )
  }
}
