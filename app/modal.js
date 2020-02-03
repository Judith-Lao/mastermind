import React, {Component} from 'react'
import ReactDOM from 'react-dom'

let node = null

export default class Modal extends Component {
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

