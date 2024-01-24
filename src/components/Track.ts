import Result from "./Result.ts";

interface Track extends Result{
    album: { images: { url: string }[] };
    name: string;
    artists: { name: string }[];
    href: string;
    uri: string;
}

export default Track;