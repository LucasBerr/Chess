class Pawn {
    constructor(color, id, walked) {
        this.color = color;
        this.id = id;
        this.walked = walked;
    }
    
    // Método para mover o peão
    move(destination, boardPieces, pieces, onMove) {
        const currentPosition = this.findPiece(boardPieces);
        const movementFactor = this.color === "w" ? 1 : -1;
        const movements = [];

        movements.push((currentPosition[0] + (parseInt(currentPosition[1]) + movementFactor)).toString());

        if (!this.walked) {
            movements.push((currentPosition[0] + (parseInt(currentPosition[1]) + (movementFactor * 2)).toString()));
        }

        if (movements.includes(destination)) {
            this.removeIndicators(boardPieces);
            this.moveTo(destination, boardPieces, pieces, onMove);
        }
    }

    // Método para encontrar a posição do peão
    findPiece(boardPieces) {
        for (const place in boardPieces) {
            let piece_in_place = this.whichPieceIs(boardPieces[place].id);
            if (piece_in_place === this.id) {
                return place;
            }
        }
    }

    // Método para identificar qual peça está em uma casa
    whichPieceIs(pieceId) {
        const piece = boardPieces[pieceId];
        const imgElement = piece.querySelector('img');
        if (imgElement) {
            return imgElement.id;
        }
    }

    // Método para verificar se uma peça está em uma determinada casa
    isPieceThere(pieceId) {
        return boardPieces[pieceId].children.length;
    }

    // Método para remover os indicadores de movimento
    removeIndicators(boardPieces) {
        for (const house in boardPieces) {
            const currentHouse = boardPieces[house];
            const moveIndicator = currentHouse.querySelector("#moveIndicator");
            if (moveIndicator) {
                currentHouse.removeChild(moveIndicator);
            }
        }
    }

    // Método para mover o peão para uma casa de destino
    moveTo(destination, boardPieces, pieces, onMove) {
        boardPieces[destination].appendChild(pieces[this.id]);
        this.walked = true;
        onMove = onMove === "w" ? "b" : "w"; // Alternar a vez de jogar
    }
}

export {Pawn}