import React, {Component} from 'react'
import axios from 'axios'
import Modal from './modal'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [],
      guess: 0,
      counter: 10,
      number: 0,
      numberHT: {},
      invalid: false,
      lose: null,
      open: false
    }
    this.getNewNumber = this.getNewNumber.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputRef = React.createRef()
    this.isGameOver = this.isGameOver.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  componentDidMount() {
    this.getNewNumber()
  }

  async getNewNumber() {
    const numberOfDigits = this.props.numberOfDigits
    let {data} = await axios.get(`https://www.random.org/integers/?num=${numberOfDigits}&min=0&max=7&col=7&base=10&format=plain&rnd=new`)
    let number = data.replace(/\s/g,'')
    let ht = {}
    for (let i = 0; i<number.length; i++) {
      ht[number[i]] = i
    }
    this.setState({
      number: +number,
      numberHT: ht
    })
  }

  handleChange(event) {
    this.setState({
      guess: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (String(this.state.guess).length !== this.props.numberOfDigits) {
      this.setState({invalid: true})
      setTimeout(() => {
        this.setState({invalid: false})}, 1000
      )
      return
    }
    //decrement the counter
    let newCounter = this.state.counter
    newCounter--
    //make the guess
    let guess = this.createGuessObject()

    //put counter and guess on state
    await this.setState({
      guesses: [...this.state.guesses, guess],
      counter: newCounter,
      guess: 0,
    }, ()=>{console.log("number type", this.state.counter)})

    //reset the form
    this.inputRef.current.value = null

    //check if game is over
    this.isGameOver(guess)

    //if game is over, open the modal
    if (this.state.lose === true || this.state.lose === false) {
      this.onOpen()
    }
  }

  createGuessObject(){
    let guessObject = {}
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

  isGameOver(guess) {
    if (this.state.counter === 0 && Object.values(guess)[0] !== "You got it right!") {
      this.setState({
        lose: true
      })
    }
    else if (Object.values(guess)[0] === "You got it right!") {
      this.setState({
        lose: false
      })
    }
  }

  onOpen() {
    //called in submitGuess
    this.setState({
      open: true
    })
  }
  onClose() {
    //reset the state
    this.setState({
        guesses: [],
        guess: 0,
        counter: 10,
        number: 0,
        numberHT: {},
        invalid: false,
        lose: null,
        open: false
    })
  }

  render() {
    return(
      <div>
        <div >{this.state.number} is the computer generated number</div>
        <div>{this.state.counter} guesses remaining</div>
        <div>{this.state.guesses.map(guess => {
          return (
            <div className="container">
            <div>{Object.keys(guess)} ... </div>

            <div>{Object.values(guess)}</div>
            </div>
          )
        })}</div>
        <form className="submit">
        {this.state.invalid === true ? <div>Please make a new guess with {this.props.numberOfDigits} digits</div>: null}
          <div>
          <input type ="text" name="guess" onChange={this.handleChange} ref={this.inputRef}/>
          </div>
          <br></br>

          <button className="custom-btn btn-1" type="button" onClick={this.handleSubmit}>
          Submit Guess
          </button>
        </form>
        <Modal
          open={this.state.open}
          onClose={this.onClose}
          status={this.state.lose}
        ></Modal>
      </div>
    )
  }
}
