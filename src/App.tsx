import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const CLIENT_ID = "35e420fcea2b456ba34b98c24b1610b9"
const CLIENT_SECRET = "e80fddb0c3f247e28d1b1afe887049a3"


function App() {
    const [searchString, setSearchString] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [filename, setFilename] = useState<string>('spotifyCode')
    const [accessToken, setAccessToken] = useState<string>('')

    // API access token
    useEffect(() => {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data))
    }, [])

    // Search
    async function search() {
        let artistParameters = {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':accessToken
            }
        }
        const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchString + '&type=artist', artistParameters)
            .then(response => response.json())
            .then(data => {return data.artists.items[0].id})
        console.log('searching for "' + searchString + '"')
        console.log('Artist ID "' + artistID + '"')
    }

    // download
    function download3dModel() {
        const data = new URLSearchParams();
        data.append('url', url);
        fetch('http://spotifycode.dodger.ch:5000/getCode', {
            method: 'POST',
            mode: 'cors',
            body: data
        }).then(response => response.blob())
            .then(blob => {
                const fileUrl = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = fileUrl
                link.setAttribute('download', filename + ".stl") // Set the desired file name and extension
                document.body.appendChild(link)
                link.click()
                link.remove()
            })
    }

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
            <div>
                <input
                    value={searchString}
                    onChange={e => {
                        setSearchString(e.target.value);
                    }}
                />
                <button onClick={() => {
                    search();
                }}></button>
            </div>
            <div>
                <input
                    value={url}
                    onChange={e => {
                        setUrl(e.target.value);
                    }}
                />
                <button onClick={() => {
                    download3dModel();
                }}></button>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
