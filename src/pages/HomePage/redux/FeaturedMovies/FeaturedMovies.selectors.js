import { createSelector } from "@reduxjs/toolkit";

export const movies = createSelector(
    (state) => state.featuredMoviesReducer,
    (state) => state.movies
);

export const status = createSelector(
    (state) => state.featuredMoviesReducer,
    (state) => state.status
);