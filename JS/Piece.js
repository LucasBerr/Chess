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
        this.modulo.style.position = "absolute";
        this.modulo.style.pointerEvents = "none";
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

    clearIndicators(boardPieces) {
        // Itera por todas as casas do tabuleiro
        for (const house in boardPieces) {
            const currentHouse = boardPieces[house];
    
            // Verifica se há um indicador de movimento na casa
            const moveIndicator = currentHouse.querySelector("#moveIndicator");
            const eatIndicator = currentHouse.querySelector("#eatIndicator");
            if (moveIndicator) {
                // Remove o indicador de movimento da casa
                currentHouse.removeChild(moveIndicator);
            } else if(eatIndicator) {
                currentHouse.removeChild(eatIndicator);
            }
        }
    }

    
    moveTo(destination, boardPieces, onMove) {
        this.clearIndicators(boardPieces);
        boardPieces[destination].appendChild(this.modulo);
        
        this.position = destination; // Troque "house" por "destination"
        onMove[0] = onMove[0] === "w" ? "b" : "w";
    }

    whichPieceIs(boardPieces, pieceId) {
        const piece = boardPieces[pieceId];
        const imgElement = piece.querySelector('img');
        if (imgElement) {
            return imgElement.id;
        } else {
            return "None piece in here";
        }
    }

    isPieceThere(boardPieces, pieceId) {
        return boardPieces[pieceId].children.length;
    }

    eat (boardPieces, house, onMove) {
        const eatIndicator = document.createElement("img");
        eatIndicator.src = ".\\sprites\\eatIndicator.png";
        eatIndicator.style.opacity = 0.7;
        eatIndicator.id = "eatIndicator";

        eatIndicator.addEventListener("mousedown", () => {
            // Usando uma função de seta para manter o contexto correto
            this.eatPiece(boardPieces, house, onMove);
        });
 
        boardPieces[house].appendChild(eatIndicator);
    }

    eatPiece(boardPieces, house, onMove) {
        const pieceToEat = this.whichPieceIs(boardPieces, house);
        if (pieceToEat) {
            // Remova a peça a ser comida do tabuleiro
            const pieceElement = document.getElementById(house);
            pieceElement.innerHTML = ""; // Remove o conteúdo do elemento
    
            // Move a peça atual para a casa de destino
            const currentSquare = boardPieces[this.position];
            currentSquare.innerHTML = "";
            boardPieces[house].appendChild(this.modulo);
            this.position = house;
    
            // Atualize o turno
            onMove[0] = onMove[0] === "w" ? "b" : "w";
        }
    }

    isValidSquare(square) {
        return /^[A-H][1-8]$/.test(square); // Verifica se a casa está dentro do tabuleiro
    }

    
    createMoveIndicators(movements, boardPieces, onMove) {
        for (let house of movements) {
            // Criando indicador de movimento
            const moveIndicator = document.createElement("img");
            moveIndicator.src = ".\\sprites\\moveIndicator.png";
            moveIndicator.style.opacity = 0.7;
            moveIndicator.id = "moveIndicator";
            moveIndicator.addEventListener("click", () => {
                // Usando uma função de seta para manter o contexto correto
                this.moveTo(house, boardPieces, onMove);
            });

            // checa se tem uma peça na casa do movimento
            if (boardPieces[house].children.length) {
                // Checa se a peça é da mesma cor ou não
                let pieceInHouse = this.whichPieceIs(boardPieces, house)
                if (pieceInHouse[0] === this.color) {
                    break;
                } else {
                    this.eat(boardPieces, house, onMove)
                    break;
                }
            }
            boardPieces[house].appendChild(moveIndicator);
        }
    }
}