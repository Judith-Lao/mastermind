import React, {Component} from 'react'
import { expect } from "chai"
import Enzyme, {shallow, mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() });

// import Mastermind from './app'

// describe("Mastermind", () => {
//   let mastermindWrapper;
//   beforeEach("Create <Mastermind />", () => {
//     mastermindWrapper = shallow(<Mastermind />);
//     if (mastermindWrapper.instance().componentDidMount) {
//       mastermindWrapper.instance().componentDidMount();
//     }
//   });
//   it("starts with an initial state having an empty guesses array", () => {
//     const currentState = mastermindWrapper.state();
//     expect(currentState.guesses).to.be.deep.equal([]);
//   });
// })
