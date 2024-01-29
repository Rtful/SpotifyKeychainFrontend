import { FC, ReactNode } from "react";
import "./styles.scss";

interface ButtonProps {
	children: string | ReactNode;
	onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
	return <button onClick={onClick}>{children}</button>;
};
