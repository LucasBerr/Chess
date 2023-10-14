export class Piece {
    constructor(id) {
        /*  
        Every single id of pieces are compoust of 3 chars
        The first one represents the color = "b" or "w"
        The second one represents wich piece it is = ["p", "n", "b", "r", "k", "q"]
        The third one represents the number that the piece is, because there can be more than 1 Pawn
        Examples:
            wp1 = White Pawn 1
            bq = Black Queen
        */ 
        this.color = id[0];
        this.id = id;
        this.asset = "./sprites/" + id[0] + id[1] + ".png"
        this.position = this.initial_position();
        
        /*
        To the Piece render on screen, its needed a node
        I am calling this node a modulo.
        */
        this.modulo = document.createElement("img");
        this.modulo.src = this.asset;
        this.modulo.id = this.id;
    }

    move () {
        console.log("Every piece have a different way to move");
    }

    node () {
        return this.modulo;
    }

    initial_position () {
        return "X";
    }

    placeIndicators() {
        console.log("Building the indicators");
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