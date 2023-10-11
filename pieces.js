class Piece {
    constructor(color, number) {
        this.color = color;
        this.number = number;
    }

    get number () {
        return this.number;
    }

    set number (value) {
        this.number = value;
    }

    get color () {
        return this.color;
    }

    set color (value) {
        if (value != "w" || value != "b") {
            console.error("Invalid color of piece: ", value);
        } else {
            this.color = value;
        }
    }
}

class Pawn extends Piece {
    constructor(color, number) {
        super(color, number);
        this.id = this.color + "p" + this.number;
        this.asset = ".\\sprites\\"+ this.color + "p.png"
    }

    initial_position() {
        if (this.color === "w") {
            switch(this.number) {
                case "1":
                    return "A2";
                    break;
                case "2":
                    return "B2";
                    break;
                case "3":   
                    return "C2";
                    break;
                case "4":   
                    return "D2";
                    break;
                case "5":   
                    return "E2";
                    break;
                case "6":   
                    return "F2";
                    break;
                case "7":   
                    return "G2";
                    break;
                case "8":   
                    return "H2";
                    break;
            } 
        } else if (this.color === "b") {
            switch(this.number) {
                case "1":
                    return "A7";
                    break;
                case "2":
                    return "B7";
                    break;
                case "3":   
                    return "C7";
                    break;
                case "4":   
                    return "D7";
                    break;
                case "5":   
                    return "E7";
                    break;
                case "6":   
                    return "F7";
                    break;
                case "7":   
                    return "G7";
                    break;
                case "8":   
                    return "H7";
                    break;
            } 
        }
    }
    


}