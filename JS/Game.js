import { Pawn } from "./Pawn.js";
import { Rook } from "./Rook.js";
import { Night } from "./Night.js";
import { Bishop } from "./Bishop.js";
import { King } from "./King.js";
import { Queen } from "./Queen.js";

export class Game {
    constructor (){
        this.board = document.getElementById("board");
        this.boardPieces = {};
        this.pieces = [];
        this.onMove = ["w"];
    }
    
    start_game() {
        this.getPieces();
        this.getBoardPieces();
        this.arrangeBoard();
    }
    
    arrangeBoard() {
        for (let piece of this.pieces) {
            let position = piece.position;
            this.boardPieces[position].appendChild(piece.modulo);
        }
    }
    
    getPieces() {
        // White Pawns
        const wp1 = new Pawn("wp1");
        const wp2 = new Pawn("wp2");
        const wp3 = new Pawn("wp3");
        const wp4 = new Pawn("wp4");
        const wp5 = new Pawn("wp5");
        const wp6 = new Pawn("wp6");
        const wp7 = new Pawn("wp7");
        const wp8 = new Pawn("wp8");
        this.pieces.push(wp1,wp2,wp3,wp4,wp5,wp6,wp7,wp8);

        // Black Pawns
        const bp1 = new Pawn("bp1");
        const bp2 = new Pawn("bp2");
        const bp3 = new Pawn("bp3");
        const bp4 = new Pawn("bp4");
        const bp5 = new Pawn("bp5");
        const bp6 = new Pawn("bp6");
        const bp7 = new Pawn("bp7");
        const bp8 = new Pawn("bp8");
        this.pieces.push(bp1, bp2, bp3, bp4, bp5, bp6, bp7, bp8);

        // White Rooks
        const wr1 = new Rook("wr1");
        const wr2 = new Rook("wr2");
        this.pieces.push(wr1, wr2);

        // Black Rooks
        const br1 = new Rook("br1");
        const br2 = new Rook("br2");
        this.pieces.push(br1, br2);

        // White Nights
        const wn1 = new Night("wn1");
        const wn2 = new Night("wn2");
        this.pieces.push(wn1, wn2);

        // Black Nights
        const bn1 = new Night("bn1");
        const bn2 = new Night("bn2");
        this.pieces.push(bn1, bn2);

        // White Bishop
        const wb1 = new Bishop("wb1");
        const wb2 = new Bishop("wb2");
        this.pieces.push(wb1, wb2);

        // Black Bishop
        const bb1 = new Bishop("bb1");
        const bb2 = new Bishop("bb2");
        this.pieces.push(bb1, bb2);
    
        // Kings
        const bk = new King("bk");
        const wk = new King("wk");
        this.pieces.push(bk, wk);

        // Queen 
        const bq = new Queen("bq");
        const wq = new Queen("wq");
        this.pieces.push(bq, wq)
    }

    
    // Get all the pieces in the board and put in the boardPieces Variable
    getBoardPieces() {
        // Iterar sobre os elementos filhos do elemento "board"
        for (let i = 0; i < this.board.children.length; i++) {
            let piece = this.board.children[i];
            let pieceId = piece.id; // ID da peça
            // Adicione a peça ao objeto boardPieces usando o ID como chave
            this.boardPieces[pieceId] = piece;
            piece.addEventListener("mousedown", (event) => {
                this.click(pieceId); // Chama a função de toque com o ID da peça como argumento
            });
        }
    }
    
    click(pieceId) {
        if (this.isPieceThere(pieceId)) {
            const pieceClicked = this.whichPieceIs(pieceId)
            for (let piece of this.pieces) {
                if (piece.id === pieceClicked){
                    piece.move(this.boardPieces, this.onMove)
                }
            }
        }
    }

    isPieceThere(pieceId) {
        return this.boardPieces[pieceId].children.length;
    }
    

    whichPieceIs(pieceId) {
        const piece = this.boardPieces[pieceId];
        const imgElement = piece.querySelector('img');
        if (imgElement) {
            return imgElement.id;
        } else {
            return "None piece in here";
        }
    }
}