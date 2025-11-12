
import React ,{ useState } from 'react';
import axios from 'axios'

function Compiler() {
  const [code,setCode]=useState('');
  const [language,setLanguage]=useState('cpp');
  const [input,setInput]=useState('');
  const [outputRun, setOutputRun] = useState('');
  const handleRun=async()=>{
    const payload={
      language:'cpp',
      code,
      input
    };
    const res=await axios.post("http://localhost:4000/run",payload);
    console.log(res.data.output);
    setOutputRun(res.data.output);
  }

  const handleSubmit=async()=>{
    const payload={
      language,
      code
    };
    const outputSubmit=await axios.post("http://localhost:4000/run",payload);
    //console.log(code);
  }


  return (
    <div>
      <h1>Online Compiler</h1>
      <textarea rows="20" cols="75" value={code}
      onChange={(e)=>{
        setCode(e.target.value);
        //console.log(e.target.value);//console code too
      }}></textarea>
      
      <br/>
      <textarea rows="4" cols="15" value={input}
      onChange={(e)=>{
        setInput(e.target.value);
      }}>Input</textarea>
      <button onClick={handleRun}>Run</button>
      <button onClick={handleSubmit}>Submit</button>
      <p>Output:{outputRun}</p>
    </div>
  );
}

export default Compiler;
