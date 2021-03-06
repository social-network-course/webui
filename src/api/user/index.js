import { user } from "./paths";
import { defaultHeaders, instance } from "../network";

export const storeUserData = async (id, email, name, url) => {
    try {
        const response = await instance.post(
            user.storeUserData,
            { id, email, name, url },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const getUserData = async () => {
    try {
        const response = await instance.get(
            user.getUserData,
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};

export const addToFavouriteGenres = async ({ userId, genreId }) => {
    try {
        const response = await instance.post(
            user.addToFavouriteGenres(userId),
            { genreId: genreId },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const removeFromFavouriteGenres = async ({ userId, genreId }) => {
    try {
        const response = await instance.post(
            user.removeFromFavouriteGenres(userId),
            { genreId: genreId },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const addToLikes = async ({ userId, movieId }) => {
    try {
        const response = await instance.post(
            user.addToLikes(userId),
            { movieId: movieId },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const removeFromLikes = async ({ userId, movieId }) => {
    try {
        const response = await instance.post(
            user.removeFromLikes(userId),
            { movieId: movieId },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const addToWatchlist = async ({ userId, movieId }) => {
    try {
        const response = await instance.post(
            user.addToWatchlist(userId),
            { movieId: movieId },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const removeFromWatchlist = async ({ userId, movieId }) => {
    try {
        const response = await instance.post(
            user.removeFromWatchlist(userId),
            { movieId: movieId },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const addToRatings = async ({ userId, movieId, rating, genres }) => {
    try {
        const response = await instance.post(
            user.addToRatings(userId),
            { movieId: movieId, rating: rating, genres: genres },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};

export const logVisit = async ({ userId, movieId, time }) => {
    try {
        const response = await instance.post(
            user.logVisit(userId),
            { movieId: movieId, time: Number(time) },
            { headers: defaultHeaders }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        return Promise.reject(err.statusText);
    }
};