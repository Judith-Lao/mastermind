# Mastermind

Setup

Git clone to local machine.
Run npm install then npm run start in terminal.
Open localhost:8080.

Code structure

The app folder contains the application, which is built entirely on the front end. Index.js has a ReactDOM.render, which hooks onto the app node in the index.html and renders out our application. App.js contains the game logic, while modal.js has independent logic on opening and closing a popup for telling the user whether they have lost or won the game.


App.js

When the component mounts, the random integer API call is made and mapped over so that every unique character is in a hashtable for easy access later on. When a guess is submitted, a guess object is created with the number as the key and the comment as the value. The logic that assigns the comments is written in a certain order so that the comment is reassigned to be the most relevant comment (ie You got it right > at least one number is in the proper location > at least one number is correct > no feedback). This guess object is pushed onto the guesses array, which is good because the array is inherently ordered with indexes that can be mapped over. Once it's pushed onto the guesses array, we check if the game is over (if we've either lost, because we're out of guesses and the last guess is not the correct answer, or if we've won, because the last guess is the right answer).


Describe any creative extensions attempted or implemented

Implemented a modal in modal.js that displays when this.state.open in app.js is true, and closes once a user clicks anywhere on the modal (and since the modal is the full screen, this guarantees that the user will "click out"). According to React documentation: "This (getDerivedStateFromProps) method exists for rare use cases where the state depends on changes in props over time." It's called on updates, so it can watch for when the open prop is true. This sticks a modal onto the document body, and then closes it out with className display is none.

A user can choose game difficulty (between easy, medium, and hard) that sets the amount of guesses/tries that a user has to 10, 7, or 3 respectively. Once the difficulty is picked, the counter state goes from "Choose a level to find out" to one of those numbers, that then gets decremented every time a user submits a guess. Picking the difficulty hides the buttons, so that a user cannot reset their counter partway through the game while keeping their guesses and computer generated number constant. Initially, I thought this could be avoided is resetting the state every time the difficulty level is picked, but this would not reset the computer generated number as API calls are best made in componentDidMount. This way, it guarantees that the React component will render and then update based on the API call, instead of rendering before the API call is complete.

Game Rules
This mastermind game can be played by a user "against" the computer. This is a game where a player tries to guess the number combinations. At the end of each attempt to guess the 4 number combinations, the computer will provide feedback whether the player had guess a number correctly, or/and a number and digit correctly. A player must guess the right number combinations within 10 attempts to win the game.
