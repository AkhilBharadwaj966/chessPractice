import React, { useState } from 'react';
import Stockfish from 'stockfish.js';
import { stockfishStyles } from '../styles';
import { useEffect } from 'react';

import { css } from 'styled-components';

const StockfishEval = () => {
  const [evaluation, setEvaluation] = useState(0);
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    const stockfish = new Stockfish();
    setEngine(stockfish);
    stockfish.onmessage = (event) => {
      if (event.startsWith('info depth')) {
        stockfish.postMessage('eval');
      } else if (event.startsWith('info score cp')) {
        setEvaluation(parseInt(event.split(' ')[3]));
      }
    }
    return () => {
      stockfish.terminate();
    }
  }, []);

  const updateEvaluation = (fen) => {
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage('eval');
  }

  return (
    <div css={stockfishStyles}>
      <div className="stockfish-eval">
        <div className="indicator" style={{width: evaluation + '%'}}></div>
      </div>
    </div>
  );
};

export default StockfishEval;

