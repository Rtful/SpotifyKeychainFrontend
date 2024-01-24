import Artist from "./Artist.ts";

export default function ArtistSearchResult({artist}: {
    artist: Artist,
}) {
    console.log(artist)
    return (
        <div
            style={{cursor: "pointer"}}
        >
            <img src={artist.images.length > 0 ? artist.images[0].url : ''} style={{height: "64px", width: "64px"}} alt={artist.name}/>
            <div>
                <div>{artist.name}</div>
            </div>
        </div>
    )
}
