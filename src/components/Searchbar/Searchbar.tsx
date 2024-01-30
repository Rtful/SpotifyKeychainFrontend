import { FC, ReactNode, useEffect, useState } from "react";
import "./styles.scss";
import { RxCross2 } from "react-icons/rx";

interface SearchbarProps {
	onSubmit: (search: string) => void;
    placeholder: string;
    icon?: ReactNode;
    onIconClick?: () => void;
}

export const Searchbar: FC<SearchbarProps> = ({ onSubmit, placeholder, icon }) => {
	const [searchValue, setSearchValue] = useState("");

	const enterListener = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			onSubmit(searchValue);
		}
	};

    useEffect(() => {
        onSubmit(searchValue);
    }, [searchValue])

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
					onKeyDown={enterListener}
				/>
				{searchValue.length > 0 && (
					<RxCross2 onClick={() => setSearchValue("")}/>
				)}
			</div>
		</>
	);
};
