import { FC, ReactNode, useEffect, useState } from "react";
import "./styles.scss";
import { RxCross2 } from "react-icons/rx";

interface SearchbarProps {
	onSubmit: (search: string) => void;
	placeholder: string;
	icon?: ReactNode;
	onIconClick?: () => void;
}

export const Searchbar: FC<SearchbarProps> = ({
	onSubmit,
	placeholder,
	icon,
}) => {
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		if (searchValue !== "") {
			onSubmit(searchValue);
		}
	}, [searchValue]);

	return (
		<>
			<div className="searchbar">
				{icon}
				<input
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
				/>
				{searchValue.length > 0 && (
					<RxCross2 onClick={() => setSearchValue("")} />
				)}
			</div>
		</>
	);
};
