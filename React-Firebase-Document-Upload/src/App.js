import { useState } from 'react';
import './App.css';
import {upload} from './firebase'

function App() {

  const [progress,setProgress] = useState({});
  const [url,setUrl] = useState('');

  const onFileChange = async (e) => {
    let [file] = e.target.files;
    upload(file,'test', setProgress,progress,setUrl)
  };


  return (
    <div className="App">
    <input id='file-upload' type="file" onChange={onFileChange}/>
    <br/>
    {progress?.alert}
    <br/>
    {url && 
    <object data={url} type="application/pdf" width="80%" height="500px">
      <p>Unable to display PDF file. <a href={url}>Download</a> instead.</p>
    </object>
    }
    <br/>
    </div>
  );
}

export default App;
