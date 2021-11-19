import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../../../../api/movie';

const getMovies = createAsyncThunk('featured/getMovies', api.getFeaturedMovies);

export const actions = {
    getMovies
};