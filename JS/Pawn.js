import { Piece } from "./Piece.js";

export class Pawn extends Piece{
    constructor (id) {
        super (id);
        this.walked = false;
    }

    initial_position () {
        let position_line = "2";
        // There are 16 Pawns in a normal chess game
        if (this.id[0] === "b") {
            position_line = "7";
        }
        switch (this.id[2]) {
            case "1":
                return "A" + position_line;
                break;
            case "2":
                return "B" + position_line;
                break;
            case "3":
                return "C" + position_line;
                break;
            case "4":
                return "D" + position_line;
                break;
            case "5":
                return "E" + position_line;
                break;
            case "6":
                return "F" + position_line;
                break;
            case "7":
                return "G" + position_line;
                break;
            case "8":
                return "H" + position_line;
                break;
        }
    }

    move (boardPieces, onMove) {
        super.clearIndicators(boardPieces);
        // Se for a vez dessa cor
        if (this.color === onMove[0]) {
            let housesOfLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
            let movements = []
            let movementFactor = this.color === "w" ? 1 : -1;
            let currentLetter = this.position[0];
            let currentNumber = parseInt(this.position[1]);

            movements.push(currentLetter + (currentNumber + (movementFactor)).toString())
            // Se for a primeira jogada do peão ele deve poder andar 2 casas
            if (!this.walked) {
                movements.push(currentLetter + (currentNumber + (movementFactor * 2)).toString())
            }

            // Peão come nas casas das diagonais para frente
            const leftDiagonal = housesOfLetters[housesOfLetters.indexOf(currentLetter) - 1] + (currentNumber + movementFactor).toString();
            const rightDiagonal = housesOfLetters[housesOfLetters.indexOf(currentLetter) + 1] + (currentNumber + movementFactor).toString();
            if (super.isValidSquare(leftDiagonal)) {
                if (super.isPieceThere(boardPieces, leftDiagonal)){
                    const pieceToBeEaten = super.whichPieceIs(boardPieces, leftDiagonal)
                    if (pieceToBeEaten[0] !== this.color){
                        super.eat(boardPieces, leftDiagonal, onMove)
                    }
                }
            }
            if (super.isValidSquare(rightDiagonal)) {
                if (super.isPieceThere(boardPieces, rightDiagonal)){
                    const pieceToBeEaten = super.whichPieceIs(boardPieces, rightDiagonal)
                    if (pieceToBeEaten[0] !== this.color){
                        super.eat(boardPieces, rightDiagonal, onMove)
                    }
                }
            }

            this.createMoveIndicators(movements, boardPieces, onMove)
        }
    }

        
    
    createMoveIndicators(movements, boardPieces, onMove) {
        for (let house of movements) {
            // Criando indicador de movimento
            const moveIndicator = document.createElement("img");
            moveIndicator.src = ".\\sprites\\moveIndicator.png";
            moveIndicator.style.opacity = 0.7;
            moveIndicator.id = "moveIndicator";
            moveIndicator.addEventListener("click", () => {
                // Usando uma função de seta para manter o contexto correto
                this.moveTo(house, boardPieces, onMove);
            });

            // checa se tem uma peça na casa do movimento
            if (boardPieces[house].children.length) {
                // Peões não podem andar caso tenham uma peça na frente
                break;
            }
            boardPieces[house].appendChild(moveIndicator);
        }
    }

    moveTo(destination, boardPieces, onMove) {
        super.clearIndicators(boardPieces);
        boardPieces[destination].appendChild(this.modulo);

        this.walked = true;
        this.position = destination;
        onMove[0] = onMove[0] === "w" ? "b" : "w";
    }


}