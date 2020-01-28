import React, {Component} from 'react'
import axios from 'axios'
import Input from './input'

export default class Mastermind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [],
      guess: 0,
      counter: 0,
      number: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    let {data} = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=7&base=10&format=plain&rnd=new")
    let number = data.replace(/\s/g,'')
    this.setState({
      number: +number
    })
  }

  handleChange(event) {
    this.setState({
      guess: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let guessObject = {}
    let comment;
    if (this.state.number == this.state.guess) {
      comment = "You got it right!"
    }

    guessObject[this.state.guess] = comment
    this.setState({
      guesses: [...this.state.guesses, guessObject]
    }, ()=>{console.log("number type", this.state.guesses)})

  }

  render() {
    return(
      <div>
        <div>{this.state.number}</div>
        {/* <div>{this.state.guesses.map()}</div> */}


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
    )

  }

}
