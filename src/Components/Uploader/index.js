import { useState } from 'react';


const Uploader = ({setPgn,setTresholdValue}) => {
    const [inputText, setInputText] = useState('');
    const [treshold,setTreshold] = useState(5);

    const handleClick = () => {
      console.log(treshold);
      setPgn(inputText)
      setTresholdValue(treshold)
    }

    return ( 
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'0.3vh',paddingTop:'40px',marginRight:'0.2vw'}}>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            style={{
              width: '100%',
              height: '200px',
              fontSize: '20px',
              padding: '10px',
              resize: 'none'
            }}
          />
        </div>
        <input 
          type="number" 
          value={treshold} 
          onChange={e => setTreshold(e.target.value)} 
          placeholder="Enter treshold"
          className="form-control"
        />
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleClick}>Submit</button>
        </div>
    </div>
      )
}
export default Uploader