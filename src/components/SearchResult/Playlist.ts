import Result from "./Result.ts";

interface Playlist extends Result {
	owner: { display_name: string };
	images: { url: string }[];
}

export default Playlist;
