import React, {Component} from 'react'

export default class Instructions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  chooseDifficulty(difficulty) {
    const difficulties = {
      "easy": 4,
      "medium": 7,
      "hard": 10
    }
    const numberOfDigits = difficulties[difficulty]
    this.props.incorporateUpdates(numberOfDigits)
  }

  render() {
  return (
    <div>
      <h1>Mastermind Game</h1>
      <p>
        Hello! This game is called Mastermind. Please choose a game difficulty. This will control number of guesses.
      </p>
    <button className="custom-btn btn-1" type="button" onClick={() => this.chooseDifficulty("easy")}>
    Easy
    </button>
    <button className="custom-btn btn-1" type="button" onClick={() =>this.chooseDifficulty("medium")}>
    Medium
    </button>
    <button className="custom-btn btn-1" type="button" onClick={() => this.chooseDifficulty("hard")}>
    Hard
    </button>
    </div>
  )}
}
