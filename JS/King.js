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
}