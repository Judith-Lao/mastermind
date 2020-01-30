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
      numberHT: {},
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputRef = React.createRef()
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
    console.log("hash", ht) //ht is a string: number
  }

  handleChange(event) {
    this.setState({
      guess: event.target.value //guess is a number
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (String(this.state.guess) === "0" || String(this.state.guess).length !== 4) {
      this.setState({invalid: true})
      setTimeout(() => {
        this.setState({invalid: false})}, 1000
      )
      return
    }
    //increment the counter
    let newCounter = this.state.counter
    newCounter++
    //make the guess
    let guess = this.createGuessObject()

    //put counter and guess on state, then reset the guess
    this.setState({
      guesses: [...this.state.guesses, guess],
      counter: newCounter,
      guess: 0,
    }, ()=>{console.log("number type", this.state.counter)})
    this.inputRef.current.value = null
  }

  createGuessObject(){
    let guessObject = {} //number:string
    let comment;
    if (this.state.number == this.state.guess) {
      comment = "You got it right!"
    }
    else {
      let guess = String(this.state.guess)
      for (let i=0; i<guess.length; i++) {
        if (guess[i] in this.state.numberHT) {
          comment = "at least one number is correct"
        }
      }
      let number = String(this.state.number)
      for (let i=0; i<guess.length; i++) {
          if (guess[i] === number[i]) {
            comment = "at least one number is in the proper location"
          }
      }
      if (comment === undefined) {
        comment = "No feedback"
      }
    }
    guessObject[this.state.guess] = comment
    return guessObject
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
        {this.state.invalid === true ? <div>Please make a new guess with four digits</div>: null}
          <br></br>
          <br></br>
          <br></br>

          <div class="col-25">
          <label htmlFor="type">Guess:</label>
          </div>
          <div class="col-75">
          <input type ="text" name="guess" onChange={this.handleChange} ref={this.inputRef}/>
          </div>

          <button type="button" onClick={this.handleSubmit}>
          Submit Guess
          </button>

        </form>


      </div>
    )

  }

}
