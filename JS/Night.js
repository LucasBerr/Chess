import { Piece } from "./Piece.js";

export class Night extends Piece {
  constructor(id) {
    super(id);
  }

  initial_position() {
    if (this.id[0] === "w") {
      switch (this.id[2]) {
        case "1":
          return "B1";
        case "2":
          return "G1";
      }
    } else {
      switch (this.id[2]) {
        case "1":
          return "B8";
        case "2":
          return "G8";
      }
    }
  }

  move(boardPieces, onMove) {
    super.clearIndicators(boardPieces);
    if (this.color === onMove[0]) {
      let housesOfLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
      let currentLetter = this.position[0];
      let currentNumber = parseInt(this.position[1]);

      // Movimentos do cavalo
      const possibleMoves = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
      ];

      for (const [dx, dy] of possibleMoves) {
        const newLetter = String.fromCharCode(currentLetter.charCodeAt(0) + dx);
        const newNumber = currentNumber + dy;

        if (super.isValidSquare(newLetter + newNumber)) {
          if (
            !super.isPieceThere(boardPieces, newLetter + newNumber) ||
            super.whichPieceIs(boardPieces, newLetter + newNumber)[0] !==
              this.color
          ) {
            // Criando uma lista com apenas um movimento por conta da função
            const movement = [newLetter + newNumber];
            // Crie um indicador de movimento para cada movimento possível
            super.createMoveIndicators(movement, boardPieces, onMove);
          }
        }
      }
    }
  }
}
