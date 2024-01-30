interface Result {
    album?: { images: { url: string }[] };
    images?: { url: string }[];
    name: string;
    artists?: { name: string }[];
    href: string;
    uri: string;
    external_urls: {spotify:string}
}

export default Result;