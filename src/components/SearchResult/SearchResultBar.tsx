import { FC } from "react";
import Result from "./Result.ts";
import "./styles.scss";
import { DownloadButton } from "../Button/DownloadButton.tsx";

interface SearchResultBarProps {
	result: Result;
	onClickFunction: () => void;
}

export const SearchResultBar: FC<SearchResultBarProps> = ({
	result,
	onClickFunction,
}) => {
	const imageUrl = result.album
		? result.album.images[0].url
		: result.images && result.images.length > 0
			? result.images[0].url
			: "/src/img/user_default.png";

	return (
		<div className={"result result-bar"}>
			<div className="image-container">
				<img src={imageUrl} alt={result.name} />
			</div>

			<div className="result-bar-content">
				<div className="result-bar-textarea">
					<div className="result-title">{result.name}</div>
					{result.artists ? result.artists[0].name : "Artist"}
				</div>

				<DownloadButton onClick={onClickFunction}/>
			</div>
		</div>
	);
};
