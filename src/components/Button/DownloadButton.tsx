import { FC } from "react"
import { AiOutlineCloudDownload } from "react-icons/ai";

interface DownloadButtonProps {
    onClick: () => void;
}

export const DownloadButton: FC<DownloadButtonProps> = ({onClick}) => {
    return (
        <div className={"download-button"} onClick={onClick}>
            <AiOutlineCloudDownload/>
        </div>
    )
}