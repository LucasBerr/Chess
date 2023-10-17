import { Piece } from "./Piece.js";

export class Rook extends Piece{
    constructor (id) {
        super (id);
    }

    initial_position () {
        if (this.id[0] === "w") {
            switch(this.id[2]) {
                case "1":
                    return "A1";
                    break;
                case "2":
                    return "H1";
                    break;
            }
        } else {
            switch(this.id[2]) {
                case "1":
                    return "A8";
                    break;
                case "2":
                    return "H8";
                    break;
            }
        }
    }

    move (boardPieces, onMove) {
        super.clearIndicators(boardPieces);
        if (this.color === onMove[0]) {
            // A torre pode andar para todos os lados até o máximo da casas possíveis
            let housesOfLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
            let movementsLeft = [];
            let movementsRight = [];
            let movementsUp = [];
            let movementsDown = [];
            let currentLetter = this.position[0];
            let currentNumber = parseInt(this.position[1]);

            // Movimento para cima
            for (let up = currentNumber + 1; up <= 8; up++) {
                movementsUp.push(currentLetter + up.toString());
            }

            // Movimento para baixo
            for (let down = currentNumber - 1; down >= 1; down--) {
                movementsDown.push(currentLetter + down.toString());
            }

            // Movimento para a direita
            for (let right = housesOfLetters.indexOf(currentLetter) + 1; right < housesOfLetters.length; right++) {
                movementsRight.push(housesOfLetters[right] + currentNumber.toString());
            }

            // Movimento para a esquerda
            for (let left = housesOfLetters.indexOf(currentLetter) - 1; left >= 0; left--) {
                movementsLeft.push(housesOfLetters[left] + currentNumber.toString());
            }

            super.createMoveIndicators(movementsUp, boardPieces, onMove)
            super.createMoveIndicators(movementsDown, boardPieces, onMove)
            super.createMoveIndicators(movementsRight, boardPieces, onMove)
            super.createMoveIndicators(movementsLeft, boardPieces, onMove)
        }
    }
}