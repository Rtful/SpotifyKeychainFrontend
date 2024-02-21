import Result from "./Result.ts";

interface Artist extends Result {
	images: { url: string }[];
}

export default Artist;
