import { FC, ReactNode, useEffect, useState } from "react";
import "./styles.scss";
import { RxCross2 } from "react-icons/rx";

interface SearchbarProps {
	onSubmit: (search: string) => void;
	clearFunction: () => void;
	placeholder: string;
	icon?: ReactNode;
}

export const Searchbar: FC<SearchbarProps> = ({
	onSubmit,
	placeholder,
	icon,
	clearFunction,
}) => {
	const [searchValue, setSearchValue] = useState("");
	const [lastSearchValue, setLastSearchValue] = useState("");

	/* TODO: @Silvan pls clean up, I am too stupid.
	 should only add a timer when searchvalue is updated to prevent too many requests while typing.
	 after timeout of not having changed any value, search should be done.
	 works like this but tries to search every 200ms regardless of change
	 */
	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchValue !== "") {
				if (searchValue !== lastSearchValue) {
					onSubmit(searchValue);
					setLastSearchValue(searchValue);
				}
			} else {
				clearFunction();
			}
		}, 200);
		return () => clearTimeout(timer);
	}, [searchValue, onSubmit, clearFunction]);

	return (
		<>
			<div className="searchbar">
				{icon}
				<input
					placeholder={placeholder}
					value={searchValue}
					onInput={(e) => {
						setSearchValue(e.currentTarget.value);
					}}
				/>
				{searchValue.length > 0 && (
					<RxCross2 onClick={() => setSearchValue("")} className="close-icon"/>
				)}
			</div>
		</>
	);
};
