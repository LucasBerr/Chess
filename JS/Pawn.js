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

    move (boardPieces) {
        let movements = []
        let movementFactor = this.color === "w" ? 1 : -1;
    
        movements.push(this.position[0] + (parseInt(this.position[1]) + (movementFactor)).toString())
        // Se for a primeira jogada do peão ele deve poder andar 2 casas
        if (!this.walked) {
            movements.push((this.position[0] + (parseInt(this.position[1]) + (movementFactor * 2))).toString())
        }
        this.createMoveIndicators(movements, boardPieces)
    }

    
    createMoveIndicators(movements, boardPieces) {
        for (let house of movements) {
            // Criando indicador de movimento
            const moveIndicator = document.createElement("img");
            moveIndicator.src = ".\\sprites\\moveIndicator.png";
            moveIndicator.style.opacity = 0.7;
            moveIndicator.id = "moveIndicator";
            moveIndicator.addEventListener("click", () => {
                // Usando uma função de seta para manter o contexto correto
                this.moveTo(house, boardPieces);
            });

            // checa se tem uma peça na casa do movimento
            if (boardPieces[house].children.length) {
                // Peões não podem andar caso tenham uma peça na frente
                break;
            }
            boardPieces[house].appendChild(moveIndicator);
        }
    }

    isPieceThere(pieceId) {
        return boardPieces[pieceId].children.length;
    }

    moveTo(destination, boardPieces) {
        this.clearMoveIndicators(boardPieces);
        boardPieces[destination].appendChild(this.modulo); // Troque "house" por "destination"

        this.walked = true;
        this.position = destination; // Troque "house" por "destination"
    }
    
    clearMoveIndicators(boardPieces) {
        // Itera por todas as casas do tabuleiro
        for (const house in boardPieces) {
            const currentHouse = boardPieces[house];
    
            // Verifica se há um indicador de movimento na casa
            const moveIndicator = currentHouse.querySelector("#moveIndicator");
            if (moveIndicator) {
                // Remove o indicador de movimento da casa
                currentHouse.removeChild(moveIndicator);
            }
        }
    }


}