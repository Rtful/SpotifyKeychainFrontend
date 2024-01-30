import Result from "./Result.ts";

interface Track extends Result{
    album: { images: { url: string }[] };
    artists: { name: string }[];
}

export default Track;