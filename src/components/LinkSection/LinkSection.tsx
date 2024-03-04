import { FC, ReactNode, useState } from "react";
import "./styles.scss";
import { Button } from "../Button/Button";
import { RxCross2 } from "react-icons/rx";
import { useSnackbar } from "notistack";

interface linkButtonProps {
	onSubmit: (arg0: string, arg1: string | undefined) => void;
	icon?: ReactNode;
}

export const LinkSection: FC<linkButtonProps> = ({ onSubmit, icon }) => {
	const [displaySearch, setDisplaySearch] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const { enqueueSnackbar } = useSnackbar();

	const checkLink = (link: string) => {
		const regex =
			/^https:\/\/open\.spotify\.com\/(show|episode|track|artist|album|playlist)\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?$/;

		return regex.test(link);
	};

	const enterListener = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			if (checkLink(searchValue)) {
				onSubmit(searchValue, "spotifyCode");
			} else {
				enqueueSnackbar("Unvalid Spotify Link", {
					autoHideDuration: 5000,
					preventDuplicate: false,
					variant: "error",
					anchorOrigin: { horizontal: "center", vertical: "bottom" },
				});
			}
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

				{searchValue.length > 0 && (
					<RxCross2
						onClick={() => setSearchValue("")}
						className="close-icon"
					/>
				)}
			</>
		</div>
	);
};
