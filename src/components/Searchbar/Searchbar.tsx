import React, { FC, useState } from "react";
import "./styles.scss";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

interface SearchbarProps {
	onSubmit: (input: string) => void;
    placeholder: string;
}

export const Searchbar: FC<SearchbarProps> = ({ onSubmit, placeholder }) => {
	const [searchValue, setSearchValue] = useState("");

	const enterDetector = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			onSubmit(searchValue);
		}
	};

	return (
		<>
			<div className="searchbar">
				<IoSearchOutline />
				<input
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					onKeyDown={enterDetector}
				/>
				{searchValue.length > 0 && (
					<RxCross2 onClick={() => setSearchValue("")} />
				)}
			</div>
		</>
	);
};
