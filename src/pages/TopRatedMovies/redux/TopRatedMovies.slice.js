import { createSlice } from "@reduxjs/toolkit";

import { actions } from "./TopRatedMovies.actions";

const initialState = {
    status: 'idle',
    movies: []
};

const topRatedMoviesSlice = createSlice({
    initialState,
    name: 'topRated',
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

export const topRatedMoviesReducer = topRatedMoviesSlice.reducer;