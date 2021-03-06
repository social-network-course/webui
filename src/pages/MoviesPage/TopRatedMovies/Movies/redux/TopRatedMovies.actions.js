import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../../../../../api/movie';
import { toggleLoading } from "../../../../../store/shared/navigation/Navigation.slice";

const getMovies = createAsyncThunk('topRated/getMovies', api.getTopRatedMovies);

const getMoviesAndToggleLoader = (params) => async (dispatch) => {
    await dispatch(toggleLoading(true));
    await dispatch(getMovies(params));
    await dispatch(toggleLoading(false));
};

export const actions = {
    getMovies,
    getMoviesAndToggleLoader
};