import Track from "./Track.ts";

export default function TrackSearchResult({track, chooseTrack}: {
    track: Track,
    chooseTrack: (track: Track) => void
}) {
    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div
            style={{cursor: "pointer"}}
            onClick={handlePlay}
        >
            <img src={track.album.images[0].url} style={{height: "64px", width: "64px"}}/>
            <div>
                <div>{track.name}</div>
                <div>{track.artists[0].name}</div>
            </div>
        </div>
    )
}
