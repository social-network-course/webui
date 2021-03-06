import React from 'react';

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "@mui/material";

import StyledSelect from "../../../../components/shared/StyledSelect";
import Button from "../../../../components/shared/Button";
import Groups from "../Groups";
import * as DataListSelectors from '../../../../store/shared/movie/DataList.selectors';
import * as FilterSelectors from '../../redux/Filter.selectors';
import * as NavigationSelectors from '../../../../store/shared/navigation/Navigation.selectors';
import { actions as topRatedMoviesActions } from "../../TopRatedMovies/Movies/redux/TopRatedMovies.actions";
import { actions as popularMoviesActions } from "../../PopularMovies/Movies/redux/PopularMovies.actions";
import { actions as recommendedMoviesActions } from "../../RecommendedMovies/Movies/redux/RecommendedMovies.actions";
import { setGenreFilters, setStatusFilters } from "../../redux/Filter.slice";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { MOVIES_GROUPS } from "../../../../constants/moviesNavigation";
import styles from './AdvancedOptions.module.scss';

const AdvancedOptions = ({
    isOpen,
    page
}) => {
    const dispatch = useDispatch();

    const location = useLocation();

    const { width } = useWindowSize();

    const genreFilters = useSelector(FilterSelectors.genreFilters);
    const statusFilters = useSelector(FilterSelectors.statusFilters);

    const activeMovieGroup = useSelector(NavigationSelectors.activeMovieGroup);

    const { genres, statuses } = useSelector(DataListSelectors.list);

    const handleSelectGenres = (value) => {
        dispatch(setGenreFilters(value));
    };

    const handleSelectStatuses = (value) => {
        dispatch(setStatusFilters(value));
    };

    const handleFilterResults = () => {
        if (activeMovieGroup === MOVIES_GROUPS[0].id) {
            dispatch(topRatedMoviesActions.getMoviesAndToggleLoader({
                page,
                genreFilters,
                statusFilters
            }));
        } else if (activeMovieGroup === MOVIES_GROUPS[1].id) {
            dispatch(popularMoviesActions.getMoviesAndToggleLoader({
                page,
                genreFilters,
                statusFilters
            }));
        } else {
            dispatch(recommendedMoviesActions.getMoviesAndToggleLoader({
                page,
                genreFilters,
                statusFilters
            }));
        }
    };

    const genresNames = genres.map((genre) => genre.name);
    const statusesNames = statuses.map((status) => status.name);

    return (
        <Collapse
            in={isOpen}
            timeout={300}
            unmountOnExit
        >
            <div className={styles.options}>
                {width <= 576 &&
                    <Groups/>
                }
                {!location.pathname.includes('/recommended') &&
                    <div className={styles.options__advanced}>
                        <StyledSelect
                            items={genresNames}
                            label='Genre'
                            value={genreFilters}
                            onSelect={handleSelectGenres}
                            multiple
                        />
                        <StyledSelect
                            items={statusesNames}
                            label='Status'
                            value={statusFilters}
                            onSelect={handleSelectStatuses}
                            multiple
                        />
                        <Button
                            onClick={handleFilterResults}
                            text='Search'
                            className={styles.options__submitBtn}
                        />
                    </div>
                }
            </div>
        </Collapse>
    );
};

export default AdvancedOptions;