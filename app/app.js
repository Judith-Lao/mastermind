import React, {Component} from 'react'
import axios from 'axios'

export default class Mastermind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [],
      guess: 0,
      counter: 0,
      number: 0,
      numberHT: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    let {data} = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=7&base=10&format=plain&rnd=new")
    let number = data.replace(/\s/g,'')
    let ht = {}
    for (let i = 0; i<number.length; i++) {
      ht[number[i]] = i
    }
    this.setState({
      number: +number,
      numberHT: ht
    })
    console.log("hash", ht)
  }

  handleChange(event) {
    this.setState({
      guess: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let newCounter = this.state.counter
    newCounter++
    let guessObject = {}
    let comment;
    if (this.state.number == this.state.guess) {
      comment = "You got it right!"
    }

    else {
      let guess = String(this.state.guess)
      let number = String(this.state.number)
      for (let i=0; i<guess.length; i++) {
        if (guess[i] in this.state.numberHT) {
          comment = "at least one number is correct"
        }
      }
      for (let i=0; i<guess.length; i++) {
          if (guess[i] === number[i]) {
            comment = "at least one number at location is correct"
          }
      }
      if (comment === undefined) {
        comment = ""
      }
    }

    guessObject[this.state.guess] = comment

    this.setState({
      guesses: [...this.state.guesses, guessObject],
      counter: newCounter
    }, ()=>{console.log("number type", this.state.counter)})

  }

  render() {
    return(
      <div>
        <div>{this.state.number}</div>
        <div>{this.state.guesses.map(guess => {
          return (
            <div>
            <div>{Object.keys(guess)}</div>
            <div>{Object.values(guess)}</div>
            </div>
          )
        })}</div>


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
