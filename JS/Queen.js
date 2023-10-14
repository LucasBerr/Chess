import { Piece } from "./Piece.js";

export class Queen extends Piece {
    constructor (id) {
        super (id);
    }

    initial_position () {
        if (this.id[0] === "w") {
            return "D1";
        } else {
            return "D8";
        }
    }
}