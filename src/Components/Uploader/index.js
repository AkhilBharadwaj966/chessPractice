import { useState } from 'react';


const Uploader = ({setPgn}) => {
    const [inputText, setInputText] = useState('');

    const handleClick = () => {
      setPgn(inputText)
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
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleClick}>Submit</button>
        </div>
    </div>
      )
}
export default Uploader