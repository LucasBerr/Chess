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
}