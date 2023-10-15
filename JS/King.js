import { Piece } from "./Piece.js";

export class King extends Piece {
    constructor (id) {
        super (id);
    }

    initial_position () {
        if (this.id[0] === "w") {
            return "E1";
        } else {
            return "E8";
        }
    }

    move(boardPieces, onMove) {
        super.clearIndicators(boardPieces);
        if (this.color === onMove[0]) {
            const currentLetter = this.position[0];
            const currentNumber = parseInt(this.position[1]);

            // Defina as direções de movimento (horizontal, vertical e diagonal)
            const directions = [
                [0, 1],   // Movimento vertical para cima
                [0, -1],  // Movimento vertical para baixo
                [1, 0],   // Movimento horizontal para a direita
                [-1, 0],  // Movimento horizontal para a esquerda
                [-1, 1],  // Movimento diagonal superior esquerda
                [1, 1],   // Movimento diagonal superior direita
                [-1, -1], // Movimento diagonal inferior esquerda
                [1, -1]   // Movimento diagonal inferior direita
            ];

            for (const [dx, dy] of directions) {
                const newLetter = String.fromCharCode(currentLetter.charCodeAt(0) + dx);
                const newNumber = currentNumber + dy;
                const newPosition = newLetter + newNumber;
                let movement = [];

                if (super.isValidSquare(newPosition)) {
                    if (!super.isPieceThere(boardPieces, newPosition) || super.whichPieceIs(boardPieces, newPosition)[0] !== this.color) {
                        movement.push(newPosition);
                        // Crie indicadores de movimento para cada movimento possível
                        super.createMoveIndicators(movement, boardPieces, onMove);
                    }
                }
            }

        }
    }

}