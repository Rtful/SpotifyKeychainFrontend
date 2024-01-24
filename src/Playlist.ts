interface Playlist {
    name: string;
    owner: { display_name: string };
    images: { url: string }[];
    href: string;
    uri: string;
}

export default Playlist;