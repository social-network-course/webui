import { createSlice } from "@reduxjs/toolkit";

import { actions } from "./Movie.actions";

const initialState = {
    status: 'idle',
    activeIdDetails: null
};

const movieSlice = createSlice({
    initialState,
    name: 'movie',
    extraReducers: (builder) => {
        builder
            .addCase(actions.getDetails.pending, (state) => {
                state.status = 'waiting';
                state.activeIdDetails = initialState.activeIdDetails;
            })
            .addCase(actions.getDetails.fulfilled, (state, action) => {
                state.status = 'success';
                state.activeIdDetails = action.payload;
            })
            .addCase(actions.getDetails.rejected, (state) => {
                state.status = 'failure';
                state.activeIdDetails = initialState.activeIdDetails;
            })
    }
});

export const movieReducer = movieSlice.reducer;