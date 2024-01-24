import Result from "./Result.ts";

interface Artist extends Result {
    images: { url: string }[];
    name: string;
    uri: string;
}

export default Artist;