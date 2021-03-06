const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = {
    users: `${apiUrl}/users`
};

export const user = {
    storeUserData: `${api.users}/create`,
    getUserData: `${api.users}/current`,
    addToFavouriteGenres: (id) => `${api.users}/${id}/genres/add`,
    removeFromFavouriteGenres: (id) => `${api.users}/${id}/genres/remove`,
    addToLikes: (id) => `${api.users}/${id}/movies/likes/add`,
    removeFromLikes: (id) => `${api.users}/${id}/movies/likes/remove`,
    addToWatchlist: (id) => `${api.users}/${id}/movies/watchlist/add`,
    removeFromWatchlist: (id) => `${api.users}/${id}/movies/watchlist/remove`,
    addToRatings: (id) => `${api.users}/${id}/movies/rate`,
    logVisit: (id) => `${api.users}/${id}/movies/visit`,
};