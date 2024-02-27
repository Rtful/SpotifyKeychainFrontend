import { FC } from "react";
import Result from "./Result.ts";
import "./styles.scss";
import { DownloadButton } from "../Button/DownloadButton.tsx";

interface SearchResultCardProps {
	result: Result;
	onClickFunction: () => void;
}

export const SearchResultCard: FC<SearchResultCardProps> = ({
	result,
	onClickFunction,
}) => {

    const imageUrl = result.album ? result.album.images[0].url : result.images && result.images.length > 0 ? result.images[0].url : "/src/img/user_default.png";

	return (
		<div className={"result result-card"}>
			<div className="image-container">
				<img src={imageUrl} alt={result.name} />
				<DownloadButton onClick={onClickFunction}/>
			</div>

			<div>
				<div className="result-title">{result.name}</div>
				{result.artists ? result.artists[0].name : "Artist"}
			</div>
		</div>
	);
};
