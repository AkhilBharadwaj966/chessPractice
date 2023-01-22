import { css } from 'styled-components';

export const chessBoardStyles = css`
  /* Styles for the chess board */
  .chess-board {
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    height: 400px;
    background-color: #f5f5dc;
  }

  /* Styles for the chess board squares */
  .chess-board .square {
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Styles for the chess pieces */
  .chess-board .piece {
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Styles for the selected square */
  .chess-board .square.selected {
    background-color: #ff0;
  }

  /* Styles for the possible move squares */
  .chess-board .square.possible-move {
    background-color: #0f0;
  }
`;
