import Result from "./Result.ts";

export default function SearchResult({result, onClickFunction}: {
    result: Result,
    onClickFunction: () => void
}) {
    let imageUrl = "/src/img/user_default.png";
    if (typeof (result.album) !== 'undefined') {
        imageUrl = result.album.images[0].url;
    } else if (typeof (result.images) !== 'undefined' && result.images.length > 0) {
        imageUrl = result.images[0].url;
    }
    return (
        <div className={"result"} onClick={onClickFunction}>
            <img src={imageUrl}
                 alt={result.name}/>
            <div>
                <div>{result.name}</div>
                {result.artists != null ? result.artists[0].name : ''}
            </div>
        </div>
    )
}
