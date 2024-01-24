interface Track {
    album: { images: { url: string }[] };
    name: string;
    artists: { name: string }[];
    href: string;
    uri: string;
}

export default Track;