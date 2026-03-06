const readline = require('readline-sync');

class TTTGame {
  static GAMES_TO_WIN = 3;
  static MIDDLE_SQUARE = 5;
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';
  static WINNING_LINES = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]

  constructor() {
    this.game = new Board();
    this.human = new Human(TTTGame.HUMAN_MARKER);
    this.computer = new Computer(TTTGame.COMPUTER_MARKER)
  }

  displayBoard() {
    this.game.display()
  }

  humanChoice() {
    return this.human.chooseSquare(this.game.board);
  }

  humanMove() {
    let humanSquare = this.humanChoice();
    this.markBoard(humanSquare, TTTGame.HUMAN_MARKER)
  }

  computerChoice() {
    return (this.getSquare(this.computer)
      || this.getSquare(this.human)
      || this.getMiddleSquare()
      || this.computer.chooseSquare(this.game.board));
  }

  getSquare(player) {
    for (let row of TTTGame.WINNING_LINES) {
      let emptySquares = row.filter(square => this.getMarker(square) === Board.SQUARE)
      let playerMarkers = row.filter(square => this.getMarker(square) === player.marker)
      if (emptySquares.length === 1 && playerMarkers.length === 2) {
        return emptySquares[0]
      }
    }
    return null;
  }

  getMiddleSquare() {
    if (this.getMarker(TTTGame.MIDDLE_SQUARE) === Board.SQUARE) {
      return TTTGame.MIDDLE_SQUARE
    }
    return null;
  }


  computerMove() {
    let computerSquare = this.computerChoice();
    this.markBoard(computerSquare, TTTGame.COMPUTER_MARKER)
  }

  markBoard(square, marker) {
    this.game.mark(square, marker)
  }

  getMarker(position) {
    return this.game.marker(position)
  }

  isWinner(player) {
    for (let row of TTTGame.WINNING_LINES) {
      if (row.every(square => this.getMarker(square) === player.marker)) {
        return true
      }
    }
    return false;
  }

  boardFull() {
    return this.game.isFull();
  }

  winnerFound() {
    return this.isWinner(this.human) || this.isWinner(this.computer)
  }

  play() {
    this.displayBoard();

    while (true) {
      this.humanMove()
      this.displayBoard();
      if (this.boardFull() || this.winnerFound()) break;

      this.computerMove();
      this.displayBoard();
      if (this.boardFull() || this.winnerFound()) break;

    }

    if (this.winnerFound()) {
      if (this.isWinner(this.human)) {
        console.log('Congrats, you won!')
        return 'Human'
      } else {
        console.log('Boohoo, you lost!')
        return 'Computer'
      }
    } else {
      console.log('Tie game!')
      return 'Tie'
    }

  }

  bestOfThree() {
    let humanWins = 0;
    let computerWins = 0;

    while (true) {
      console.log(`Human: ${humanWins}`)
      console.log(`Computer: ${computerWins}`)

      if (humanWins === 3 || computerWins === 3) {
        break;
      }

      let result = this.play();
      if (result === 'Human') {
        humanWins += 1
      } else if (result === 'Computer') {
        computerWins += 1
      }
      this.game.resetBoard();
    }

    if (humanWins > computerWins) {
      console.log('You win this game!')
    } else {
      console.log('Computer wins everything!!')
    }

  }


}

class Board {
  static SIZE = 3;
  static SQUARE = ' '

  constructor() {
    this.resetBoard()
  }

  resetBoard() {
    this.board = {}
    for (let i = 1; i <= Board.SIZE * Board.SIZE; i += 1) {
      this.board[i] = Board.SQUARE;
    }
  }

  display() {
    let board = this.board;
    console.log(`     |     |  `)
    console.log(`  ${board[1]}  |  ${board[2]}  |  ${board[3]}`)
    console.log(`     |     |  `)
    console.log(`-----+-----+-----`)
    console.log(`     |     |  `)
    console.log(`  ${board[4]}  |  ${board[5]}  |  ${board[6]}`)
    console.log(`     |     |  `)
    console.log(`-----+-----+-----`)
    console.log(`     |     |  `)
    console.log(`  ${board[7]}  |  ${board[8]}  |  ${board[9]}`)
    console.log(`     |     |  `)
  }

  isFull() {
    return Object.keys(this.board).filter(key => this.board[key] === Board.SQUARE).length === 0;
  }

  mark(position, marker) {
    this.board[position] = marker;
  }

  marker(position) {
    return this.board[position]
  }
}

class Human {
  constructor(marker) {
    this.marker = marker;
  }

  chooseSquare(board) {
    let freeSquares = Object.keys(board).filter(key => board[key] === ' ');
    let choice;

    while (true) {
      const prompt = `Choose a square (${freeSquares.join(', ')}): `
      choice = readline.question(prompt);
      if (freeSquares.includes(choice)) {
        break;
      } else {
        console.log('Sorry, that\'s not a valid choice.');
      }

    }
    return choice;
  }
}

class Computer {
  constructor(marker) {
    this.marker = marker;
  }

  chooseSquare(board) {
    let freeSquares = Object.keys(board).filter(key => board[key] === ' ');
    let randomChoice = Math.floor(Math.random() * freeSquares.length)
    return freeSquares[randomChoice]
  }
}


let game = new TTTGame()
game.bestOfThree();
