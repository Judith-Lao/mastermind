import React, {Component} from 'react'
import axios from 'axios'
import Input from './input'

export default class Mastermind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [],
      counter: 0,
      number: 0
    }
    this.incorporateGuess = this.incorporateGuess.bind(this)
  }

  async componentDidMount() {
    let {data} = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=7&base=10&format=plain&rnd=new")
    this.setState({
      number: data
    })
  }

  async incorporateGuess(guess) {
    await this.setState({
      guesses: [...this.state.guesses, guess]
    })
    console.log("submitguess2",this.state.guesses)
  }


  render() {
    return(
      <div>
        <div>{this.state.number}</div>
        <div>{this.state.guesses}</div>
        {/* <div>{this.state.guesses.map(guess => <Guess></Guess>)</div> */}
      <div>Setting Up</div>
      <Input incorporateGuess={this.incorporateGuess} ></Input>
      </div>
    )

  }

}
