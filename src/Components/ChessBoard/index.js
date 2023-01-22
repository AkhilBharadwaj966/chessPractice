import React, { useState } from 'react';
import { useEffect,useMemo,useCallback } from 'react';
import {Chess} from 'chess.js';
import { chessBoardStyles } from './style';


const pieceImages = {
  'p': '../../images/blackPawn.png',
  'r': '../../images/blackRook.png',
  'n': './../images/blackKnight.png',
  'k': './../images/blackKing.png',
  'q': './../images/blackQueen.png',
  'b': './../images/blackBishop.png',
  'P': './../images/whitePawn.png',
  'R': './../images/whiteRook.png',
  'N': './../images/whiteKnight.png',
  'K': './../images/whiteKing.png',
  'Q': './../images/whiteQueen.png',
  'B': './../images/whiteBishop.png',
}

const ChessBoard = (pgn) => {
  const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [moves,setMoves] = useState([])
  const [currentMoveIndex,setCurrentMoveIndex] = useState(0);
  const [evaluation,setEvaluation] = useState(0);

  // const playGame = async () => {
  //   while (currentMoveIndex < moves.length - 1) {
  //     await onNext();
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //   }
  // }

  const  getEvaluation2 = useCallback((fen) => {
    return new Promise((resolve) => {
            const stockfish = new Worker('stockfish.js');
            stockfish.postMessage('uci');
            stockfish.onmessage = (event) => {
                if (event.data === 'uciok') {
                    stockfish.postMessage(`position fen ${fen}`);
                    stockfish.postMessage(`eval`);
                    stockfish.postMessage(`isready`);
                    stockfish.onmessage = (event) => {
                        if (event.data.startsWith("Total Evaluation")) {
                            const evalMatch = formatEvaluation(event.data)
                            resolve(evalMatch);
                        }
                    };
                }
            };
    });
  },[] );

  function convertFENtoArray(fen) {
    const rows = fen.split("/");
    const board = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      let j = 0;
      for (let c of rows[i]) {
        if (c >= '1' && c <= '8') {
          for (let k = 0; k < parseInt(c); k++) {
            board[i][j] = null;
            j++;
          }
        } else {
          board[i][j] = c;
          j++;
        }
      }
    }
    return board;
  }

  const boardPosition = useMemo(() => {
    return convertFENtoArray(position);
  }, [position]);

  function loadMoves(pgnText){
    const chess = new Chess();
    chess.loadPgn(pgnText);
    setMoves(chess.history({verbose:true}));
  }

  const playGame = useCallback(async() => {
    for(let i = 0; i < moves.length; i++) {
      setCurrentMoveIndex(i);
      setPosition(moves[i].fen);
      setEvaluation(await getEvaluation2(moves[i].fen));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }, [moves, setCurrentMoveIndex, setPosition, setEvaluation, getEvaluation2])

  useEffect(() => {
    
    if(pgn.pgn){
        loadMoves(pgn.pgn);
        //playGame()
    }
  }, [pgn, playGame]);

  const onNext = async () =>{
    setCurrentMoveIndex(currentMoveIndex + 1);
    setPosition(moves[currentMoveIndex].fen);
    setEvaluation(await getEvaluation2(moves[currentMoveIndex].fen) );
  }

  const onPrevious = async () =>{
    setCurrentMoveIndex(currentMoveIndex - 1);
    setPosition(moves[currentMoveIndex].fen);
    setEvaluation(await getEvaluation2(moves[currentMoveIndex].fen) );
  }

    function formatEvaluation(evaluationString) {
        const regex = /(-?\d+(\.\d+)?)/;
        return `Evaluations : ${parseFloat(evaluationString.match(regex)[0])}`;
    }

  return (
    <div css={chessBoardStyles} >
      <div>
        Current FEN : {position}
      </div>
      <table>
        {boardPosition &&(
            <tbody>
          {Array(8).fill(0).map((row, i) => (
            <tr key={i}>
              {Array(8).fill(0).map((col, j) => (
                <Square 
                  key={j} 
                  i={i} 
                  j={j} 
                  piece={boardPosition[i][j]}
                />
              ))}
            </tr>
          ))}
        </tbody>
        )}
        <div>
          {evaluation}
        </div>
      </table>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',paddingRight:'0.8vw' }}>
          <div style={{paddingRight:'0.3vw'}}>
            <button onClick={onNext}> Next</button>
          </div>
          <div style={{paddingLeft:'0.3vw'}}>
            <button onClick={onPrevious}> Previous</button>
          </div>
        </div>
    </div>
  );
};

const Square = ({ i, j,piece }) => {
  const imagePath = pieceImages[piece] || null;
    const squareStyles = [];
    for (let i = 0; i < 8; i++) {
      squareStyles[i] = [];
      for (let j = 0; j < 8; j++) {
        squareStyles[i][j] = { backgroundColor: (i + j) % 2 === 0 ? 'white' : 'green',
        color: (i + j) % 2 !== 0 ? 'white' : 'black',
        width:'10vh',
        height:'10vh',
        border:'black',
        borderStyle:'solid',
         };
        
      }
    }
  return (
    <td style={squareStyles[i][j]}>
      {imagePath && <img src={imagePath} alt={piece} />}
    </td>
  );
}

export default ChessBoard;
