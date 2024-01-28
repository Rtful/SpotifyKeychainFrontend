import React, {useEffect, useState} from 'react'
import './App.css'
// import Player from "./Player.tsx";
import Track from "./components/Track.ts";
import Artist from "./components/Artist.ts";
import Album from "./components/Album.ts";
import Playlist from "./components/Playlist.ts";
import SearchResult from "./components/SearchResult.tsx";
import {StlViewer} from "react-stl-viewer";

const CLIENT_ID = "35e420fcea2b456ba34b98c24b1610b9"
const REDIRECT_URI = `http://${window.location.hostname}:${window.location.port}`;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"

function App() {
    const [searchString, setSearchString] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [stlUrl, setStlUrl] = useState<string>('');
    const [token, setToken] = useState<string | null>();
    const [searchResults, setSearchResults] = useState<{
        artists: Artist[],
        albums: Album[],
        tracks: Track[],
        playlists: Playlist[]
    }>({
        artists: [],
        albums: [],
        tracks: [],
        playlists: []
    });

    useEffect(() => {
        // The hash is supplied by the spotify login api as a GET parameter
        const hash: string = window.location.hash;
        let token: string | null = window.localStorage.getItem("token");

        if (!token && hash) {
            const hashParams: string[] = hash.substring(1).split("&");
            const accessTokenParam: string | undefined = hashParams.find(elem => elem.startsWith("access_token"));

            if (accessTokenParam) {
                token = accessTokenParam.split("=")[1];
                window.location.hash = "";
                // Saving the token as localstorage
                window.localStorage.setItem("token", token);
            }
        }
        setToken(token);
    }, [])

    function search() {
        const artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        fetch('https://api.spotify.com/v1/search?q=' + searchString + '&type=album%2Ctrack%2Cartist%2Cplaylist&limit=5', artistParameters)
            .then(response => response.json())
            .then(data => {
                setSearchResults({
                    tracks: data.tracks.items,
                    albums: data.albums.items,
                    artists: data.artists.items,
                    playlists: data.playlists.items
                });
            });
    }

    const enterDetector = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    // download
    function download3dModel(urlToBeDownloaded: string, fileName: string) {
        const data = new URLSearchParams();
        data.append('url', urlToBeDownloaded);
        fetch('http://spotifycode.dodger.ch:5000/getCode', {
            method: 'POST',
            mode: 'cors',
            body: data
        })
            .then(response => response.blob())
            .then(blob => {
                setStlUrl(window.URL.createObjectURL(blob));
                const link = document.createElement('a');
                link.href = stlUrl;
                link.setAttribute('download', fileName + ".stl"); // Set the desired file name and extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }

    return (
        <>
            {stlUrl && (
                <StlViewer
                    orbitControls
                    shadows
                    url={stlUrl}
                />
            )}
            <div>
                <label>
                    Already have a Spotify URL?
                    <input
                        value={url}
                        onChange={e => {
                            setUrl(e.target.value);
                        }}
                    />
                </label>
                <button onClick={() => {
                    download3dModel(url, 'spotifyCode');
                    // TODO: make request for appropriate type and get the name of the track, playlist, artist or album
                    // example: 65mUrGkPCn1cZIucA5FXmZ from https://open.spotify.com/playlist/65mUrGkPCn1cZIucA5FXmZ?si=7015af7042a64a44
                    // https://api.spotify.com/v1/playlists/65mUrGkPCn1cZIucA5FXmZ
                }}>Download Spotify Keychain STL</button>
            </div>
            <div>
                {
                    // If no token is set, display the login link, otherwise the search box
                    token === null ?
                        <div>
                            Want to search for Songs, Playlists and more?
                            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`}>Login to Spotify</a>
                        </div>
                        :
                        <><label>
                            Search for Songs, Albums, Playlists and Artists
                            <input
                                value={searchString}
                                onChange={e => {
                                    setSearchString(e.target.value);
                                }}
                                onKeyDown={enterDetector}/>
                        </label>
                            <button onClick={() => {
                                search();
                            }}>Search</button>
                        </>
                }
            </div>
            <div id={"results"}>
                <div className={"result-group column"}>
                    <p>Songs</p>
                    <div id={"tracks"} className={"result-container"}>
                        {searchResults.tracks.map((track: Track) => (
                            <SearchResult
                                result={track}
                                onClickFunction={() => {
                                    download3dModel(track.external_urls.spotify, track.name)
                                }}
                                key={track.uri}
                            />
                        ))}
                    </div>
                </div>
                <div className={"result-group column"}>
                    <p>Artists</p>
                    <div className={"result-container artists"}>
                        {searchResults.artists.map((artist: Artist) => (
                            <SearchResult
                                result={artist}
                                onClickFunction={() => {
                                    download3dModel(artist.external_urls.spotify, artist.name)
                                }}
                                key={artist.uri}
                            />
                        ))}
                    </div>
                </div>
                <div className={"result-group row"}>
                    <p>Albums</p>
                    <div className={"result-container"}>
                        {searchResults.albums.map((album: Album) => (
                            <SearchResult
                                result={album}
                                onClickFunction={() => {
                                    download3dModel(album.external_urls.spotify, album.name)
                                }}
                                key={album.uri}
                            />
                        ))}
                    </div>
                </div>
                <div className={"result-group row"}>
                    <p>Playlists</p>
                    <div id={"playlists"} className={"result-container"}>
                        {searchResults.playlists.map((playlist: Playlist) => (
                            <SearchResult
                                result={playlist}
                                onClickFunction={() => {
                                    download3dModel(playlist.external_urls.spotify, playlist.name)
                                }}
                                key={playlist.uri}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/*<div>*/}
            {/*    <Player accessToken={accessToken} trackUri={playingTrack?.href}/>*/}
            {/*</div>*/}
        </>
    )
}

export default App
