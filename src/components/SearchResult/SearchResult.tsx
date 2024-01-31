import { FC } from "react";
import Result from "./Result.ts";
import "./styles.scss";

interface SearchResultProps {
	result: Result;
	onClickFunction: () => void;
}

export const SearchResult: FC<SearchResultProps> = ({
	result,
	onClickFunction,
}) => {

    const imageUrl = result.album ? result.album.images[0].url : result.images && result.images.length > 0 ? result.images[0].url : "/src/img/user_default.png";

	return (
		<div className={"result"} onClick={onClickFunction}>
			<img src={imageUrl} alt={result.name} />
			<div>
				<div className="result-title">{result.name}</div>
				{result.artists ? result.artists[0].name : "Artist"}
			</div>
		</div>
	);
};
