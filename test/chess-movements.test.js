import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { Pawn } from "../JS/Pawn.js";
import { Rook } from "../JS/Rook.js";
import { Bishop } from "../JS/Bishop.js";
import { Night } from "../JS/Night.js";
import { Queen } from "../JS/Queen.js";
import { King } from "../JS/King.js";

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName.toLowerCase();
    this.id = "";
    this.src = "";
    this.style = {};
    this.children = [];
    this.parentNode = null;
    this.eventListeners = {};
  }

  appendChild(child) {
    if (child.parentNode) {
      child.parentNode.removeChild(child);
    }

    this.children.push(child);
    child.parentNode = this;
    return child;
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index === -1) {
      throw new Error(`Child ${child.id} not found`);
    }

    this.children.splice(index, 1);
    child.parentNode = null;
    return child;
  }

  querySelector(selector) {
    if (selector === "img") {
      return this.children.find((child) => child.tagName === "img") ?? null;
    }

    if (selector.startsWith("#")) {
      const id = selector.slice(1);
      return this.children.find((child) => child.id === id) ?? null;
    }

    return null;
  }

  addEventListener(event, callback) {
    this.eventListeners[event] = callback;
  }

  set innerHTML(value) {
    if (value === "") {
      for (const child of this.children) {
        child.parentNode = null;
      }

      this.children = [];
    }
  }

  get innerHTML() {
    return this.children
      .map((child) => `<${child.tagName} id="${child.id}">`)
      .join("");
  }
}

class FakeDocument {
  constructor() {
    this.elements = new Map();
  }

  createElement(tagName) {
    return new FakeElement(tagName);
  }

  getElementById(id) {
    return this.elements.get(id) ?? null;
  }

  registerElement(element) {
    this.elements.set(element.id, element);
    return element;
  }
}

const FILES = ["A", "B", "C", "D", "E", "F", "G", "H"];

let boardPieces;
let onMove;

function resetDocument() {
  globalThis.document = new FakeDocument();
}

function createBoardPieces() {
  const board = {};

  for (const file of FILES) {
    for (let rank = 1; rank <= 8; rank++) {
      const square = document.createElement("div");
      square.id = `${file}${rank}`;

      document.registerElement(square);
      board[square.id] = square;
    }
  }

  return board;
}

function place(piece, square = piece.position) {
  piece.position = square;
  boardPieces[square].appendChild(piece.modulo);
  return piece;
}

function hasMove(square) {
  return Boolean(boardPieces[square].querySelector("#moveIndicator"));
}

function hasEat(square) {
  return Boolean(boardPieces[square].querySelector("#eatIndicator"));
}

beforeEach(() => {
  resetDocument();
  boardPieces = createBoardPieces();
  onMove = ["w"];
});

describe("Movimentos principais das peças de xadrez", () => {
  it("peão branco anda uma ou duas casas no primeiro movimento", () => {
    const pawn = place(new Pawn("wp1"), "A2");

    pawn.move(boardPieces, onMove);

    assert.equal(hasMove("A3"), true);
    assert.equal(hasMove("A4"), true);
  });

  it("peão não anda se tiver peça diretamente na frente", () => {
    const pawn = place(new Pawn("wp1"), "A2");

    place(new Pawn("bp1"), "A3");

    pawn.move(boardPieces, onMove);

    assert.equal(hasMove("A3"), false);
    assert.equal(hasMove("A4"), false);
  });

  it("peão captura somente na diagonal para frente", () => {
    const pawn = place(new Pawn("wp1"), "A2");

    place(new Pawn("bp2"), "B3");

    pawn.move(boardPieces, onMove);

    assert.equal(hasEat("B3"), true);
    assert.equal(hasEat("A3"), false);
  });

  it("torre anda na vertical e horizontal", () => {
    const rook = place(new Rook("wr1"), "D4");

    rook.move(boardPieces, onMove);

    assert.equal(hasMove("D8"), true);
    assert.equal(hasMove("D1"), true);
    assert.equal(hasMove("A4"), true);
    assert.equal(hasMove("H4"), true);

    assert.equal(hasMove("C5"), false);
  });

  it("torre não pula peça e pode capturar inimigo no caminho", () => {
    const rook = place(new Rook("wr1"), "D4");

    place(new Pawn("wp1"), "D6");
    place(new Pawn("bp1"), "F4");

    rook.move(boardPieces, onMove);

    assert.equal(hasMove("D5"), true);
    assert.equal(hasMove("D6"), false);
    assert.equal(hasMove("D7"), false);

    assert.equal(hasMove("E4"), true);
    assert.equal(hasEat("F4"), true);
    assert.equal(hasMove("G4"), false);
  });

  it("bispo anda somente na diagonal", () => {
    const bishop = place(new Bishop("wb1"), "D4");

    bishop.move(boardPieces, onMove);

    assert.equal(hasMove("A7"), true);
    assert.equal(hasMove("G7"), true);
    assert.equal(hasMove("A1"), true);
    assert.equal(hasMove("G1"), true);

    assert.equal(hasMove("D5"), false);
    assert.equal(hasMove("E4"), false);
  });

  it("cavalo anda em L", () => {
    const night = place(new Night("wn1"), "D4");

    night.move(boardPieces, onMove);

    assert.equal(hasMove("B3"), true);
    assert.equal(hasMove("B5"), true);
    assert.equal(hasMove("C2"), true);
    assert.equal(hasMove("C6"), true);
    assert.equal(hasMove("E2"), true);
    assert.equal(hasMove("E6"), true);
    assert.equal(hasMove("F3"), true);
    assert.equal(hasMove("F5"), true);

    assert.equal(hasMove("D5"), false);
  });

  it("cavalo não captura peça aliada, mas captura inimiga", () => {
    const night = place(new Night("wn1"), "D4");

    place(new Pawn("wp1"), "B5");
    place(new Pawn("bp1"), "F5");

    night.move(boardPieces, onMove);

    assert.equal(hasMove("B5"), false);
    assert.equal(hasEat("B5"), false);

    assert.equal(hasEat("F5"), true);
  });

  it("rainha anda como torre e como bispo", () => {
    const queen = place(new Queen("wq"), "D4");

    queen.move(boardPieces, onMove);

    assert.equal(hasMove("D8"), true);
    assert.equal(hasMove("D1"), true);
    assert.equal(hasMove("A4"), true);
    assert.equal(hasMove("H4"), true);

    assert.equal(hasMove("A7"), true);
    assert.equal(hasMove("G7"), true);
    assert.equal(hasMove("A1"), true);
    assert.equal(hasMove("G1"), true);

    assert.equal(hasMove("B5"), false);
  });

  it("rei anda apenas uma casa em qualquer direção", () => {
    const king = place(new King("wk"), "D4");

    king.move(boardPieces, onMove);

    assert.equal(hasMove("D5"), true);
    assert.equal(hasMove("D3"), true);
    assert.equal(hasMove("E4"), true);
    assert.equal(hasMove("C4"), true);
    assert.equal(hasMove("E5"), true);
    assert.equal(hasMove("C5"), true);
    assert.equal(hasMove("E3"), true);
    assert.equal(hasMove("C3"), true);

    assert.equal(hasMove("D6"), false);
    assert.equal(hasMove("F4"), false);
  });

  it("não mostra movimentos quando não é o turno da peça", () => {
    onMove[0] = "b";

    const rook = place(new Rook("wr1"), "D4");

    rook.move(boardPieces, onMove);

    assert.equal(hasMove("D5"), false);
    assert.equal(hasMove("D3"), false);
    assert.equal(hasMove("E4"), false);
    assert.equal(hasMove("C4"), false);
  });
});