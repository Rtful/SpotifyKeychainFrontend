import {useEffect, useState} from 'react'
import './App.css'
import TrackSearchResult from "./TrackSearchResult.tsx"
import ArtistSearchResult from "./ArtistSearchResult.tsx";
import Player from "./Player.tsx";
import Track from "./Track.ts";
import Artist from "./Artist.ts";
import Album from "./Album.ts";
import Playlist from "./Playlist.ts";

const CLIENT_ID = "35e420fcea2b456ba34b98c24b1610b9"
const CLIENT_SECRET = "e80fddb0c3f247e28d1b1afe887049a3"


function App() {
    const [searchString, setSearchString] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [filename, setFilename] = useState<string>('spotifyCode');
    const [accessToken, setAccessToken] = useState<string>('');
    const [searchResults, setSearchResults] = useState<{ artists: Artist[], albums:Album[], tracks:Track[], playlists:Playlist[] }>({
        artists: [],
        albums: [],
        tracks: [],
        playlists: []
    });
    const [playingTrack, setPlayingTrack] = useState<Track>();

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
            .then(data => setAccessToken(data.access_token));
    }, [])

    // Search
    async function search() {
        setFilename(searchString)
        let artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };
        console.log(accessToken);
        // const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchString + '&type=artist', artistParameters)
        fetch('https://api.spotify.com/v1/search?q=' + searchString + '&type=album%2Ctrack%2Cartist%2Cplaylist&limit=5', artistParameters)
            .then(response => response.json())
            .then(data => {
                setSearchResults({
                    tracks: data.tracks.items,
                    albums: data.albums.items,
                    artists: data.artists.items,
                    playlists: data.playlists.items
                });
                console.log(data);
                // setSearchResults(data)
                // setFoundTracks(data.tracks.items);
            });
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
                const fileUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileUrl;
                link.setAttribute('download', filename + ".stl"); // Set the desired file name and extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }

    function chooseTrack(track: Track) {
        setPlayingTrack(track)
        setSearchString("")
    }

    return (
        <>
            <div>
                <label>
                    Search bar
                    <input
                        value={searchString}
                        onChange={e => {
                            setSearchString(e.target.value);
                        }}
                    />
                </label>
                <button onClick={() => {
                    search();
                }}></button>
            </div>
            <div>
                <label>
                    Spotify URL
                    <input
                        value={url}
                        onChange={e => {
                            setUrl(e.target.value);
                        }}
                    />
                </label>
                <button onClick={() => {
                    download3dModel();
                }}></button>
            </div>
            <div id={"tracks"}>
                {searchResults.tracks.map((track: Track) => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack}
                    />
                ))}
            </div>
            <div id={"artists"}>
                {searchResults.artists.map((artist: Artist) => (
                    <ArtistSearchResult
                        key={artist.uri}
                        artist={artist}
                    />
                ))}
            </div>
            {/*<div id={"albums"}>*/}
            {/*    {searchResults.albums.map((track: Track) => (*/}
            {/*        <TrackSearchResult*/}
            {/*            track={track}*/}
            {/*            key={track.uri}*/}
            {/*            chooseTrack={chooseTrack}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.href}/>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
