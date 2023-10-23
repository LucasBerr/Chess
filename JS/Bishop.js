import { Piece } from "./Piece.js";

export class Bishop extends Piece {
  constructor(id) {
    super(id);
  }

  initial_position() {
    if (this.id[0] === "w") {
      switch (this.id[2]) {
        case "1":
          return "C1";
          break;
        case "2":
          return "F1";
          break;
      }
    } else {
      switch (this.id[2]) {
        case "1":
          return "C8";
          break;
        case "2":
          return "F8";
          break;
      }
    }
  }

  move(boardPieces, onMove) {
    super.clearIndicators(boardPieces);
    if (this.color === onMove[0]) {
      const currentLetter = this.position[0];
      const currentNumber = parseInt(this.position[1]);

      // Defina as direções de movimento (diagonal)
      const directions = [
        [-1, 1], // Movimento superior esquerda
        [1, 1], // Movimento superior direita
        [-1, -1], // Movimento inferior esquerda
        [1, -1], // Movimento inferior direita
      ];

      for (const [dx, dy] of directions) {
        let newLetter = currentLetter;
        let newNumber = currentNumber;
        let movements = [];

        while (true) {
          newLetter = String.fromCharCode(newLetter.charCodeAt(0) + dx);
          newNumber += dy;

          const newPosition = newLetter + newNumber;
          if (!super.isValidSquare(newPosition)) {
            break; // Sai do loop se estiver fora do tabuleiro
          }
          if (super.isPieceThere(boardPieces, newPosition)) {
            const pieceInHouse = super.whichPieceIs(boardPieces, newPosition);
            if (pieceInHouse[0] !== this.color) {
              // Adicione apenas se a casa contiver uma peça de cor diferente
              movements.push(newPosition);
            }
            break; // Sai do loop se encontrar uma peça (amiga ou inimiga)
          } else {
            // Adicione a casa como um movimento possível
            movements.push(newPosition);
          }
        }

        // Crie indicadores de movimento para cada movimento possível
        super.createMoveIndicators(movements, boardPieces, onMove);
      }
    }
  }
}
