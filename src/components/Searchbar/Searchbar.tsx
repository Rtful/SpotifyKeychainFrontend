import {FC, ReactNode, useEffect, useRef, useState} from "react";
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
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const searchTimeout = 250;

	useEffect(() => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			// If input is empty (even if it is multiple spaces)
			if (!searchValue.match(/^\s*$/)) {
				console.log("nigger")
				onSubmit(searchValue);
			} else {
				clearFunction();
			}
		}, searchTimeout);
	}, [searchValue]);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		}
	}, []);

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
