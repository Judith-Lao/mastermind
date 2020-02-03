import React, {Component} from 'react'
import { expect } from "chai"
import Enzyme, {shallow, mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

import Mastermind from './app'

describe("Mastermind", () => {
  let mastermindWrapper;
  beforeEach("Create <Mastermind />", () => {
    mastermindWrapper = shallow(<Mastermind />)
    if (mastermindWrapper.instance().componentDidMount) {
      mastermindWrapper.instance().componentDidMount()
    }
  })

  it("starts with an initial state having an empty guesses array, a guess of 0, and invalid to be false, lose to be null, and open to be false", () => {
    const currentState = mastermindWrapper.state()
    expect(currentState.guesses).to.be.deep.equal([])
    expect(currentState.guess).to.be.deep.equal(0)
    expect(currentState.invalid).to.be.deep.equal(false)
    expect(currentState.lose).to.be.deep.equal(null)
    expect(currentState.open).to.be.deep.equal(false)
  })

  let firstGuess = {1000: "No feedback"}

  it("sets firstGuess onto state", () => {
    //submit firstGuess
    const currentState = mastermindWrapper.state()
    expect(currentState.guesses).to.be.deep.equal([firstGuess])
    expect(currentState.guess).to.be.deep.equal(1000)
  })

})
