import { createSlice } from "@reduxjs/toolkit";

import { actions } from "./MoviesInTheaters.actions";

const initialState = {
    status: 'idle',
    movies: []
};

const moviesInTheatersSlice = createSlice({
    initialState,
    name: 'inTheaters',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actions.getMovies.pending, (state) => {
                state.status = 'waiting';
                state.movies = initialState.movies;
            })
            .addCase(actions.getMovies.fulfilled, (state, action) => {
                state.status = 'success';
                state.movies = action.payload;
            })
            .addCase(actions.getMovies.rejected, (state) => {
                state.status = 'failure';
                state.movies = initialState.movies;
            })
    }
});

export const moviesInTheatersReducer = moviesInTheatersSlice.reducer;