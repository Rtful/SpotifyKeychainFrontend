import axios from "axios";
import Token from "./components/Token.ts";

const CLIENT_ID = "35e420fcea2b456ba34b98c24b1610b9";

export default async function Login(redirectUri: string, authUrl: URL) {

    const codeVerifier = generateRandomString(64);

    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    const scope = 'user-read-private user-read-email';

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

const sha256 = async (plain: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const generateRandomString = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc: string, x: number) => acc + possible[x % possible.length], "");
}


const base64encode = (input: ArrayBuffer): string => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export const getToken = async (code: string, redirectUri: string): Promise<Token> => {
    const codeVerifier = localStorage.getItem('code_verifier') ?? "";

    const payload = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
    });
    const response = await axios.post("https://accounts.spotify.com/api/token", payload, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const token: { access_token: string, refresh_token: string } = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
    }
    //TODO: implement refreshing token
    localStorage.setItem('token', JSON.stringify(token));
    return token;
}