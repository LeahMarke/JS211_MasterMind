"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
let solution = "";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateHint = (guess) => {
  let solutionArray = solution.split("");
  // console.log("The solution array is:", solutionArray);
  let guessArray = guess.split("");
  // console.log("The guess array is:", guessArray);

  let correctLetterLocations = 0;
  let correctLetters = 0;
  solutionArray.forEach((letter, index) => {
    // console.log(
    //   `Does the solution letter: ${letter} equal the guess letter: ${guessArray[index]}`
    // );
    if (letter === guessArray[index]) {
      correctLetterLocations++;
      solutionArray[index] = null;
    }
    let targetIndex = solutionArray.indexOf(guessArray[index]);
    // console.log(
    //   "Target index: index of solution that matches guess:",
    //   targetIndex
    // );
    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[solutionArray.indexOf(guessArray[index])] = null;
    }
    // console.log(guessArray[index]);
    // console.log(index);
    // console.log(solutionArray);
  });
  // console.log("number of letters in correct location:", correctLetterLocations);
  let hint = `${correctLetterLocations}-${correctLetters}`;
  board.push(`${guess}, ${hint}`);
  return hint;
  // for (let i = 0; i < 4; i++) {
  //   if (guessArray[i] == solutionArray[i]) {
  //     correctLetterLocations++;
  //     solutionArray[i] = "Z";
  //   } else if (solutionArray.indexOf(guessArray[i]) > -1) {
  //     correctLetters++;
  //     solutionArray[solutionArray.indexOf(guessArray[i])] = "X";
  //   }
  // }
  // let targetIndex = solutionArray.indexOf(guessArray[i]);
  // return `${correctLetterLocations}-${correctLetters}`;
};

const mastermind = (guess) => {
  solution = "abcd"; // Comment this out to generate a random solution
  if (guess === solution) {
    return `You guessed it!`;
  } else {
    generateHint(guess);
  }
  // let hint = generateHint(guess);
  // board = board.push(`${guess}, ${hint}`);
  // if (board.length == 10) {
  //   return `You ran out of turns! The solution was ${solution}`;
  // } else {
  //   return `Guess again...`;
  // }
  // ?start game
  // ?determine winner
  // ?determine loser
};

const getPrompt = () => {
  rl.question("guess: ", (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
};

// Tests

if (typeof describe === "function") {
  solution = "abcd";
  describe("#mastermind()", () => {
    it("should register a guess and generate hints", () => {
      mastermind("aabb");
      assert.equal(board.length, 1);
    });
    it("should be able to detect a win", () => {
      assert.equal(mastermind(solution), "You guessed it!");
    });
  });

  describe("#generateHint()", () => {
    it("should generate hints", () => {
      assert.equal(generateHint("abdc"), "2-2");
    });
    it("should generate hints if solution has duplicates", () => {
      assert.equal(generateHint("aabb"), "1-1");
    });
  });
} else {
  generateSolution();
  getPrompt();
}
