import { useState } from 'react';

let selectedSquare = null;
let possibleMoves = null;

// Function to handle user move
export function handleMove(square) {
  // If a square is already selected
  if (selectedSquare) {
    // Check if the move is valid
    if (possibleMoves && possibleMoves.includes(square)) {
      // Make the move
      // ...
      // Clear the selected square and possible moves
      selectedSquare = null;
      possibleMoves = null;
    } else {
      // Select the square
      selectedSquare = square;
      // Get the possible moves for the selected square
      possibleMoves = getPossibleMoves(square);
    }
  } else {
    // Select the square
    selectedSquare = square;
    // Get the possible moves for the selected square
    possibleMoves = getPossibleMoves(square);
  }
}

// Function to update the board
export function updateBoard() {
  // Clear the board
  // ...
  // Draw the pieces
  // ...
  // Draw the selected square and possible moves
  // ...
}

// Function to get the possible moves for a square
function getPossibleMoves(square,piece) {
    // Initialize an empty array to store possible moves
    let possibleMoves = [];
  
  
    // Check the type of piece and get the possible moves
    switch (piece) {
      case "p": // Pawn
         // Check if the pawn is on the starting row
        // if (square.row === 1) {
        //     // Check if the square in front is empty
        //     if (board[square.row + 1][square.col] === null) {
        //     possibleMoves.push({ row: square.row + 1, col: square.col });
        //     // Check if the square 2 spaces in front is empty
        //     if (board[square.row + 2][square.col] === null) {
        //         possibleMoves.push({ row: square.row + 2, col: square.col });
        //     }
        //     }
        // } else {
        //     // Check if the square in front is empty
        //     if (board[square.row + 1][square.col] === null) {
        //     possibleMoves.push({ row: square.row + 1, col: square.col });
        //     }
        // }
        // // Check if the pawn can capture a piece on the diagonal squares
        // if (square.col > 0) {
        //     if (board[square.row + 1][square.col - 1] !== null) {
        //     possibleMoves.push({ row: square.row + 1, col: square.col - 1 });
        //     }
        // }
        // if (square.col < 7) {
        //     if (board[square.row + 1][square.col + 1] !== null) {
        //     possibleMoves.push({ row: square.row + 1, col: square.col + 1 });
        //     }
        // }
        break;
      case "r": // Rook
        // ...
        break;
      case "n": // Knight
        // ...
        break;
      case "b": // Bishop
        // ...
        break;
      case "q": // Queen
        // ...
        break;
      case "k": // King
        // ...
        break;
      default:
        break;
    }
  
    // Return the possible moves
    return possibleMoves;
  }
  

// Function to undo move
export function undoMove(){
  // undo the move
  // ...
}

// Function to get move suggestions
// Function to get move suggestions
export function getMoveSuggestion(){
    // get move suggestions
    // ...
  }
  