import { Piece } from "./Piece.js";

export class Bishop extends Piece {
    constructor (id) {
        super (id);
    }

    initial_position () {
        if (this.id[0] === "w") {
            switch(this.id[2]) {
                case "1":
                    return "C1";
                    break;
                case "2":
                    return "F1";
                    break;
            }
        } else {
            switch(this.id[2]) {
                case "1":
                    return "C8";
                    break;
                case "2":
                    return "F8";
                    break;
            }
        }
    }
}