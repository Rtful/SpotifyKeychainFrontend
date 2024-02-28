import { useEffect, useState } from "react";
import "./App.scss";
import Login, {getAccessToken} from "./Login.ts";
import Track from "./components/SearchResult/Track.ts";
import Artist from "./components/SearchResult/Artist.ts";
import Album from "./components/SearchResult/Album.ts";
import Playlist from "./components/SearchResult/Playlist.ts";
import { StlViewer } from "react-stl-viewer";
import { Searchbar } from "./components/Searchbar/Searchbar.tsx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { LinkSection } from "./components/LinkSection/LinkSection.tsx";
import { IoSearchOutline } from "react-icons/io5";
import { SearchResult } from "./components/SearchResult/SearchResult.tsx";
import Token from "./components/Token.ts";

// const CLIENT_ID = "35e420fcea2b456ba34b98c24b1610b9";
const REDIRECT_URI = `http://${window.location.hostname}:${window.location.port}`;
const AUTH_URL = new URL("https://accounts.spotify.com/authorize")

function App() {
	const [stlUrl, setStlUrl] = useState<string>("");
    const [token, setToken] = useState<Token | null>(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken ? JSON.parse(storedToken) : null;
    });
    const [searchResults, setSearchResults] = useState<{
		artists: Artist[];
		albums: Album[];
		tracks: Track[];
		playlists: Playlist[];
	}>({
		artists: [],
		albums: [],
		tracks: [],
		playlists: [],
	});

	useEffect(() => {
        if (token === null) {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code') ?? "";
            getAccessToken(code, REDIRECT_URI)
                .then((token) => setToken(token))
        }
	})

	function search(input: string) {
		const requestParameters = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token?.access_token,
			},
		};
		fetch(
			"https://api.spotify.com/v1/search?q=" +
				input +
				"&type=album%2Ctrack%2Cartist%2Cplaylist&limit=5",
			requestParameters,
		)
			.then((response) => response.json())
			.then((data) => {
				setSearchResults({
					tracks: data.tracks.items,
					albums: data.albums.items,
					artists: data.artists.items,
					playlists: data.playlists.items,
				});
			});
	}

	// download
	function download3dModel(
		urlToBeDownloaded: string,
		fileName: string | undefined,
	) {
		const data = new URLSearchParams();
		data.append("url", urlToBeDownloaded);
		fetch("http://spotifycode.dodger.ch:5000/getCode", {
			method: "POST",
			mode: "cors",
			body: data,
		})
			.then((response) => response.blob())
			.then((blob) => {
				setStlUrl(window.URL.createObjectURL(blob));
				const link = document.createElement("a");
				link.href = stlUrl;
				link.setAttribute("download", fileName + ".stl"); // Set the desired file name and extension
				document.body.appendChild(link);
				link.click();
				link.remove();
			});
	}

	return (
		<>
			{stlUrl && <StlViewer orbitControls shadows url={stlUrl} />}

			<header>
				{token === null ? (
					<div>
						Want to search for Songs, Playlists and more?
						<a
							onClick={() => {
								Login(REDIRECT_URI, AUTH_URL);
							}}
						>
							Login to Spotify
						</a>
					</div>
				) : (
					<>
						<Searchbar
							placeholder="What do you want to search?"
							onSubmit={search}
							icon={<IoSearchOutline />}
							clearFunction={() => {
                                setSearchResults({
                                    artists: [],
                                    albums: [],
                                    tracks: [],
                                    playlists: [],
                                });
							}}
						/>
					</>
				)}

				<LinkSection
					icon={<FaExternalLinkAlt className="link-icon" />}
					onSubmit={download3dModel}
					// TODO: make request for appropriate type and get the name of the track, playlist, artist or album
					// example: 65mUrGkPCn1cZIucA5FXmZ from https://open.spotify.com/playlist/65mUrGkPCn1cZIucA5FXmZ?si=7015af7042a64a44
					// https://api.spotify.com/v1/playlists/65mUrGkPCn1cZIucA5FXmZ}}
				/>
			</header>

			<div className="content">
				<div id={"results"}>
					{searchResults.tracks.length != 0 && (
						<div className={"result-group column"}>
							<h2>Songs</h2>
							<div id={"tracks"} className={"result-container"}>
								{searchResults.tracks.map((track: Track) => (
									<SearchResult
										result={track}
										onClickFunction={() => {
											download3dModel(
												track.external_urls.spotify,
												track.name,
											);
										}}
										key={track.uri}
									/>
								))}
							</div>
						</div>
					)}

					{searchResults.tracks.length != 0 && (
						<div className={"result-group column"}>
							<h2>Artists</h2>
							<div className={"result-container artists"}>
								{searchResults.artists.map((artist: Artist) => (
									<SearchResult
										result={artist}
										onClickFunction={() => {
											download3dModel(
												artist.external_urls.spotify,
												artist.name,
											);
										}}
										key={artist.uri}
									/>
								))}
							</div>
						</div>
					)}

					{searchResults.tracks.length != 0 && (
						<div className={"result-group row"}>
							<h2>Albums</h2>
							<div className={"result-container"}>
								{searchResults.albums.map((album: Album) => (
									<SearchResult
										result={album}
										onClickFunction={() => {
											download3dModel(
												album.external_urls.spotify,
												album.name,
											);
										}}
										key={album.uri}
									/>
								))}
							</div>
						</div>
					)}

					{searchResults.tracks.length != 0 && (
						<div className={"result-group row"}>
							<h2>Playlists</h2>
							<div
								id={"playlists"}
								className={"result-container"}
							>
								{searchResults.playlists.map(
									(playlist: Playlist) => (
										<SearchResult
											result={playlist}
											onClickFunction={() => {
												download3dModel(
													playlist.external_urls
														.spotify,
													playlist.name,
												);
											}}
											key={playlist.uri}
										/>
									),
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{/*<div>*/}
			{/*    <Player accessToken={accessToken} trackUri={playingTrack?.href}/>*/}
			{/*</div>*/}
		</>
	);
}

export default App;
