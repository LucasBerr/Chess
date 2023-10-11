// Redefinindo escala de zoom
document.body.style.zoom = 0.67;

const screen = document.getElementById("screen");
const board = document.getElementById("board");
let boardPieces = {};
let pieces = {};
let isDragging = false;
let offsetX, offsetY;



createBoard()
console.log(boardPieces);
console.log(pieces)



function createBoard() {
    getBoardPieces()
    createPieces()
    arrangeBoard()
}


// MOVEMENTS
function click(pieceId) {
    isPieceOnClick = isPieceThere(pieceId);
    if (isPieceOnClick) {
        let pieceClicked = whichPieceIs(pieceId);
        movePiece(pieceClicked);
    }
}

function movePiece(pieceClicked) {
    switch (pieceClicked[1]) {
        case "p":
            movePawn(pieceClicked);
            break;
        case "r":
            moveRook(pieceClicked);
            break;
        case "n":
            moveNight(pieceClicked);
            break;
        case "b":
            moveBishop(pieceClicked);
            break;
        case "q":
            moveQueen(pieceClicked);
            break;
        case "k":
            moveKing(pieceClicked);
            break;
        }
    }
    
function movePawn(pieceClicked) {
    console.log("Pawn")
    pawn_location = findPiece(pieceClicked)
    console.log(pawn_location)
    // Agora preciso adicionar as bolinhas pretas clicáveis às casas correspondentes
    // Se ele clicar novamente em qualquer outra casa que não tenha uma peça branca
    // vá para lá
    boardPieces.A2.appendChild(pieces.wp1);


}

function moveRook(pieceClicked) {
    console.log("Rook")
}
function moveNight(pieceClicked) {
    console.log("Night")
}
function moveBishop(pieceClicked) {
    console.log("Bishop")
}
function moveQueen(pieceClicked) {
    console.log("Queen")
}
function moveKing(pieceClicked) {
    console.log("King")
}

// Retorna o lugar que a peça está atualmente
function findPiece(pieceName) {
    for (const place in boardPieces) {
        piece_in_place = whichPieceIs(boardPieces[place].id)
        if (piece_in_place === pieceName) {
            return place
        }
    }
}

function whichPieceIs(pieceId) {
    const piece = boardPieces[pieceId];
    const imgElement = piece.querySelector('img');
    if (imgElement) {
        return imgElement.id;
    }
}


function isPieceThere(pieceId) {
    return boardPieces[pieceId].children.length
}

// INICIALIZING
function arrangeBoard() {
    // Pawns
    boardPieces.A2.appendChild(pieces.wp1);
    boardPieces.B2.appendChild(pieces.wp2);
    boardPieces.C2.appendChild(pieces.wp3);
    boardPieces.D2.appendChild(pieces.wp4);
    boardPieces.E2.appendChild(pieces.wp5);
    boardPieces.F2.appendChild(pieces.wp6);
    boardPieces.G2.appendChild(pieces.wp7);
    boardPieces.H2.appendChild(pieces.wp8);

    boardPieces.A7.appendChild(pieces.bp1);
    boardPieces.B7.appendChild(pieces.bp2);
    boardPieces.C7.appendChild(pieces.bp3);
    boardPieces.D7.appendChild(pieces.bp4);
    boardPieces.E7.appendChild(pieces.bp5);
    boardPieces.F7.appendChild(pieces.bp6);
    boardPieces.G7.appendChild(pieces.bp7);
    boardPieces.H7.appendChild(pieces.bp8);

    // Rooks
    boardPieces.A1.appendChild(pieces.wr1);
    boardPieces.H1.appendChild(pieces.wr2);

    boardPieces.A8.appendChild(pieces.br1);
    boardPieces.H8.appendChild(pieces.br2);

    // Night
    boardPieces.B1.appendChild(pieces.wn1);
    boardPieces.G1.appendChild(pieces.wn2);

    boardPieces.B8.appendChild(pieces.bn1);
    boardPieces.G8.appendChild(pieces.bn2);

    // Bishop
    boardPieces.C1.appendChild(pieces.wb1);
    boardPieces.F1.appendChild(pieces.wb2);

    boardPieces.C8.appendChild(pieces.bb1);
    boardPieces.F8.appendChild(pieces.bb2);

    // Queen
    boardPieces.D1.appendChild(pieces.wq);

    boardPieces.D8.appendChild(pieces.bq);

    // King
    boardPieces.E1.appendChild(pieces.wk);

    boardPieces.E8.appendChild(pieces.bk);
}


// Get all the pieces in the board and put in the boardPieces Variable
function getBoardPieces() {
    // Iterar sobre os elementos filhos do elemento "board"
    for (let i = 0; i < board.children.length; i++) {
        const piece = board.children[i];
        const pieceId = piece.id; // ID da peça
        // Adicione a peça ao objeto boardPieces usando o ID como chave
        boardPieces[pieceId] = piece;
        piece.addEventListener("mousedown", function(event) {
            click(pieceId); // Chama a função de toque com o ID da peça como argumento
        });
    }
}



