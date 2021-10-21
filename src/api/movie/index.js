import { moviePaths } from "./paths";

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const getTopRatedMovies = async () => {
    try {
        const response = await fetch(moviePaths.getFeaturedMovie(), {
                method: 'GET',
                headers: defaultHeaders
            }
        );

        return response.json();
    } catch (err) {
        console.error(err);
    }
};