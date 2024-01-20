import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [url, setUrl] = useState<string>('')

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <div>
                <input
                    value={url}
                    onChange={e => {
                        setUrl(e.target.value);
                    }}
                />
                <button onClick={() => {
                    download3dModel(url, "spotifyCode");
                }}></button>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

function download3dModel(url: string, filename:string) {
    const data = new URLSearchParams();
    data.append('url', url);
    fetch('http://spotifycode.dodger.ch:5000/getCode', {
        method: 'POST',
        mode: 'cors',
        body: data
    }).then(response => response.blob())
        .then(blob => {
            const fileUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', filename); // Set the desired file name and extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
}

export default App