function createPieces() {
    const wpImageSource = ".\\sprites\\wp.png";
    const wnImageSource = "sprites\\wn.png";
    const wrImageSource = "sprites\\wr.png";
    const wbImageSource = "sprites\\wb.png";
    const wqImageSource = "sprites\\wq.png";
    const wkImageSource = "sprites\\wk.png";
    
    const bpImageSource = "sprites\\bp.png";
    const bnImageSource = "sprites\\bn.png";
    const brImageSource = "sprites\\br.png";
    const bbImageSource = "sprites\\bb.png";
    const bqImageSource = "sprites\\bq.png";
    const bkImageSource = "sprites\\bk.png";

    // WHITE
    // Pawn
    const wp1 = document.createElement("img");
    wp1.src = wpImageSource;
    wp1.id = "wp1";
    wp1.onclick = function(){alert("Cliquei no wp1")}
    pieces.wp1 = wp1;

    const wp2 = document.createElement("img");
    wp2.src = wpImageSource;
    wp2.id = "wp2";
    pieces.wp2 = wp2;

    const wp3 = document.createElement("img");
    wp3.src = wpImageSource;
    wp3.id = "wp3";
    pieces.wp3 = wp3;

    const wp4 = document.createElement("img");
    wp4.src = wpImageSource;
    wp4.id = "wp4";
    pieces.wp4 = wp4;

    const wp5 = document.createElement("img");
    wp5.src = wpImageSource;
    wp5.id = "wp5";
    pieces.wp5 = wp5;

    const wp6 = document.createElement("img");
    wp6.src = wpImageSource;
    wp6.id = "wp6";
    pieces.wp6 = wp6;

    const wp7 = document.createElement("img");
    wp7.src = wpImageSource;
    wp7.id = "wp7";
    pieces.wp7 = wp7;

    const wp8 = document.createElement("img");
    wp8.src = wpImageSource;
    wp8.id = "wp8";
    pieces.wp8 = wp8;


    // Night
    const wn1 = document.createElement("img");
    wn1.src = wnImageSource;
    wn1.id = "wn1";
    pieces.wn1 = wn1;

    const wn2 = document.createElement("img");
    wn2.src = wnImageSource;
    wn2.id = "wn2";
    pieces.wn2 = wn2;

    // Tower
    const wr1 = document.createElement("img");
    wr1.src = wrImageSource;
    wr1.id = "wr1";
    pieces.wr1 = wr1;

    const wr2 = document.createElement("img");
    wr2.src = wrImageSource;
    wr2.id = "wr2";
    pieces.wr2 = wr2;

    // Bishop
    const wb1 = document.createElement("img");
    wb1.src = wbImageSource;
    wb1.id = "wb1";
    pieces.wb1 = wb1
    
    const wb2 = document.createElement("img");
    wb2.src = wbImageSource;
    wb2.id = "wb2";
    pieces.wb2 = wb2;

    // Queen
    const wq = document.createElement("img");
    wq.src = wqImageSource;
    wq.id = "wq";
    pieces.wq = wq;

    // King
    const wk = document.createElement("img");
    wk.src = wkImageSource;
    wk.id = "wk";
    pieces.wk = wk;

    // BLACK
    // Pawn
    const bp1 = document.createElement("img");
    bp1.src = bpImageSource;
    bp1.id = "bp1";
    pieces.bp1 = bp1;

    const bp2 = document.createElement("img");
    bp2.src = bpImageSource;
    bp2.id = "bp2";
    pieces.bp2 = bp2;

    const bp3 = document.createElement("img");
    bp3.src = bpImageSource;
    bp3.id = "bp3";
    pieces.bp3 = bp3;

    const bp4 = document.createElement("img");
    bp4.src = bpImageSource;
    bp4.id = "bp4";
    pieces.bp4 = bp4;

    const bp5 = document.createElement("img");
    bp5.src = bpImageSource;
    bp5.id = "bp5";
    pieces.bp5 = bp5;

    const bp6 = document.createElement("img");
    bp6.src = bpImageSource;
    bp6.id = "bp6";
    pieces.bp6 = bp6;

    const bp7 = document.createElement("img");
    bp7.src = bpImageSource;
    bp7.id = "bp7";
    pieces.bp7 = bp7;

    const bp8 = document.createElement("img");
    bp8.src = bpImageSource;
    bp8.id = "bp8";
    pieces.bp8 = bp8;


    // Night
    const bn1 = document.createElement("img");
    bn1.src = bnImageSource;
    bn1.id = "bn1";
    pieces.bn1 = bn1;

    const bn2 = document.createElement("img");
    bn2.src = bnImageSource;
    bn2.id = "bn2";
    pieces.bn2 = bn2;

    // Tober
    const br1 = document.createElement("img");
    br1.src = brImageSource;
    br1.id = "br1";
    pieces.br1 = br1;

    const br2 = document.createElement("img");
    br2.src = brImageSource;
    br2.id = "br2";
    pieces.br2 = br2;

    // Bishop
    const bb1 = document.createElement("img");
    bb1.src = bbImageSource;
    bb1.id = "bb1";
    pieces.bb1 = bb1
    
    const bb2 = document.createElement("img");
    bb2.src = bbImageSource;
    bb2.id = "bb2";
    pieces.bb2 = bb2;

    // Queen
    const bq = document.createElement("img");
    bq.src = bqImageSource;
    bq.id = "bq";
    pieces.bq = bq;

    // King
    const bk = document.createElement("img");
    bk.src = bkImageSource;
    bk.id = "bk";
    pieces.bk = bk;


}

