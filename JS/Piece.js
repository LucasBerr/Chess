class Piece {
    constructor(color, number) {
        this._color = color;
        this._number = number;
    }

    get number () {
        return this._number;
    }

    set number (value) {
        this._number = value;
    }

    get color () {
        return this._color;
    }

    set color (value) {
        if (value === "w" || value === "b") {
            this._color = value;
        } else {
            console.error("Invalid color of piece: ", value);
        }
    }
}
export {Piece};
