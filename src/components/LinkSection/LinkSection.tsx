import { FC, ReactNode, useState } from "react";
import "./styles.scss";
import { Button } from "../Button/Button";
import { RxCross2 } from "react-icons/rx";

interface linkButtonProps {
	onSubmit: (arg0: string, arg1: string | undefined) => void;
	icon?: ReactNode;
}

export const LinkSection: FC<linkButtonProps> = ({ onSubmit, icon }) => {
	const [displaySearch, setDisplaySearch] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const enterListener = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			onSubmit(searchValue, "spotifyCode");
		}
	};

	return (
		<div className="link-section" data-active={displaySearch}>
			<Button
				onClick={() => {
					setDisplaySearch(!displaySearch);
					setSearchValue("");
				}}
			>
				{icon}
			</Button>
			<>
				<input
					placeholder={"Already have a link?"}
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					onKeyDown={enterListener}
					data-avtive={displaySearch}
				/>

				<div className="close-icon">
					{searchValue.length > 0 && (
						<RxCross2 onClick={() => setSearchValue("")} />
					)}
				</div>
			</>
		</div>
	);
};
