import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class Mastermind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [],
      guess: 0,
      counter: "Choose a level to find out",
      number: 0,
      numberHT: {},
      invalid: false,
      lose: null,
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputRef = React.createRef()
    this.isGameOver = this.isGameOver.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.hide = this.hide.bind(this)
    this.clickEasy = this.clickEasy.bind(this)
    this.clickMedium = this.clickMedium.bind(this)
    this.clickHard = this.clickHard.bind(this)
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

  }

  handleChange(event) {
    this.setState({
      guess: event.target.value
    })
  }

  async handleSubmit(event) {
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
    newCounter--
    //make the guess
    let guess = this.createGuessObject()

    //put counter and guess on state, then reset the guess
    await this.setState({
      guesses: [...this.state.guesses, guess],
      counter: newCounter,
      guess: 0,
    }, ()=>{console.log("number type", this.state.counter)})
    this.inputRef.current.value = null

    //check if game is over
    this.isGameOver(guess)
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
    console.log("in isgameover", Object.values(guess)[0])
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
    this.setState({
      open: true
    })
  }
  onClose() {
    this.hide()
    this.setState({
        guesses: [],
        guess: 0,
        counter: "Choose difficulty level to find out",
        number: 0,
        numberHT: {},
        invalid: false,
        lose: null,
        open: false
    })
  }

  clickEasy() {
    this.setState({
      counter: 10
    })
    this.hide()
  }
  clickMedium() {
    this.setState({
      counter: 7
    })
    this.hide()
  }
  clickHard() {
    this.setState({
      counter: 3
    })
    this.hide()
  }
  hide() {
    let grab = document.getElementById("hide")
    if (grab.style.display === "none") {
      grab.style.display = "block"
    }
    else {
      grab.style.display = "none"
    }
  }

  render() {
    return(
      <div>
        <div id="hide">
          <button className="custom-btn btn-1" type="button" onClick={this.clickEasy}>
          Easy
          </button>
          <button className="custom-btn btn-1" type="button" onClick={this.clickMedium}>
          Medium
          </button>
          <button className="custom-btn btn-1" type="button" onClick={this.clickHard}>
          Hard
          </button>
        </div>
        <div >{this.state.number}</div>
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
        {this.state.invalid === true ? <div>Please make a new guess with four digits</div>: null}
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

let node = null

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(next) {
    node && ReactDOM.render(<Popup {...next} />, node);
    return next;
  }

  componentDidMount() {
    node = document.createElement("div")
    document.body.appendChild(node)
    ReactDOM.render(<Popup {...this.props}/>, node)
  }

  render() {
    return <p/>
  }
}

function Popup({open, onClose, status}) {
  let className = open ? "popup" : "clickedout"
  if (status === false) {
    status = "Win"
  }
  else {
    status = "Lose"
  }
  return (
    <div className={className} onClick={onClose}>
    <div> The game is over! You {status}</div>
    </div>
  )
}

