import { createSlice } from "@reduxjs/toolkit";

import { actions } from "./Person.actions";

const initialState = {
    status: 'idle',
    activeIdDetails: null
};

const personSlice = createSlice({
    initialState,
    name: 'person',
    extraReducers: (builder) => {
        builder
            .addCase(actions.getDetails.pending, (state) => {
                state.status = 'waiting';
            })
            .addCase(actions.getDetails.fulfilled, (state, action) => {
                state.status = 'success';
                state.activeIdDetails = action.payload;
            })
            .addCase(actions.getDetails.rejected, (state) => {
                state.status = 'failure';
            })
    }
});

export const personReducer = personSlice.reducer;