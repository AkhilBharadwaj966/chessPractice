import Stockfish from 'stockfish.js';

let engine = new Stockfish();

// function to start the engine
export function startEngine() {
    engine.postMessage("uci");
    engine.postMessage("isready");
}

// function to stop the engine
export function stopEngine() {
    engine.postMessage("quit");
}

// function to set the position
export function setPosition(fen) {
    engine.postMessage(`position fen ${fen}`);
}

// function to get the evaluation
export function getEvaluation() {
    engine.postMessage("eval");
}

