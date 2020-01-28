import React, {Component} from 'react'


export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guess: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      guess: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.props.incorporateGuess(this.state.guess)
    // this.props.guesses.includes(guess)
    if (this.state.guess === 1) {
      this.setState({invalid: true})
      setTimeout(() => {
        this.setState({invalid: false})}, 3000
      )
    }
    else {

    }
  }

  render() {
    return(
    <div>
      <form>
      {this.state.invalid ? <div>You have guessed this guess before...</div>: null}

        <div class="col-25">
        <label htmlFor="type">Guess:</label>
        </div>
        <div class="col-75">
        <input type ="text" name="guess" onChange={this.handleChange}/>
        </div>

        <button type="button" onClick={this.handleSubmit}>
        Submit Guess
        </button>

      </form>
    </div>
    )}

}



