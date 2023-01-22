import './App.css';
import ChessBoard from './Components/ChessBoard';
import Uploader from './Components/Uploader';
import {useState} from 'react';

function App() {
  const [pgn,setPgn] = useState('');
  const [tresholdValue,setTresholdValue] = useState(5);
  
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0.5' }}>
          <ChessBoard pgn={pgn} tresholdValue={tresholdValue}/>
        </div>
        <div style={{ flex: '0.5' }}>
          <Uploader setPgn={setPgn} setTresholdValue={setTresholdValue}/>
        </div>
    </div>
    </div>
  );
}

export default App;
