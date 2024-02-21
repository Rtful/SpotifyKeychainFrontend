import Result from "./Result.ts";

interface Album extends Result {
	images: { url: string }[];
	artists: { name: string }[];
}

export default Album;
