import { user } from "./paths";
import {moviePaths} from "../movie/paths";

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const storeUserData = async (id, email, name, url) => {
    try {
        const response = await fetch(user.storeUserData(), {
                method: 'POST',
                body: JSON.stringify({ id, email, name, url }),
                headers: defaultHeaders
            }
        );

        return response.json();
    } catch (err) {
        console.error(err);
    }
};

export const getRecommendedMovies = async (id) => {
    try {
        const response = await fetch(user.getRecommendedMovies(id), {
                method: 'GET',
                headers: defaultHeaders
            }
        );

        return response.json();
    } catch (err) {
        console.error(err);
    }
};

export const getTopRatedMovies = async (id) => {
    try {
        const response = await fetch(user.getTopRatedMovies(id), {
                method: 'GET',
                headers: defaultHeaders
            }
        );

        return response.json();
    } catch (err) {
        console.error(err);
    }
};