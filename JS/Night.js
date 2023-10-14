import { Piece } from "./Piece.js";

export class Night extends Piece {
    constructor (id) {
        super (id);
    }

    initial_position () {
        if (this.id[0] === "w") {
            switch(this.id[2]) {
                case "1":
                    return "B1";
                    break;
                case "2":
                    return "G1";
                    break;
            }
        } else {
            switch(this.id[2]) {
                case "1":
                    return "B8";
                    break;
                case "2":
                    return "G8";
                    break;
            }
        }
    }
}